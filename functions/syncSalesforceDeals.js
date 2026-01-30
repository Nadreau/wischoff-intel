import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SALESFORCE DEALS SYNC
 *
 * Syncs opportunities from Salesforce CRM into EarlyStageCompany and DealStageCompany entities.
 * Uses Salesforce Connected App credentials stored in IntegrationSettings.
 *
 * Setup for client:
 * 1. Go to Salesforce Setup → Apps → App Manager → New Connected App
 * 2. Enable OAuth, add scopes: api, refresh_token
 * 3. Use Username-Password OAuth flow for simplicity
 * 4. Store: instance_url, client_id, client_secret, username, password+security_token
 * 5. Enter credentials in app's Settings → Integrations → Salesforce
 *
 * Alternative: Use a Salesforce API token directly if available
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate - admin only
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get stored Salesforce credentials from IntegrationSettings
    const settings = await base44.asServiceRole.entities.IntegrationSettings.list();
    const integrationSettings = settings[0];

    if (!integrationSettings?.salesforce_instance_url || !integrationSettings?.salesforce_access_token) {
      return Response.json({
        error: 'Salesforce credentials not configured. Go to Settings → Integrations to add your Salesforce connection.'
      }, { status: 400 });
    }

    const instanceUrl = integrationSettings.salesforce_instance_url;
    const accessToken = integrationSettings.salesforce_access_token;

    const results = {
      opportunities_found: 0,
      early_stage_created: 0,
      deal_stage_created: 0,
      updated: 0,
      errors: []
    };

    // Fetch opportunities from Salesforce
    const query = encodeURIComponent(
      "SELECT Id, Name, Amount, StageName, CloseDate, Description, Type, LeadSource, AccountId, Account.Name, LastModifiedDate FROM Opportunity WHERE IsClosed = false ORDER BY LastModifiedDate DESC LIMIT 100"
    );

    const oppsResponse = await fetch(
      `${instanceUrl}/services/data/v58.0/query?q=${query}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!oppsResponse.ok) {
      const errorText = await oppsResponse.text();

      // Check if token expired
      if (oppsResponse.status === 401) {
        return Response.json({
          error: 'Salesforce access token expired. Please refresh your token in Settings → Integrations.'
        }, { status: 401 });
      }

      return Response.json({
        error: `Salesforce API error: ${oppsResponse.status} - ${errorText}`
      }, { status: 400 });
    }

    const oppsData = await oppsResponse.json();
    const opportunities = oppsData.records || [];
    results.opportunities_found = opportunities.length;

    // Get existing companies to avoid duplicates
    const existingEarlyStage = await base44.asServiceRole.entities.EarlyStageCompany.list();
    const existingDealStage = await base44.asServiceRole.entities.DealStageCompany.list();
    const existingNames = new Set([
      ...existingEarlyStage.map(c => c.name?.toLowerCase()),
      ...existingDealStage.map(c => c.name?.toLowerCase())
    ]);

    for (const opp of opportunities) {
      try {
        const oppName = opp.Name;
        const accountName = opp.Account?.Name;
        const companyName = accountName || oppName;
        const stageName = opp.StageName;
        const amount = opp.Amount;
        const description = opp.Description || '';

        if (!companyName) continue;

        // Skip if already exists
        if (existingNames.has(companyName.toLowerCase())) {
          results.updated++;
          continue;
        }

        // Fetch contacts associated with the account
        let contacts = [];
        if (opp.AccountId) {
          try {
            const contactsQuery = encodeURIComponent(
              `SELECT Id, Name, Email, Title FROM Contact WHERE AccountId = '${opp.AccountId}' LIMIT 5`
            );
            const contactsResponse = await fetch(
              `${instanceUrl}/services/data/v58.0/query?q=${contactsQuery}`,
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            if (contactsResponse.ok) {
              const contactsData = await contactsResponse.json();
              contacts = (contactsData.records || []).map(c => ({
                name: c.Name,
                email: c.Email,
                title: c.Title
              }));
            }
          } catch (e) {
            // Continue without contacts
          }
        }

        // Determine stage based on Salesforce stage name
        const earlyStageNames = ['prospecting', 'qualification', 'needs analysis', 'value proposition', 'id. decision makers'];
        const isEarlyStage = earlyStageNames.some(s => stageName?.toLowerCase().includes(s.toLowerCase()));

        // Use AI to enrich the company data
        const enrichPrompt = `Given this opportunity/company from a VC's Salesforce CRM:
Name: ${companyName}
Opportunity: ${oppName}
Description: ${description}
Deal Amount: ${amount || 'Not specified'}
Stage: ${stageName}
Lead Source: ${opp.LeadSource || 'Unknown'}
Contacts: ${contacts.map(c => `${c.name} (${c.title})`).join(', ') || 'None'}

Provide a brief company profile:
1. A 1-2 sentence description of what the company likely does
2. The likely industry/sector
3. The likely funding stage (seed, series_a, series_b, etc.)

Be concise. If you can't determine something, make a reasonable guess.`;

        const enrichedData = await base44.integrations.Core.InvokeLLM({
          prompt: enrichPrompt,
          response_json_schema: {
            type: "object",
            properties: {
              description: { type: "string" },
              sector: { type: "string" },
              stage: { type: "string" }
            },
            required: ["description", "sector", "stage"]
          }
        });

        if (isEarlyStage) {
          await base44.asServiceRole.entities.EarlyStageCompany.create({
            name: companyName,
            description: enrichedData.description || description,
            sector: enrichedData.sector || 'Technology',
            source: 'Salesforce Import',
            status: 'researching',
            contacts: contacts,
            notes: `Imported from Salesforce. Stage: ${stageName}. Amount: ${amount || 'N/A'}. Lead Source: ${opp.LeadSource || 'Unknown'}`,
            salesforce_opportunity_id: opp.Id
          });
          results.early_stage_created++;
        } else {
          await base44.asServiceRole.entities.DealStageCompany.create({
            name: companyName,
            description: enrichedData.description || description,
            sector: enrichedData.sector || 'Technology',
            stage: enrichedData.stage || 'seed',
            deal_status: 'active',
            deal_size: amount ? `$${Number(amount).toLocaleString()}` : 'TBD',
            contacts: contacts,
            notes: `Imported from Salesforce. Stage: ${stageName}. Lead Source: ${opp.LeadSource || 'Unknown'}`,
            salesforce_opportunity_id: opp.Id
          });
          results.deal_stage_created++;
        }

        existingNames.add(companyName.toLowerCase());

      } catch (oppError) {
        results.errors.push(`Error processing opportunity ${opp.Name}: ${oppError.message}`);
      }
    }

    // Update last sync time
    if (integrationSettings.id) {
      await base44.asServiceRole.entities.IntegrationSettings.update(integrationSettings.id, {
        salesforce_last_sync: new Date().toISOString()
      });
    }

    return Response.json({
      success: true,
      summary: `Synced ${results.opportunities_found} opportunities from Salesforce. Created ${results.early_stage_created} early-stage and ${results.deal_stage_created} deal-stage companies.`,
      results
    });

  } catch (error) {
    console.error('Salesforce sync error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});
