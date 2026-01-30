import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { companies } = await req.json();

    if (!companies || !Array.isArray(companies)) {
      return Response.json({ error: 'companies array is required' }, { status: 400 });
    }

    const results = {
      portfolio: [],
      deal: [],
      early: [],
      errors: []
    };

    // Import each company into the appropriate entity
    for (const company of companies) {
      try {
        if (company.stage === 'portfolio') {
          const created = await base44.asServiceRole.entities.PortfolioCompany.create({
            name: company.name,
            website: company.website,
            description: company.description,
            funding: {
              total: company.deal_size || null,
              valuation: company.valuation || null
            },
            market: {
              context: company.market_context || null
            }
          });
          results.portfolio.push(created);
        } else if (company.stage === 'deal') {
          const created = await base44.asServiceRole.entities.DealStageCompany.create({
            name: company.name,
            website: company.website,
            description: company.description,
            founder_name: company.founder_name,
            founder_email: company.founder_email,
            deal_size: company.deal_size,
            valuation: company.valuation,
            deal_stage: 'initial_meeting',
            next_steps: company.notes || company.ai_notes
          });
          results.deal.push(created);
        } else if (company.stage === 'early') {
          const created = await base44.asServiceRole.entities.EarlyStageCompany.create({
            name: company.name,
            website: company.website,
            description: company.description,
            contact_name: company.founder_name,
            contact_email: company.founder_email,
            contact_source: 'inbound',
            stage: 'new',
            notes: company.notes,
            ai_summary: company.ai_notes
          });
          results.early.push(created);
        }
      } catch (error) {
        console.error(`Error importing ${company.name}:`, error);
        results.errors.push({
          company: company.name,
          error: error.message
        });
      }
    } 

    return Response.json({
      success: true,
      imported: {
        portfolio: results.portfolio.length,
        deal: results.deal.length,
        early: results.early.length
      },
      errors: results.errors,
      details: results
    });

  } catch (error) {
    console.error('Import companies error:', error);
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
});