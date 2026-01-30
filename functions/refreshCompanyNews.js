import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * WEEKLY COMPANY NEWS REFRESH
 *
 * Purpose: Update each portfolio company's news section with past 90 days of company-specific news
 * Frequency: Run weekly (via Base44 scheduled task or external cron)
 * Output: Updates PortfolioCompany.news field for each company
 *
 * This is SEPARATE from daily alerts:
 * - Daily Alerts = urgent, cross-portfolio, actionable NOW (1-4 items for entire portfolio)
 * - Company News = comprehensive 90-day history FOR EACH company (5-10 items per company)
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate - admin only
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Optional: specify a single company to refresh
    let payload = {};
    try {
      payload = await req.json();
    } catch (e) {
      // No payload provided, that's fine
    }
    const targetCompanyId = payload.companyId || null;

    const today = new Date().toISOString().split('T')[0];
    // Extend to 6 months for better results
    const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const cutoffDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);

    const results = {
      processed: 0,
      updated: 0,
      companies: []
    };

    // Get portfolio companies (only portfolio, not deal/early stage)
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

      try {
        // Extract domain from website for better search targeting
        let websiteDomain = '';
        let websiteUrl = company.website || '';
        if (websiteUrl) {
          try {
            // Clean up URL and extract domain
            if (!websiteUrl.startsWith('http')) {
              websiteUrl = 'https://' + websiteUrl;
            }
            const urlObj = new URL(websiteUrl);
            websiteDomain = urlObj.hostname.replace('www.', '');
          } catch (e) {
            websiteDomain = '';
          }
        }

        // Build specific search terms
        const searchTerms = [company.name];
        if (websiteDomain) {
          searchTerms.push(websiteDomain);
        }

        // Search for news about this company - more flexible approach
        const newsSearchPrompt = `TODAY'S DATE: ${today}

Search for recent news about this company:

COMPANY: ${company.name}
WEBSITE: ${websiteUrl || 'Unknown'}
DESCRIPTION: ${company.description || 'A technology company'}

Find 3-8 news items from the past 6 months (${sixMonthsAgo} to ${today}).

TYPES OF NEWS TO FIND:
- Funding rounds, investments, financial news
- Product launches, features, updates
- Partnerships, customer announcements
- Leadership changes, key hires
- Awards, recognitions, milestones
- Industry news that directly mentions ${company.name}

RESPONSE FORMAT:
- title: Headline of the news
- summary: 2-3 sentence summary
- date: YYYY-MM-DD format (estimate if needed, must be within date range)
- source_url: URL if available, or empty string
- category: one of "company", "funding", "product", "partnership", "market"

If you find news, return it. If the company is small/stealth and has no public news, return news about their market or competitors that would be relevant to investors in ${company.name}.`;

        const newsData = await base44.integrations.Core.InvokeLLM({
          prompt: newsSearchPrompt,
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
                    date: { type: "string" },
                    source_url: { type: "string" },
                    category: {
                      type: "string",
                      enum: ["company", "funding", "product", "partnership", "market"]
                    }
                  },
                  required: ["title", "summary", "category"]
                }
              },
              search_period: { type: "string" }
            },
            required: ["news_items"]
          }
        });

        const newsItems = newsData.news_items || [];

        // Process news items - be lenient with dates
        const processedNews = newsItems.map(item => {
          let itemDate;
          try {
            itemDate = new Date(item.date);
            // If date is invalid or in the future, use today
            if (isNaN(itemDate.getTime()) || itemDate > new Date()) {
              itemDate = new Date();
            }
            // If date is too old (more than 6 months), use 6 months ago
            if (itemDate < cutoffDate) {
              itemDate = cutoffDate;
            }
          } catch {
            itemDate = new Date();
          }
          return {
            ...item,
            date: itemDate.toISOString().split('T')[0]
          };
        });

        // Sort by date (most recent first) and limit to 10
        const sortedNews = processedNews
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);

        // Update the company's news field
        await base44.asServiceRole.entities.PortfolioCompany.update(company.id, {
          news: sortedNews,
          news_last_updated: new Date().toISOString()
        });

        results.updated++;
        results.companies.push({
          name: company.name,
          news_count: sortedNews.length,
          status: 'updated'
        });

      } catch (error) {
        console.error(`Error refreshing news for ${company.name}:`, error);
        results.companies.push({
          name: company.name,
          news_count: 0,
          status: 'error: ' + error.message
        });
      }
    }

    return Response.json({
      success: true,
      summary: `Refreshed news for ${results.updated}/${results.processed} companies`,
      results
    });

  } catch (error) {
    console.error('Company news refresh error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});
