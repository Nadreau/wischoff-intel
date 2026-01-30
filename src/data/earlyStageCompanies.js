export const earlyStageCompanies = [
  {
    id: "es-1",
    name: "DockFlow",
    contact_name: "Sarah Chen",
    contact_email: "sarah@dockflow.io",
    website: "https://dockflow.io",
    description: "AI-powered warehouse dock scheduling and yard management platform for distribution centers. Replaces manual dock appointment scheduling (still done via phone/email at 70% of warehouses) with automated optimization that reduces driver wait times by 60% and increases dock utilization by 35%.",
    contact_source: "referral",
    stage: "meeting_scheduled",
    last_contact_date: "2025-01-29",
    email_thread_count: 3,
    market: "Logistics / Supply Chain Tech",
    ai_summary: "Referred by Cargado team. DockFlow addresses a massive operational pain point in logistics — warehouse dock scheduling. Manual scheduling creates 2-3 hour driver wait times, costing the industry $75B+ annually. Strong founder with Amazon Fulfillment background. Product showing 60% wait time reduction in pilots.",
    notes: "Sarah spent 6 years at Amazon building dock scheduling systems for fulfillment centers. She saw that most third-party warehouses and distribution centers still schedule dock appointments via phone and email. DockFlow's AI optimizes dock assignments, driver arrival windows, and yard movements. Three pilot customers showing strong results. This fits perfectly with our logistics thesis.",
    market_size: "$12B warehouse management and dock scheduling software market by 2028",
    market_growth: "15% CAGR",
    team_background: [
      "Sarah Chen — CEO, ex-Amazon Fulfillment (6 years), built dock scheduling systems for 200+ fulfillment centers",
      "Marcus Rivera — CTO, ex-Uber Freight engineering lead, deep expertise in logistics optimization algorithms",
      "Team of 12 — engineering-heavy (8 engineers), 2 logistics domain experts, 2 sales",
      "Advisory board includes former VP of Operations at XPO Logistics and former CTO of project44"
    ],
    competitive_landscape: [
      { name: "OpenDock", positioning: "Leading dock scheduling tool — established but basic optimization, not AI-powered" },
      { name: "C3 Reservations (Descartes)", positioning: "Enterprise dock scheduling from Descartes — legacy platform, complex implementation" },
      { name: "FourKites", positioning: "Visibility platform expanding into yard management — broader but less focused on dock optimization" },
      { name: "RELEX Solutions", positioning: "Supply chain planning platform — warehouse optimization at macro level, not dock-level scheduling" }
    ],
    green_flags: [
      "Founder has deep domain expertise — built exactly this system at Amazon scale",
      "Clear quantifiable ROI: 60% wait time reduction, 35% dock utilization improvement",
      "Pilot customers converting to paid contracts at strong ACVs ($50K-$100K)",
      "Massive underdigitized market — 70% of warehouses still schedule by phone/email",
      "Strong logistics ecosystem referrals (project44, Cargado team both recommended)"
    ],
    red_flags: [
      "Early stage — only 3 pilot customers, need to prove repeatable sales motion",
      "Warehouse operators are notoriously slow to adopt new technology",
      "OpenDock has a head start with broader customer base, even if less sophisticated",
      "Integration complexity with existing WMS systems could slow deployments"
    ],
    recommendation: "advance_to_deal_stage",
    recommendation_reasoning: "DockFlow hits our logistics thesis perfectly — digitizing a massive manual process in an 'unsexy' part of the supply chain. Sarah's Amazon background gives her unique insight and credibility. The pilot metrics (60% wait time reduction) are compelling. Recommend advancing to deal stage for seed investment evaluation.",
    key_questions: [
      "What's the average implementation timeline from contract to live? How much change management is needed?",
      "How do you handle integration with legacy WMS systems (Manhattan Associates, Blue Yonder)?",
      "What's the expansion motion — land with one distribution center, expand to the network?",
      "How defensible is the AI optimization vs. simpler rule-based scheduling?"
    ],
    market_assessment: "The warehouse dock scheduling market is a classic 'unsexy but essential' opportunity. Driver detention (waiting at docks) costs the US freight industry $75B+ annually. Most warehouses still manage dock appointments manually, creating massive inefficiency. The shift to e-commerce has increased dock complexity (more frequent, smaller deliveries), making optimization more valuable. DockFlow's AI approach is meaningfully better than existing rule-based tools like OpenDock.",
    touchpoints: [
      { date: "2025-01-15", type: "email", summary: "Intro from Cargado team — Matt Silver recommended DockFlow as a strong fit for our logistics thesis." },
      { date: "2025-01-22", type: "call", summary: "Initial call with Sarah — walked through product demo and pilot results. 60% wait time reduction at Sysco distribution center." },
      { date: "2025-01-29", type: "meeting", summary: "In-person meeting scheduled for Feb 3. Will review financials, expansion plans, and round details." }
    ]
  },
  {
    id: "es-2",
    name: "GradeBeam",
    contact_name: "Jason Park",
    contact_email: "jason@gradebeam.com",
    website: "https://gradebeam.com",
    description: "AI-powered construction estimating and takeoff platform that automates quantity surveying from blueprints. Reduces estimating time from days to hours using computer vision to read architectural plans and generate material quantities, cost estimates, and bid proposals.",
    contact_source: "event",
    stage: "follow_up",
    last_contact_date: "2025-01-25",
    email_thread_count: 2,
    market: "Construction Tech / Estimating",
    ai_summary: "Met at Construction Tech Summit. GradeBeam automates the most time-consuming part of construction bidding — quantity takeoff from blueprints. Traditional process takes 3-5 days per project; GradeBeam does it in 2 hours with 95% accuracy. 80+ general contractors using the platform. Fits our 'unsexy industries' thesis perfectly.",
    notes: "Jason is a former GC estimator who learned to code. He built GradeBeam because he lived the pain — spending 60-hour weeks doing manual takeoffs from blueprints. The computer vision model is trained on 50,000+ construction plans and can identify structural elements, materials, and quantities. The 95% accuracy rate is critical — contractors need to trust the numbers to bid competitively. Strong word-of-mouth growth in the GC community.",
    market_size: "$8.5B construction estimating software market by 2028",
    market_growth: "12% CAGR",
    team_background: [
      "Jason Park — CEO, former general contractor estimator (12 years), self-taught engineer, construction domain expert",
      "Priya Mehta — CTO, ex-Google (computer vision team), PhD in computer science from Stanford",
      "Team of 18 — 10 engineers (6 ML/CV), 4 construction domain experts, 4 sales/support",
      "Advisory board includes former CEO of Procore and VP of Estimating at Turner Construction"
    ],
    competitive_landscape: [
      { name: "PlanSwift", positioning: "Legacy takeoff software — manual point-and-click, no AI automation" },
      { name: "Bluebeam", positioning: "PDF markup tool for construction — widely used but not AI-automated takeoff" },
      { name: "STACK Construction Technologies", positioning: "Cloud-based takeoff platform — some automation but not CV/AI-powered" },
      { name: "Togal.AI", positioning: "AI takeoff competitor — similar approach, raised $6M, more focused on commercial GCs" }
    ],
    green_flags: [
      "Founder lived the problem for 12 years — deep authentic domain expertise",
      "95% accuracy rate on AI takeoffs — contractors trust the output for bidding",
      "80+ GCs using the platform with strong word-of-mouth growth",
      "CTO has Google computer vision pedigree — strong technical leadership",
      "Construction estimating is a $8.5B market ripe for AI disruption"
    ],
    red_flags: [
      "Togal.AI is a direct competitor with a head start on fundraising",
      "Construction industry adoption of AI is still very early — education required",
      "Accuracy below 95% on complex/unusual plan types could erode trust quickly",
      "Scaling beyond GC estimating to subcontractors requires different product features"
    ],
    recommendation: "follow_up",
    recommendation_reasoning: "GradeBeam is a compelling 'unsexy industries' investment in construction tech. The founder's authenticity and domain expertise are exceptional. Need to validate the AI accuracy across diverse plan types and understand the competitive dynamics with Togal.AI before advancing to deal stage.",
    key_questions: [
      "How does accuracy vary across plan types (residential vs. commercial vs. industrial)?",
      "What's the competitive differentiation vs. Togal.AI specifically?",
      "How do you handle plans that the AI can't process confidently — what's the human-in-the-loop workflow?",
      "What's the path from GC estimating to the broader construction workflow (scheduling, procurement)?"
    ],
    market_assessment: "Construction estimating is one of the most labor-intensive processes in the building industry. A typical commercial GC spends 3-5 days per bid doing manual quantity takeoffs from blueprints — and only wins 15-20% of bids. This means enormous wasted effort on losing bids. AI-automated takeoff that reduces this to hours fundamentally changes the economics of bidding, allowing GCs to bid more projects and win more work. The $8.5B estimating software market is dominated by legacy tools (PlanSwift, Bluebeam) that digitize but don't automate the process.",
    touchpoints: [
      { date: "2025-01-18", type: "meeting", summary: "Met Jason at Construction Tech Summit — 20-minute demo of AI takeoff from a commercial building plan. Impressive accuracy." },
      { date: "2025-01-25", type: "call", summary: "Follow-up call — discussed metrics, competitive landscape, and fundraising plans. Raising $6M seed round." }
    ]
  },
  {
    id: "es-3",
    name: "TradeCredit",
    contact_name: "Alex Okafor",
    contact_email: "alex@tradecredit.com",
    website: "https://tradecredit.com",
    description: "Embedded B2B credit and net terms platform for industrial distributors. Enables distributors to offer net-30/60/90 terms to their customers while TradeCredit underwrites and funds the receivables — removing credit risk from the distributor's balance sheet.",
    contact_source: "portfolio",
    stage: "responded",
    last_contact_date: "2025-01-26",
    email_thread_count: 2,
    market: "B2B Fintech / Trade Credit",
    ai_summary: "Referred by Nickel team — adjacent space. TradeCredit enables industrial distributors to offer net terms without carrying credit risk. Distributors embed TradeCredit at checkout; TradeCredit underwrites the buyer, funds the distributor immediately, and collects from the buyer. $3M ARR growing 120% YoY. Fits our B2B fintech + industrial thesis.",
    notes: "Alex previously built credit models at Shopify Capital. He saw that B2B trade credit — the lifeblood of industrial commerce — is still done on handshake deals and manual credit applications. TradeCredit automates underwriting using business data signals (bank transactions, trade references, industry benchmarks) and provides instant credit decisions. The embedded model (distributor white-labels TradeCredit at checkout) is brilliant distribution.",
    market_size: "$1.5T B2B trade credit market (US)",
    market_growth: "B2B BNPL/credit growing at 28% CAGR",
    team_background: [
      "Alex Okafor — CEO, ex-Shopify Capital (built SMB credit models), ex-Goldman Sachs credit risk",
      "Nina Zhang — CTO, ex-Stripe (risk engineering), built fraud detection systems at scale",
      "Team of 22 — 12 engineers, 4 credit/risk analysts, 6 sales/ops",
      "Seed round investors include QED Investors, Ribbit Capital"
    ],
    competitive_landscape: [
      { name: "Resolve Pay", positioning: "B2B net terms platform — $15M+ raised, similar model but focused on e-commerce wholesale" },
      { name: "Credit Key", positioning: "B2B financing at checkout — more focused on equipment/high-ticket purchases" },
      { name: "Behalf", positioning: "B2B financing for SMBs — broader credit approach, less embedded at point-of-sale" },
      { name: "Balance", positioning: "B2B payments and checkout — includes credit features but broader payments focus" }
    ],
    green_flags: [
      "Founder has exceptional credit modeling background (Shopify Capital + Goldman Sachs)",
      "Embedded distribution model creates sticky relationships with distributors",
      "$3M ARR growing 120% YoY — strong traction for a seed-stage company",
      "B2B trade credit is a $1.5T market with massive underdigitization",
      "QED and Ribbit Capital seed investors validate the fintech approach"
    ],
    red_flags: [
      "Credit risk in cyclical industrial sectors — defaults could spike in a downturn",
      "Resolve Pay is a well-funded direct competitor in the same space",
      "Dependent on distributor partnerships for distribution — single channel risk",
      "Regulatory scrutiny on embedded lending models increasing"
    ],
    recommendation: "advance_to_deal_stage",
    recommendation_reasoning: "TradeCredit is building exactly the kind of embedded B2B fintech we look for — digitizing credit in industrial commerce. The founder's Shopify Capital + Goldman background is ideal. $3M ARR at 120% growth is exceptional for seed stage. The Nickel team's referral adds conviction. Recommend advancing for Series A evaluation.",
    key_questions: [
      "What are your default rates by industry vertical? How do they compare to traditional trade credit losses?",
      "How concentrated is your distributor base? What's the largest single distributor as % of GMV?",
      "How does your underwriting handle new businesses with limited data? What's the approval rate?",
      "What's the path to profitability — at what GMV do credit losses + ops costs get covered by fees?"
    ],
    market_assessment: "B2B trade credit is the hidden giant of commercial finance — $1.5T in the US alone. Most trade credit is still extended based on manual credit applications, trade references, and relationship-based decisions. This creates a massive opportunity for data-driven, embedded credit platforms. The industrial segment (construction supplies, wholesale distribution, manufacturing) is particularly underserved by existing fintech solutions that focus on e-commerce. TradeCredit's embedded approach — white-labeling credit at the distributor's checkout — is the winning distribution model.",
    touchpoints: [
      { date: "2025-01-20", type: "email", summary: "Intro from Nickel team — flagged TradeCredit as a strong company in adjacent B2B credit space." },
      { date: "2025-01-26", type: "call", summary: "Initial call with Alex — impressive background and metrics. $3M ARR, 120% growth, 50+ distributor partners." }
    ]
  },
  {
    id: "es-4",
    name: "PileDriver",
    contact_name: "Marcus Washington",
    contact_email: "marcus@piledriver.ai",
    website: "https://piledriver.ai",
    description: "AI-powered construction project scheduling and resource optimization platform. Uses machine learning trained on 10,000+ construction projects to predict realistic timelines, identify scheduling conflicts, and optimize crew/equipment allocation across multiple job sites.",
    contact_source: "event",
    stage: "follow_up",
    last_contact_date: "2025-01-23",
    email_thread_count: 2,
    market: "Construction Tech / Project Management",
    ai_summary: "Met at BuiltWorlds conference. PileDriver is applying AI to construction scheduling — traditionally done in Microsoft Project or Primavera P6 with zero intelligence. The ML model predicts realistic durations based on historical data (weather, crew productivity, material lead times). 40+ commercial GCs using the platform. Strong construction tech thesis fit.",
    notes: "Marcus is a former project manager at Skanska who got frustrated with the gap between planned schedules and reality on construction sites. PileDriver's AI model is trained on data from 10,000+ completed construction projects and adjusts schedules based on real-world variables — weather forecasts, supply chain delays, crew availability, and inspection timelines. The platform has reduced schedule overruns by 25% for pilot customers.",
    market_size: "$14B construction project management software market by 2028",
    market_growth: "13% CAGR",
    team_background: [
      "Marcus Washington — CEO, ex-Skanska project manager (10 years), MS in Construction Management from Stanford",
      "Emily Torres — CTO, ex-Palantir (Foundry team), expertise in large-scale data platform engineering",
      "Team of 15 — 9 engineers, 3 construction PMs, 3 sales",
      "Backed by Fifth Wall Ventures (seed) and Brick & Mortar Ventures"
    ],
    competitive_landscape: [
      { name: "Procore", positioning: "Dominant construction management platform ($10B+ market cap) — broad but scheduling is basic" },
      { name: "Oracle Primavera P6", positioning: "Legacy scheduling tool — powerful but complex, not AI-powered, enterprise-only" },
      { name: "ALICE Technologies", positioning: "AI construction scheduling — closest competitor, raised $30M+, focuses on mega-projects" },
      { name: "Buildots", positioning: "AI construction progress tracking — adjacent but focused on monitoring, not scheduling" }
    ],
    green_flags: [
      "Founder combines deep construction PM experience with Stanford construction management background",
      "25% reduction in schedule overruns is a clear, quantifiable ROI for contractors",
      "CTO's Palantir background is ideal for building data-intensive construction platforms",
      "Fifth Wall backing (top PropTech/ConTech VC) validates the thesis",
      "10,000+ project training dataset creates a data moat"
    ],
    red_flags: [
      "ALICE Technologies is a well-funded direct competitor ($30M+ raised) in AI construction scheduling",
      "Construction scheduling is deeply embedded in workflows — switching costs are high but so is resistance",
      "Training data quality depends on accurate project completion records — often poor in construction",
      "Procore could add AI scheduling features leveraging their massive customer base"
    ],
    recommendation: "follow_up",
    recommendation_reasoning: "PileDriver addresses a real pain point (construction schedule overruns cost the industry $60B+ annually) with a credible AI approach. The founder-market fit is strong. Need to understand competitive dynamics with ALICE Technologies and validate the data moat before advancing.",
    key_questions: [
      "How does PileDriver differentiate from ALICE Technologies? What project segments does each serve best?",
      "What's the data pipeline for training — how do you get accurate completion data from GCs?",
      "How does the product integrate with Procore and other existing construction PM tools?",
      "What's the wedge — do GCs start with scheduling and expand to resource optimization, or vice versa?"
    ],
    market_assessment: "Construction schedule overruns are endemic — 77% of projects finish late, costing the industry $60B+ annually. Traditional scheduling tools (Primavera P6, Microsoft Project) are static planning tools that don't adapt to real-world variables. AI-powered scheduling that learns from historical project data and adapts in real-time is a massive opportunity. The construction PM software market is $14B and dominated by Procore for general project management but lacking in intelligent scheduling.",
    touchpoints: [
      { date: "2025-01-18", type: "meeting", summary: "Met Marcus at BuiltWorlds conference — impressive product demo showing AI schedule optimization for a commercial office build." },
      { date: "2025-01-23", type: "call", summary: "Follow-up call — discussed metrics (40+ GC customers, 25% schedule improvement), competitive dynamics, and Series A plans." }
    ]
  },
  {
    id: "es-5",
    name: "BulkPay",
    contact_name: "Raj Patel",
    contact_email: "raj@bulkpay.co",
    website: "https://bulkpay.co",
    description: "Payments and invoicing platform for bulk material suppliers (aggregate, concrete, lumber). Automates weight-ticket-to-invoice workflows, integrates with scale systems, and provides real-time AR visibility — replacing the paper tickets and manual invoicing that dominate the building materials industry.",
    contact_source: "referral",
    stage: "responded",
    last_contact_date: "2025-01-24",
    email_thread_count: 1,
    market: "B2B Fintech / Construction Materials",
    ai_summary: "Referred by Nickel investor network. BulkPay automates invoicing for bulk material suppliers — a niche that seems small but is massive (US building materials distribution is $200B+). Weight tickets from scales are still printed on paper and manually entered into invoices. BulkPay automates this end-to-end. 25 supplier customers, $800K ARR.",
    notes: "Raj's family owns a concrete supply business — he grew up watching his parents drown in paper weight tickets every evening. BulkPay connects directly to truck scales, automatically generates invoices from weight data, and handles AR/collections. The product is dead simple and the ROI is immediate — suppliers save 10-15 hours per week on invoicing. This is the definition of our 'unsexy industries' thesis. Very early but compelling founder-market fit.",
    market_size: "$200B+ US building materials distribution",
    market_growth: "8% CAGR for construction materials software",
    team_background: [
      "Raj Patel — CEO, grew up in family concrete business, CS degree from Georgia Tech, ex-Square (2 years)",
      "Dana Kim — CTO, ex-Toast (senior engineer), built POS integrations for restaurants",
      "Team of 8 — 5 engineers, 2 sales, 1 ops",
      "Bootstrapped to $800K ARR before seeking seed funding"
    ],
    competitive_landscape: [
      { name: "Command Alkon", positioning: "Legacy ERP for ready-mix concrete and aggregates — dominant but old and expensive" },
      { name: "Apex (Trimble)", positioning: "Heavy construction materials management — enterprise-focused, not SMB-friendly" },
      { name: "BCMI (U.S. Concrete subsidiary)", positioning: "Batch plant management — narrowly focused on concrete production, not broad materials" },
      { name: "Jonel Engineering", positioning: "Scale/ticketing systems — hardware-focused, not SaaS invoicing platform" }
    ],
    green_flags: [
      "Founder grew up in the industry — authentic domain expertise and personal passion",
      "Bootstrapped to $800K ARR — capital-efficient execution with proven demand",
      "Dead simple value prop — replace paper tickets with automated invoicing, save 10-15 hours/week",
      "Building materials distribution is $200B+ and deeply underdigitized",
      "Strong referral growth from supplier communities — word-of-mouth in tight-knit industry"
    ],
    red_flags: [
      "Very early — 25 customers, small team, limited product breadth",
      "Command Alkon is a deeply entrenched incumbent in ready-mix/aggregates",
      "Niche market focus — may limit total addressable scale",
      "Hardware integration (scale systems) adds implementation complexity"
    ],
    recommendation: "follow_up",
    recommendation_reasoning: "BulkPay is exactly our thesis — digitizing payments in an unsexy industrial vertical. The bootstrapped traction ($800K ARR) and founder-market fit are exceptional. Need to validate market size, expansion potential (beyond weight tickets to full AR/AP), and competitive moat before advancing.",
    key_questions: [
      "How many bulk material suppliers are there in the US? What's the realistic TAM for this specific product?",
      "What's the expansion path — from invoicing to full AR management, credit, and payments?",
      "How do you handle integration with the 15+ different scale system manufacturers?",
      "What's the churn rate? Are suppliers sticky once they adopt?"
    ],
    market_assessment: "Building materials distribution is one of the most underdigitized segments of construction — suppliers still rely on paper weight tickets from truck scales, manual data entry into accounting systems, and phone-based collections. The US has 30,000+ aggregate, concrete, and lumber suppliers, many operating as family businesses with minimal technology adoption. BulkPay's product addresses the single biggest time sink (weight-ticket-to-invoice workflow) and creates a foundation for broader financial products (AR management, credit, payments). The market is niche but surprisingly large and deeply loyal once trust is established.",
    touchpoints: [
      { date: "2025-01-24", type: "email", summary: "Intro from Nickel investor network — flagged BulkPay as a strong unsexy-industries opportunity in construction materials." }
    ]
  },
  {
    id: "es-6",
    name: "LoadFi",
    contact_name: "Christina Alvarez",
    contact_email: "christina@loadfi.com",
    website: "https://loadfi.com",
    description: "Embedded financial services platform for freight brokerages. Provides instant carrier payments, factoring, and fuel advances through white-label API integration — enabling freight brokers to offer financial products to their carrier networks without building infrastructure.",
    contact_source: "portfolio",
    stage: "meeting_scheduled",
    last_contact_date: "2025-01-28",
    email_thread_count: 3,
    market: "Freight Fintech / Embedded Finance",
    ai_summary: "Referred by Cargado and Coast teams independently — strong signal. LoadFi embeds financial services into freight brokerage platforms, enabling brokers to offer instant carrier payments (vs. 30-45 day standard) and fuel advances. $2.5M ARR, 15 brokerage partners, processing $50M+ monthly in carrier payments. Compelling freight fintech thesis.",
    notes: "Christina spent 8 years at C.H. Robinson (largest US freight broker) in their finance operations. She saw that carriers' #1 pain point is cash flow — they haul loads and wait 30-45 days for payment. Factoring companies charge 3-5% to advance payment. LoadFi embeds faster-pay options directly into brokerage platforms at lower cost (1-2%), funded by institutional capital. The white-label model means brokers can offer 'QuickPay' branded as their own product, increasing carrier loyalty. Dual referral from Cargado and Coast teams is very strong signal.",
    market_size: "$25B freight factoring and carrier finance market",
    market_growth: "18% CAGR",
    team_background: [
      "Christina Alvarez — CEO, 8 years at C.H. Robinson (finance operations), MBA from Wharton",
      "David Okonkwo — CTO, ex-Plaid (senior engineer), built financial data infrastructure",
      "Team of 20 — 10 engineers, 4 credit/risk, 6 ops/sales",
      "Seed investors include Trucks VC, Clocktower Technology Ventures"
    ],
    competitive_landscape: [
      { name: "Triumph Financial (TriumphPay)", positioning: "Public company — dominant carrier payments network, acquiring freight factoring companies" },
      { name: "RTS Financial", positioning: "Large freight factoring company — traditional model, not embedded" },
      { name: "OTR Solutions", positioning: "Freight factoring and fuel cards — traditional factoring company adding tech" },
      { name: "Denim", positioning: "Freight factoring and payments platform — similar embedded approach, raised $126M" }
    ],
    green_flags: [
      "Dual referral from Cargado and Coast teams — strong portfolio network signal",
      "Founder has deep freight finance expertise from C.H. Robinson",
      "$2.5M ARR with $50M+ monthly payment volume — strong early traction",
      "Embedded model creates sticky brokerage relationships — churn is extremely low once integrated",
      "CTO's Plaid background is ideal for building financial infrastructure"
    ],
    red_flags: [
      "Denim is a well-funded direct competitor ($126M raised) with similar embedded model",
      "Triumph Financial (public company) is consolidating carrier payments market aggressively",
      "Credit risk in carrier lending — freight market downturns increase default rates",
      "Margin compression as the embedded carrier payments market matures"
    ],
    recommendation: "advance_to_deal_stage",
    recommendation_reasoning: "LoadFi sits at the intersection of our freight and fintech theses — embedded financial services for carrier networks. The dual portfolio referral, strong early metrics ($2.5M ARR, $50M+ monthly volume), and founder's C.H. Robinson background create high conviction. Recommend advancing to deal stage for Series A evaluation.",
    key_questions: [
      "What's the default rate on carrier advances? How does it vary with freight market conditions?",
      "How do you compete with Denim's $126M war chest? What's your differentiation?",
      "What's the unit economics per brokerage partner? How does revenue scale with each integration?",
      "How does Triumph Financial's consolidation of carrier payments affect your competitive position?"
    ],
    market_assessment: "Freight factoring is a $25B market dominated by traditional factoring companies that charge carriers 3-5% to get paid faster. The embedded model — integrating instant payments directly into brokerage platforms — is the next evolution. Instead of carriers going to a third-party factoring company, they get faster payment within their existing brokerage relationship. This creates better economics (lower rates), better experience (seamless), and higher loyalty (carriers prefer brokers that offer quick pay). LoadFi's white-label approach makes it invisible to carriers but transformative for brokerage competitiveness.",
    touchpoints: [
      { date: "2025-01-15", type: "email", summary: "Intro from Cargado team — Matt Silver flagged LoadFi as a compelling freight fintech opportunity." },
      { date: "2025-01-20", type: "email", summary: "Separate intro from Coast team — confirmed LoadFi is doing interesting work in fleet/carrier payments." },
      { date: "2025-01-28", type: "call", summary: "Initial call with Christina — impressive metrics and domain expertise. Meeting scheduled for Feb 5 to discuss Series A round." }
    ]
  }
];
