import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * HUBSPOT DEALS SYNC
 *
 * Syncs deals from HubSpot CRM into EarlyStageCompany and DealStageCompany entities.
 * Uses HubSpot Private App API key stored in IntegrationSettings.
 *
 * Setup for client:
 * 1. Go to HubSpot → Settings → Integrations → Private Apps
 * 2. Create a new Private App with scopes: crm.objects.deals.read, crm.objects.contacts.read
 * 3. Copy the access token
 * 4. Paste it in the app's Settings → Integrations → HubSpot API Key
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate - admin only
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get stored HubSpot API key from IntegrationSettings
    const settings = await base44.asServiceRole.entities.IntegrationSettings.list();
    const integrationSettings = settings[0]; // Should only be one record

    if (!integrationSettings?.hubspot_api_key) {
      return Response.json({
        error: 'HubSpot API key not configured. Go to Settings → Integrations to add your HubSpot Private App token.'
      }, { status: 400 });
    }

    const hubspotApiKey = integrationSettings.hubspot_api_key;

    const results = {
      deals_found: 0,
      early_stage_created: 0,
      deal_stage_created: 0,
      updated: 0,
      errors: []
    };

    // Fetch deals from HubSpot
    const dealsResponse = await fetch('https://api.hubapi.com/crm/v3/objects/deals?limit=100&properties=dealname,amount,dealstage,closedate,pipeline,description,hs_lastmodifieddate', {
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!dealsResponse.ok) {
      const errorText = await dealsResponse.text();
      return Response.json({
        error: `HubSpot API error: ${dealsResponse.status} - ${errorText}`
      }, { status: 400 });
    }

    const dealsData = await dealsResponse.json();
    const deals = dealsData.results || [];
    results.deals_found = deals.length;

    // Get existing companies to avoid duplicates
    const existingEarlyStage = await base44.asServiceRole.entities.EarlyStageCompany.list();
    const existingDealStage = await base44.asServiceRole.entities.DealStageCompany.list();
    const existingNames = new Set([
      ...existingEarlyStage.map(c => c.name?.toLowerCase()),
      ...existingDealStage.map(c => c.name?.toLowerCase())
    ]);

    for (const deal of deals) {
      try {
        const dealName = deal.properties.dealname;
        const dealStage = deal.properties.dealstage;
        const amount = deal.properties.amount;
        const description = deal.properties.description || '';

        if (!dealName) continue;

        // Skip if already exists
        if (existingNames.has(dealName.toLowerCase())) {
          results.updated++;
          continue;
        }

        // Fetch associated contacts for this deal
        let contacts = [];
        try {
          const associationsResponse = await fetch(
            `https://api.hubapi.com/crm/v3/objects/deals/${deal.id}/associations/contacts`,
            {
              headers: {
                'Authorization': `Bearer ${hubspotApiKey}`,
                'Content-Type': 'application/json'
              }
            }
          );
          if (associationsResponse.ok) {
            const assocData = await associationsResponse.json();
            const contactIds = assocData.results?.map(r => r.id) || [];

            // Fetch contact details
            for (const contactId of contactIds.slice(0, 5)) { // Limit to 5 contacts
              const contactResponse = await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}?properties=firstname,lastname,email,jobtitle,company`,
                {
                  headers: {
                    'Authorization': `Bearer ${hubspotApiKey}`,
                    'Content-Type': 'application/json'
                  }
                }
              );
              if (contactResponse.ok) {
                const contactData = await contactResponse.json();
                contacts.push({
                  name: `${contactData.properties.firstname || ''} ${contactData.properties.lastname || ''}`.trim(),
                  email: contactData.properties.email,
                  title: contactData.properties.jobtitle
                });
              }
            }
          }
        } catch (e) {
          // Continue without contacts if fetch fails
        }

        // Determine if early stage or deal stage based on HubSpot deal stage
        // Common HubSpot stages: appointmentscheduled, qualifiedtobuy, presentationscheduled, decisionmakerboughtin, contractsent, closedwon, closedlost
        const earlyStages = ['appointmentscheduled', 'qualifiedtobuy', 'presentationscheduled'];
        const isEarlyStage = earlyStages.some(s => dealStage?.toLowerCase().includes(s));

        // Use AI to enrich the company data
        const enrichPrompt = `Given this deal/company from a VC's CRM:
Name: ${dealName}
Description: ${description}
Deal Amount: ${amount || 'Not specified'}
Contacts: ${contacts.map(c => `${c.name} (${c.title})`).join(', ') || 'None'}

Provide a brief company profile:
1. A 1-2 sentence description of what the company likely does
2. The likely industry/sector
3. The likely stage (seed, series_a, series_b, etc.)

Be concise. If you can't determine something, make a reasonable guess based on the name and context.`;

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
          // Create EarlyStageCompany
          await base44.asServiceRole.entities.EarlyStageCompany.create({
            name: dealName,
            description: enrichedData.description || description,
            sector: enrichedData.sector || 'Technology',
            source: 'HubSpot Import',
            status: 'researching',
            contacts: contacts,
            notes: `Imported from HubSpot. Deal stage: ${dealStage}. Amount: ${amount || 'N/A'}`,
            hubspot_deal_id: deal.id
          });
          results.early_stage_created++;
        } else {
          // Create DealStageCompany
          await base44.asServiceRole.entities.DealStageCompany.create({
            name: dealName,
            description: enrichedData.description || description,
            sector: enrichedData.sector || 'Technology',
            stage: enrichedData.stage || 'seed',
            deal_status: dealStage?.includes('closed') ? 'closed' : 'active',
            deal_size: amount ? `$${Number(amount).toLocaleString()}` : 'TBD',
            contacts: contacts,
            notes: `Imported from HubSpot. Deal stage: ${dealStage}.`,
            hubspot_deal_id: deal.id
          });
          results.deal_stage_created++;
        }

        existingNames.add(dealName.toLowerCase());

      } catch (dealError) {
        results.errors.push(`Error processing deal ${deal.properties?.dealname}: ${dealError.message}`);
      }
    }

    // Update last sync time
    if (integrationSettings.id) {
      await base44.asServiceRole.entities.IntegrationSettings.update(integrationSettings.id, {
        hubspot_last_sync: new Date().toISOString()
      });
    }

    return Response.json({
      success: true,
      summary: `Synced ${results.deals_found} deals from HubSpot. Created ${results.early_stage_created} early-stage and ${results.deal_stage_created} deal-stage companies.`,
      results
    });

  } catch (error) {
    console.error('HubSpot sync error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});
