import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * EMAIL INBOX SYNC (Gmail / Google Workspace)
 *
 * Scans the connected Gmail inbox for startup/deal conversations and
 * auto-creates EarlyStageCompany records from email threads.
 *
 * Setup for client (Google Workspace):
 * 1. Go to Google Cloud Console → Create a project
 * 2. Enable Gmail API
 * 3. Create OAuth 2.0 credentials (Web application type)
 * 4. Get a refresh token using the OAuth playground or a one-time auth flow
 * 5. Store: client_id, client_secret, refresh_token in Settings → Integrations
 *
 * Alternative for personal Gmail:
 * Use Google's OAuth playground to get a refresh token with gmail.readonly scope
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate - admin only
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get stored Gmail credentials from IntegrationSettings
    const settings = await base44.asServiceRole.entities.IntegrationSettings.list();
    const integrationSettings = settings[0];

    if (!integrationSettings?.gmail_refresh_token || !integrationSettings?.gmail_client_id || !integrationSettings?.gmail_client_secret) {
      return Response.json({
        error: 'Gmail credentials not configured. Go to Settings → Integrations to add your Google OAuth credentials.',
        setup_instructions: {
          step1: 'Go to Google Cloud Console and create a project',
          step2: 'Enable the Gmail API',
          step3: 'Create OAuth 2.0 credentials',
          step4: 'Use OAuth playground to get a refresh token with gmail.readonly scope',
          step5: 'Enter client_id, client_secret, and refresh_token in Settings'
        }
      }, { status: 400 });
    }

    // Exchange refresh token for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: integrationSettings.gmail_client_id,
        client_secret: integrationSettings.gmail_client_secret,
        refresh_token: integrationSettings.gmail_refresh_token,
        grant_type: 'refresh_token'
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      return Response.json({
        error: `Gmail OAuth error: ${errorText}. Your refresh token may have expired - please re-authenticate.`
      }, { status: 401 });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const results = {
      emails_scanned: 0,
      threads_analyzed: 0,
      companies_created: 0,
      companies_updated: 0,
      errors: []
    };

    // Search for startup/investment related emails from the last 30 days
    const searchQueries = [
      'subject:(pitch deck OR investment OR funding OR startup OR series)',
      'subject:(intro OR introduction) founder',
      'from:*@sequoiacap.com OR from:*@a16z.com OR from:*@ycombinator.com'
    ];

    // Get existing companies
    const existingEarlyStage = await base44.asServiceRole.entities.EarlyStageCompany.list();
    const existingNames = new Set(existingEarlyStage.map(c => c.name?.toLowerCase()));

    for (const query of searchQueries) {
      try {
        // Search emails
        const searchResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=50`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!searchResponse.ok) continue;

        const searchData = await searchResponse.json();
        const messages = searchData.messages || [];

        for (const msg of messages.slice(0, 20)) { // Limit to 20 per query
          try {
            results.emails_scanned++;

            // Fetch full message
            const msgResponse = await fetch(
              `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (!msgResponse.ok) continue;

            const msgData = await msgResponse.json();

            // Extract headers
            const headers = msgData.payload?.headers || [];
            const getHeader = (name) => headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

            const subject = getHeader('Subject');
            const from = getHeader('From');
            const date = getHeader('Date');

            // Extract email body (simplified - just get snippet)
            const snippet = msgData.snippet || '';

            // Use AI to analyze if this is a startup/deal email and extract company info
            const analysisPrompt = `Analyze this email to determine if it's about a startup or investment opportunity.

FROM: ${from}
SUBJECT: ${subject}
SNIPPET: ${snippet}
DATE: ${date}

If this email is about a specific startup or company seeking investment, extract:
1. company_name: The startup's name (or null if not identifiable)
2. is_startup_related: true/false
3. description: Brief description of what the company does (if mentioned)
4. contact_name: Name of the person who sent or is mentioned
5. contact_email: Their email address
6. sector: Likely industry/sector
7. notes: Key points from the email (1-2 sentences)

If this is NOT about a specific startup opportunity (e.g., newsletter, general industry news), set is_startup_related to false.`;

            const analysis = await base44.integrations.Core.InvokeLLM({
              prompt: analysisPrompt,
              response_json_schema: {
                type: "object",
                properties: {
                  company_name: { type: "string" },
                  is_startup_related: { type: "boolean" },
                  description: { type: "string" },
                  contact_name: { type: "string" },
                  contact_email: { type: "string" },
                  sector: { type: "string" },
                  notes: { type: "string" }
                },
                required: ["is_startup_related"]
              }
            });

            if (!analysis.is_startup_related || !analysis.company_name) continue;

            results.threads_analyzed++;

            // Check if company already exists
            if (existingNames.has(analysis.company_name.toLowerCase())) {
              // Update existing company with new touchpoint
              const existing = existingEarlyStage.find(
                c => c.name?.toLowerCase() === analysis.company_name.toLowerCase()
              );
              if (existing) {
                const existingNotes = existing.notes || '';
                const newNote = `\n\n[${new Date(date).toLocaleDateString()}] Email from ${from}: ${analysis.notes}`;

                await base44.asServiceRole.entities.EarlyStageCompany.update(existing.id, {
                  notes: existingNotes + newNote
                });
                results.companies_updated++;
              }
              continue;
            }

            // Create new EarlyStageCompany
            const contacts = [];
            if (analysis.contact_name || analysis.contact_email) {
              contacts.push({
                name: analysis.contact_name || 'Unknown',
                email: analysis.contact_email || from.match(/<(.+)>/)?.[1] || from,
                title: ''
              });
            }

            await base44.asServiceRole.entities.EarlyStageCompany.create({
              name: analysis.company_name,
              description: analysis.description || `Discovered via email: ${subject}`,
              sector: analysis.sector || 'Technology',
              source: 'Gmail Import',
              status: 'new',
              contacts: contacts,
              notes: `[${new Date(date).toLocaleDateString()}] Email: ${subject}\n${analysis.notes || ''}`
            });

            existingNames.add(analysis.company_name.toLowerCase());
            results.companies_created++;

          } catch (msgError) {
            results.errors.push(`Error processing message: ${msgError.message}`);
          }
        }
      } catch (queryError) {
        results.errors.push(`Error with search query: ${queryError.message}`);
      }
    }

    // Update last sync time
    if (integrationSettings.id) {
      await base44.asServiceRole.entities.IntegrationSettings.update(integrationSettings.id, {
        gmail_last_sync: new Date().toISOString()
      });
    }

    return Response.json({
      success: true,
      summary: `Scanned ${results.emails_scanned} emails, analyzed ${results.threads_analyzed} startup-related threads. Created ${results.companies_created} new companies, updated ${results.companies_updated} existing.`,
      results
    });

  } catch (error) {
    console.error('Gmail sync error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});
