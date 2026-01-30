import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * DEEP COMPANY INTELLIGENCE UPDATE
 *
 * Purpose: Comprehensive market analysis, competitor landscape, strategic assessment,
 *          opportunities, threats, and AI insights for portfolio companies
 * Frequency: Run weekly OR on-demand for specific companies
 * Output: Updates PortfolioCompany with:
 *   - market, competitors, analysis (overview data)
 *   - funding (investment details)
 *   - strategic_opportunities (growth opportunities)
 *   - threats (risk assessment)
 *   - ai_insights (VC-grade due diligence)
 *
 * NOTE: Base44 schema constraints:
 * - competitors must be array of STRINGS (company names only)
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate - admin only
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Optional: specify a single company to update
    let payload = {};
    try {
      payload = await req.json();
    } catch (e) {
      // No payload provided, that's fine
    }
    const targetCompanyId = payload.companyId || null;
    const forceRefresh = payload.forceRefresh || false;

    const today = new Date().toISOString().split('T')[0];

    const results = {
      processed: 0,
      updated: 0,
      skipped: 0,
      companies: []
    };

    // Get portfolio companies
    let companies = await base44.asServiceRole.entities.PortfolioCompany.list();

    // If targeting a specific company, filter to just that one
    if (targetCompanyId) {
      companies = companies.filter(c => c.id === targetCompanyId);
    }

    if (companies.length === 0) {
      return Response.json({
        success: true,
        message: targetCompanyId ? 'Company not found' : 'No portfolio companies found',
        results
      });
    }

    for (const company of companies) {
      results.processed++;

      // Skip if recently updated (within 14 days) unless forced
      if (!forceRefresh && company.intelligence_last_updated) {
        const lastUpdate = new Date(company.intelligence_last_updated);
        const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceUpdate < 14) {
          results.skipped++;
          results.companies.push({
            name: company.name,
            status: 'skipped (updated ' + Math.floor(daysSinceUpdate) + ' days ago)'
          });
          continue;
        }
      }

      try {
        // Single comprehensive LLM call for all intelligence
        const intelligencePrompt = `You are a senior VC analyst conducting comprehensive due diligence on ${company.name}.

COMPANY: ${company.name}
DESCRIPTION: ${company.description || 'Not provided'}
WEBSITE: ${company.website || 'Not provided'}
TODAY'S DATE: ${today}

Provide COMPREHENSIVE intelligence covering ALL of the following:

1. FUNDING DATA:
   - total_raised: Total funding raised to date (e.g., "$25M", "$150M Series C")
   - latest_round: Most recent funding round details (e.g., "Series B - $50M in Jan 2024")
   - investors: Key investors as an array of investor names
   - valuation: Last known valuation if available (e.g., "$200M post-money")

2. MARKET DATA:
   - size: Total addressable market with dollar amount (e.g., "$5.2B in 2024")
   - growth: Growth rate with timeframe (e.g., "12% CAGR 2024-2028")
   - trends: 4-5 key market trends as an array of strings
   - challenges: 4-5 market challenges as an array of strings

3. COMPETITORS (array of 5-7 names as strings):
   - Just the company names as strings: ["Company A", "Company B"]

4. COMPETITOR_DETAILS (array of 5-7 detailed objects):
   Each competitor should have:
   - name: Company name
   - description: 1 sentence on what they do
   - positioning: How they position vs ${company.name}
   - recent_moves: Any recent funding, launches, or strategic moves (1 sentence)

5. ANALYSIS (basic scores):
   - opportunity_score: Number from 1-10 rating investment opportunity
   - growth_trajectory: One sentence on expected growth path
   - health_assessment: One sentence on current company health

6. STRATEGIC OPPORTUNITIES (4-6 detailed opportunities):
   Each opportunity should have:
   - title: Short title (e.g., "Geographic Expansion to APAC")
   - description: 2-3 sentences explaining the opportunity
   - category: One of "expansion", "product", "partnership", "competitive", "market"
   - potential_impact: One of "high", "medium", "low"
   - timeframe: One of "immediate", "short_term", "long_term"
   - action_items: Array of 2-3 specific action items

7. THREATS (4-6 detailed threats):
   Each threat should have:
   - title: Short title (e.g., "Big Tech Market Entry")
   - description: 2-3 sentences explaining the threat
   - category: One of "competitive", "regulatory", "market", "technology", "execution"
   - severity: One of "critical", "high", "medium", "low"
   - likelihood: One of "high", "medium", "low"
   - mitigation: 1-2 sentences on how to mitigate

8. AI INSIGHTS (VC-grade due diligence):
   - competitive_position: 3-4 sentences on how this company differentiates, moats, positioning
   - key_risks: Array of 3-4 detailed strategic and execution risks
   - market_impact: 3-4 sentences on market tailwinds/headwinds and timing
   - founder_questions: Array of 4-5 critical questions to ask founders
   - recommendation: 2-3 sentences strategic recommendation for value creation
   - red_flags: Array of 2-3 areas requiring deeper investigation
   - investment_thesis: 2-3 sentences on why this is or isn't compelling

Use real, current data. Search Crunchbase, PitchBook, news sources. Be specific, actionable, and institutional-grade.`;

        const intelligenceData = await base44.integrations.Core.InvokeLLM({
          prompt: intelligencePrompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              funding: {
                type: "object",
                properties: {
                  total_raised: { type: "string" },
                  latest_round: { type: "string" },
                  investors: { type: "array", items: { type: "string" } },
                  valuation: { type: "string" }
                },
                required: ["total_raised", "latest_round"]
              },
              market: {
                type: "object",
                properties: {
                  size: { type: "string" },
                  growth: { type: "string" },
                  trends: { type: "array", items: { type: "string" } },
                  challenges: { type: "array", items: { type: "string" } }
                },
                required: ["size", "growth", "trends", "challenges"]
              },
              competitors: {
                type: "array",
                items: { type: "string" }
              },
              competitor_details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    positioning: { type: "string" },
                    recent_moves: { type: "string" }
                  },
                  required: ["name", "description"]
                }
              },
              analysis: {
                type: "object",
                properties: {
                  opportunity_score: { type: "number" },
                  growth_trajectory: { type: "string" },
                  health_assessment: { type: "string" }
                },
                required: ["opportunity_score", "growth_trajectory", "health_assessment"]
              },
              strategic_opportunities: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    category: { type: "string" },
                    potential_impact: { type: "string" },
                    timeframe: { type: "string" },
                    action_items: { type: "array", items: { type: "string" } }
                  },
                  required: ["title", "description", "category", "potential_impact"]
                }
              },
              threats: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    category: { type: "string" },
                    severity: { type: "string" },
                    likelihood: { type: "string" },
                    mitigation: { type: "string" }
                  },
                  required: ["title", "description", "category", "severity"]
                }
              },
              ai_insights: {
                type: "object",
                properties: {
                  competitive_position: { type: "string" },
                  key_risks: { type: "array", items: { type: "string" } },
                  market_impact: { type: "string" },
                  founder_questions: { type: "array", items: { type: "string" } },
                  recommendation: { type: "string" },
                  red_flags: { type: "array", items: { type: "string" } },
                  investment_thesis: { type: "string" }
                },
                required: ["competitive_position", "key_risks", "recommendation", "investment_thesis"]
              }
            },
            required: ["funding", "market", "competitors", "competitor_details", "analysis", "strategic_opportunities", "threats", "ai_insights"]
          }
        });

        // Build update object
        const updateData = {
          intelligence_last_updated: new Date().toISOString()
        };

        // Funding data
        if (intelligenceData.funding) {
          updateData.funding = {
            total_raised: intelligenceData.funding.total_raised || 'N/A',
            latest_round: intelligenceData.funding.latest_round || 'N/A',
            investors: Array.isArray(intelligenceData.funding.investors) ? intelligenceData.funding.investors : [],
            valuation: intelligenceData.funding.valuation || 'N/A'
          };
        }

        // Market data
        if (intelligenceData.market) {
          updateData.market = {
            size: intelligenceData.market.size || '',
            growth: intelligenceData.market.growth || '',
            trends: Array.isArray(intelligenceData.market.trends) ? intelligenceData.market.trends : [],
            challenges: Array.isArray(intelligenceData.market.challenges) ? intelligenceData.market.challenges : []
          };
        }

        // Competitors - MUST be array of strings only (Base44 schema requirement)
        if (intelligenceData.competitors && Array.isArray(intelligenceData.competitors)) {
          updateData.competitors = intelligenceData.competitors
            .map(c => typeof c === 'string' ? c : (c.name || String(c)))
            .filter(c => c && typeof c === 'string');
        }

        // Competitor Details - serialize as JSON strings (Base44 schema expects string array)
        if (intelligenceData.competitor_details && Array.isArray(intelligenceData.competitor_details)) {
          updateData.competitor_details = intelligenceData.competitor_details.map(c =>
            JSON.stringify({
              name: String(c.name || ''),
              description: String(c.description || ''),
              positioning: String(c.positioning || ''),
              recent_moves: String(c.recent_moves || '')
            })
          );
        }

        // Analysis
        if (intelligenceData.analysis) {
          updateData.analysis = {
            opportunity_score: Number(intelligenceData.analysis.opportunity_score) || 5,
            growth_trajectory: String(intelligenceData.analysis.growth_trajectory || ''),
            health_assessment: String(intelligenceData.analysis.health_assessment || '')
          };
        }

        // Strategic Opportunities - serialize as JSON strings (Base44 schema expects string array)
        if (intelligenceData.strategic_opportunities && Array.isArray(intelligenceData.strategic_opportunities)) {
          updateData.strategic_opportunities = intelligenceData.strategic_opportunities.map(opp =>
            JSON.stringify({
              title: String(opp.title || ''),
              description: String(opp.description || ''),
              category: String(opp.category || 'market'),
              potential_impact: String(opp.potential_impact || 'medium'),
              timeframe: String(opp.timeframe || 'short_term'),
              action_items: Array.isArray(opp.action_items) ? opp.action_items : []
            })
          );
        }

        // Threats - serialize as JSON strings (Base44 schema expects string array)
        if (intelligenceData.threats && Array.isArray(intelligenceData.threats)) {
          updateData.threats = intelligenceData.threats.map(threat =>
            JSON.stringify({
              title: String(threat.title || ''),
              description: String(threat.description || ''),
              category: String(threat.category || 'market'),
              severity: String(threat.severity || 'medium'),
              likelihood: String(threat.likelihood || 'medium'),
              mitigation: String(threat.mitigation || '')
            })
          );
        }

        // AI Insights (for Deep Intelligence tab)
        if (intelligenceData.ai_insights) {
          updateData.ai_insights = {
            competitive_position: String(intelligenceData.ai_insights.competitive_position || ''),
            key_risks: Array.isArray(intelligenceData.ai_insights.key_risks) ? intelligenceData.ai_insights.key_risks : [],
            market_impact: String(intelligenceData.ai_insights.market_impact || ''),
            founder_questions: Array.isArray(intelligenceData.ai_insights.founder_questions) ? intelligenceData.ai_insights.founder_questions : [],
            recommendation: String(intelligenceData.ai_insights.recommendation || ''),
            red_flags: Array.isArray(intelligenceData.ai_insights.red_flags) ? intelligenceData.ai_insights.red_flags : [],
            investment_thesis: String(intelligenceData.ai_insights.investment_thesis || ''),
            last_updated: new Date().toISOString()
          };
        }

        // Update the company record
        await base44.asServiceRole.entities.PortfolioCompany.update(company.id, updateData);

        results.updated++;
        results.companies.push({
          name: company.name,
          status: 'updated',
          competitors_found: updateData.competitors?.length || 0,
          market_size: updateData.market?.size || 'N/A'
        });

      } catch (error) {
        console.error(`Error updating intelligence for ${company.name}:`, error);
        results.companies.push({
          name: company.name,
          status: 'error: ' + error.message
        });
      }
    }

    return Response.json({
      success: true,
      summary: `Updated ${results.updated}/${results.processed} companies (${results.skipped} skipped as recently updated)`,
      results
    });

  } catch (error) {
    console.error('Company intelligence update error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});
