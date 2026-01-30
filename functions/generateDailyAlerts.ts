import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * DAILY ALERTS GENERATOR
 *
 * Purpose: Generate 1-4 high-impact alerts per day that require investor attention NOW
 * Frequency: Run daily (via Base44 scheduled task or external cron)
 * Output: Creates Alert entities that appear on Dashboard
 *
 * This is SEPARATE from company news updates - this is for urgent, actionable intelligence
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate - admin only
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const today = new Date().toISOString().split('T')[0];

    const results = {
      processed: 0,
      alerts_created: 0,
      companies_checked: [],
      alerts: []
    }; 

    // Get all companies from all stages
    const [portfolioCompanies, dealStageCompanies, earlyStageCompanies] = await Promise.all([
      base44.asServiceRole.entities.PortfolioCompany.list(),
      base44.asServiceRole.entities.DealStageCompany.list(),
      base44.asServiceRole.entities.EarlyStageCompany.list()
    ]);

    const allCompanies = [
      ...portfolioCompanies.map(c => ({ ...c, stage: 'portfolio' })),
      ...dealStageCompanies.map(c => ({ ...c, stage: 'deal' })),
      ...earlyStageCompanies.map(c => ({ ...c, stage: 'early' }))
    ];

    if (allCompanies.length === 0) {
      return Response.json({
        success: true,
        message: 'No companies found to monitor',
        results
      });
    }

    // Collect potential alerts from all companies
    const potentialAlerts = [];

    for (const company of allCompanies) {
      results.processed++;
      results.companies_checked.push(company.name);

      try {
        // Search for HIGH-IMPACT news only - things that matter TODAY
        const alertSearchPrompt = `TODAY'S DATE: ${today}

You are a VC analyst monitoring ${company.name} for URGENT news that requires immediate investor attention.

COMPANY: ${company.name}
DESCRIPTION: ${company.description || 'Not provided'}
WEBSITE: ${company.website || 'Not provided'}

Search for news from the PAST 24-48 HOURS that is:
1. DIRECTLY about ${company.name} (funding, leadership changes, product launches, legal issues)
2. Major regulatory changes that DIRECTLY affect their specific industry
3. Significant competitor announcements (major funding, acquisitions, pivots)
4. Critical market shifts that could impact their business model

STRICT CRITERIA:
- Only HIGH or MEDIUM impact news
- Must be from the past 48 hours maximum
- Must be DIRECTLY relevant (not tangential industry news)
- If no significant news exists, return an empty array - DO NOT fabricate

Return 0-2 items maximum. Quality over quantity.`;

        const newsData = await base44.integrations.Core.InvokeLLM({
          prompt: alertSearchPrompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              news_items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    summary: { type: "string" },
                    source_url: { type: "string" },
                    date: { type: "string" },
                    is_opportunity: { type: "boolean" },
                    is_threat: { type: "boolean" },
                    impact_level: { type: "string", enum: ["high", "medium"] },
                    relevance_score: { type: "number", minimum: 1, maximum: 10 }
                  },
                  required: ["title", "summary", "impact_level", "relevance_score"]
                }
              }
            },
            required: ["news_items"]
          }
        });

        if (newsData.news_items && newsData.news_items.length > 0) {
          for (const news of newsData.news_items) {
            potentialAlerts.push({
              ...news,
              company
            });
          }
        }

      } catch (error) {
        console.error(`Error checking ${company.name}:`, error);
      }
    }

    // Sort by relevance and impact, take top 4 maximum
    const impactScore = { high: 10, medium: 5, low: 1 };
    const topAlerts = potentialAlerts
      .sort((a, b) => {
        const aScore = (impactScore[a.impact_level] || 5) + (a.relevance_score || 5);
        const bScore = (impactScore[b.impact_level] || 5) + (b.relevance_score || 5);
        return bScore - aScore;
      })
      .slice(0, 4); // MAXIMUM 4 alerts per day

    // Create Alert entities for top items
    for (const alert of topAlerts) {
      try {
        // Generate detailed analysis for this alert
        const analysisPrompt = `You are a senior VC analyst. Analyze this news for ${alert.company.name}:

HEADLINE: ${alert.title}
SUMMARY: ${alert.summary}

Write a 2-3 paragraph analysis covering:
1. What this means for ${alert.company.name}'s business
2. Specific investor implications (valuation, risk, opportunity)
3. Recommended actions or monitoring points

Be direct, specific, and actionable.`;

        const analysis = await base44.integrations.Core.InvokeLLM({
          prompt: analysisPrompt,
          add_context_from_internet: false
        });

        // Determine category based on content
        const titleLower = alert.title.toLowerCase();
        let category = 'market';
        if (titleLower.includes('regulat') || titleLower.includes('fda') || titleLower.includes('law') || titleLower.includes('compliance')) {
          category = 'regulatory';
        } else if (titleLower.includes('compet') || titleLower.includes('rival')) {
          category = 'competitive';
        } else if (titleLower.includes('product') || titleLower.includes('launch') || titleLower.includes('feature')) {
          category = 'product';
        } else if (titleLower.includes('fund') || titleLower.includes('deal') || titleLower.includes('acqui') || titleLower.includes('merger')) {
          category = 'deal';
        } else if (titleLower.includes('ceo') || titleLower.includes('founder') || titleLower.includes('executive') || titleLower.includes('hire')) {
          category = 'founder';
        }

        // Create the alert
        await base44.asServiceRole.entities.Alert.create({
          company_name: alert.company.name,
          company_stage: alert.company.stage,
          title: alert.title,
          description: alert.summary,
          type: alert.is_threat ? 'threat' : 'opportunity',
          category: category,
          priority: alert.impact_level,
          impact: alert.summary,
          source_url: alert.source_url || '',
          article_content: analysis,
          read: false,
          date: today
        });

        results.alerts_created++;
        results.alerts.push({
          company: alert.company.name,
          title: alert.title,
          type: alert.is_threat ? 'threat' : 'opportunity',
          priority: alert.impact_level
        });

      } catch (error) {
        console.error(`Error creating alert for ${alert.company.name}:`, error);
      }
    }

    // Ensure at least 1 alert if we have companies and found anything
    if (results.alerts_created === 0 && potentialAlerts.length > 0) {
      const bestAlert = potentialAlerts[0];
      if (bestAlert) {
        try {
          await base44.asServiceRole.entities.Alert.create({
            company_name: bestAlert.company.name,
            company_stage: bestAlert.company.stage,
            title: bestAlert.title,
            description: bestAlert.summary,
            type: bestAlert.is_threat ? 'threat' : 'opportunity',
            category: 'market',
            priority: bestAlert.impact_level || 'medium',
            impact: bestAlert.summary,
            source_url: bestAlert.source_url || '',
            article_content: bestAlert.summary,
            read: false,
            date: today
          });
          results.alerts_created++;
        } catch (error) {
          console.error('Error creating fallback alert:', error);
        }
      }
    }

    return Response.json({
      success: true,
      summary: `Checked ${results.processed} companies, created ${results.alerts_created} alerts (max 4/day)`,
      results
    });

  } catch (error) {
    console.error('Daily alerts generation error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});
