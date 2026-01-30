import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { text_blob } = await req.json();

    if (!text_blob) {
      return Response.json({ error: 'text_blob is required' }, { status: 400 });
    }

    // Use AI to parse the messy text and extract companies
    const parsePrompt = `You are an AI assistant helping parse investor portfolio data. You've been given a messy text blob containing information about various companies. Your job is to:

1. Identify all companies mentioned
2. Categorize each as: "portfolio" (current investments), "deal" (in due diligence/negotiation), or "early" (initial contact/early discussions)
3. Extract whatever information is available for each company

TEXT BLOB:
${text_blob}

Extract companies and categorize them based on context clues:
- Portfolio: terms like "invested", "portfolio company", "Series B", "current holding", "we own"
- Deal: terms like "due diligence", "term sheet", "negotiating", "evaluating", "deal stage"  
- Early: terms like "initial meeting", "first contact", "exploring", "early conversation", "cold email"

If stage is unclear, default to "early". Extract any available info like: company name, website, description, founder name, deal size, valuation, etc.`;

    const parsed = await base44.integrations.Core.InvokeLLM({
      prompt: parsePrompt,
      add_context_from_internet: false,
      response_json_schema: {
        type: "object",
        properties: {
          companies: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                stage: { type: "string", enum: ["portfolio", "deal", "early"] },
                website: { type: "string" },
                description: { type: "string" },
                founder_name: { type: "string" },
                founder_email: { type: "string" },
                deal_size: { type: "string" },
                valuation: { type: "string" },
                notes: { type: "string" }
              },
              required: ["name", "stage"]
            }
          }
        }
      }
    });

    // Now enrich each company with additional data
    const enrichedCompanies = [];
    
    for (const company of parsed.companies) {
      try {
        // Use AI to find additional information about the company
        const enrichPrompt = `Find detailed information about the company "${company.name}" ${company.website ? `(${company.website})` : ''}.

Provide:
1. Full company description (what they do, their product/service)
2. Official website URL
3. Market/industry information
4. Any recent news or developments
5. Competitor landscape

Be thorough and accurate. If you can't find information, return null for that field.`;

        const enriched = await base44.integrations.Core.InvokeLLM({
          prompt: enrichPrompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              full_description: { type: "string" },
              website: { type: "string" },
              market_info: { type: "string" },
              recent_news: { type: "string" }
            }
          }
        });

        enrichedCompanies.push({
          ...company,
          description: enriched.full_description || company.description,
          website: enriched.website || company.website,
          market_context: enriched.market_info,
          ai_notes: enriched.recent_news
        });
      } catch (error) {
        console.error(`Error enriching ${company.name}:`, error);
        enrichedCompanies.push(company);
      }
    }

    return Response.json({
      success: true,
      companies: enrichedCompanies,
      total: enrichedCompanies.length,
      breakdown: {
        portfolio: enrichedCompanies.filter(c => c.stage === 'portfolio').length,
        deal: enrichedCompanies.filter(c => c.stage === 'deal').length,
        early: enrichedCompanies.filter(c => c.stage === 'early').length
      }
    });

  } catch (error) {
    console.error('Parse companies error:', error);
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
});