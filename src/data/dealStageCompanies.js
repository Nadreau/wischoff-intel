export const dealStageCompanies = [
  {
    id: "ds-1",
    name: "YardIQ",
    founder_name: "Derek Simmons",
    founder_email: "derek@yardiq.com",
    website: "https://yardiq.com",
    description: "AI-powered yard management and trailer tracking platform for distribution centers and manufacturing facilities. YardIQ uses computer vision and IoT sensors to provide real-time visibility into trailer locations, dock assignments, and yard movements — eliminating the manual 'yard checks' that cost logistics operations millions in lost time and misplaced trailers.",
    deal_stage: "term_sheet",
    deal_size: "$1.5M (Seed)",
    valuation: "$12M pre-money",
    market: { size: "$4.8B yard management and trailer tracking market by 2028", growth: "14% CAGR" },
    team_assessment: "Strong founder-market fit. Derek spent 15 years in logistics operations at Walmart and Amazon, managing yard operations for 200+ distribution centers. CTO Rachel Kim is ex-Samsara (built IoT fleet tracking features). Team of 10 with deep logistics and IoT expertise.",
    product_assessment: "Computer vision + IoT approach to yard management is genuinely differentiated. Pilot results are compelling: 45% reduction in trailer dwell time, 30% improvement in dock utilization, 90% reduction in lost trailer incidents. 8 pilot customers including a Fortune 500 retailer. Product integrates with existing WMS (Manhattan, Blue Yonder) and TMS systems.",
    meeting_count: 4,
    last_meeting_date: "2025-01-28",
    next_steps: "Final reference calls this week. Term sheet review scheduled for Feb 3. Key diligence item: validate Fortune 500 retailer expansion commitment.",
    opportunity_score: 8.5,
    concerns: [
      "FourKites and project44 could expand into yard management from their visibility platforms",
      "Hardware/IoT component adds deployment complexity and COGS vs. pure software",
      "Enterprise sales cycle in logistics is 6-9 months — need runway for long sales motion"
    ],
    champions: ["Nichole Wischoff"],
    team_deep_dive: "Derek Simmons is a logistics operations veteran — 15 years managing distribution center and yard operations at Walmart (8 years) and Amazon (7 years). At Amazon, he managed yard operations for 200+ fulfillment centers and saw firsthand the massive inefficiency of manual yard management: workers physically walking yards to locate trailers, calling drivers on radios, and updating spreadsheets. He estimates this manual process costs a single large DC $500K-$1M annually in labor and lost efficiency.\n\nCTO Rachel Kim spent 4 years at Samsara building IoT-based fleet tracking features, giving her deep expertise in computer vision, sensor networks, and real-time tracking at industrial scale. The engineering team (6 engineers) includes specialists in computer vision, IoT edge computing, and logistics system integrations.\n\nThe team is lean but experienced. Key risk: Derek has never been a startup CEO before — he's an operations leader learning the founder role. However, his domain expertise and customer relationships are exceptional.",
    due_diligence: {
      market_analysis: "Yard management is the forgotten middle child of logistics technology. While TMS (transportation) and WMS (warehouse) are well-served by modern software, the yard — where trailers sit between transportation and warehouse operations — is managed with clipboards and radios at most facilities. The $4.8B market includes yard management systems (YMS), trailer tracking, and dock scheduling. Current solutions from C3 Reservations (Descartes) and legacy YMS providers are rule-based and lack real-time intelligence.",
      competitive_intelligence: [
        { name: "FourKites", positioning: "Real-time visibility platform expanding from in-transit to yard/facility visibility", advantages: "Massive customer base (1,000+ shippers), strong brand, $200M+ raised", weaknesses: "Yard management is a side feature, not core product; limited IoT/CV capabilities" },
        { name: "C3 Reservations (Descartes)", positioning: "Leading dock scheduling and yard management — legacy but established", advantages: "Established customer base, part of Descartes logistics suite", weaknesses: "Legacy technology, no AI/CV, manual data entry required" },
        { name: "Yard Management Solutions (YMS)", positioning: "Niche YMS providers — basic yard management software", advantages: "Specialized focus, established implementations", weaknesses: "No AI, no IoT/CV, manual-dependent processes" }
      ],
      technology_assessment: "YardIQ's computer vision system uses existing facility cameras (no new hardware in most cases) plus optional IoT sensors to identify and track trailers in real-time. The CV model is trained on 500K+ trailer images and can identify trailer numbers, positions, and status (loaded/empty/sealed) with 97% accuracy. The IoT layer adds GPS/BLE sensors for facilities without camera coverage. The platform integrates bidirectionally with major WMS and TMS systems, enabling automated dock assignments and driver notifications.",
      regulatory_landscape: "No significant regulatory concerns. Standard enterprise SaaS compliance requirements (SOC 2, data privacy). IoT sensor deployment requires coordination with facility management but no regulatory approval.",
      go_to_market_strategy: "Land-and-expand in Fortune 500 logistics operations. Initial pilot at a single distribution center, then expand to the customer's full DC network. Derek's Walmart/Amazon relationships provide warm introductions to target accounts. Average deal starts at $50K ACV per facility, expanding to $500K-$1M for full network deployments.",
      financial_projections_review: "Current: 8 pilot customers, $200K ARR, growing to projected $1.2M ARR by year-end. Seed funding ($1.5M from Wischoff + co-investors) provides 18-month runway. Path to Series A requires 20+ customers and $2M+ ARR. Unit economics are favorable: 80%+ gross margin on software, 60% blended with IoT hardware.",
      investment_thesis: "YardIQ addresses a massive operational pain point in logistics — yard management — with a genuinely differentiated AI/IoT approach. Derek's 15 years of DC operations experience at Walmart and Amazon give him unmatched domain expertise and customer access. The pilot results (45% dwell time reduction, 30% dock utilization improvement) demonstrate clear ROI. At $12M pre-money, this is an attractive entry point for a seed investment in our core logistics thesis.",
      risk_matrix: [
        { risk: "FourKites expands yard management capabilities", severity: "medium", mitigation: "FourKites' yard features are basic — YardIQ's CV/IoT approach is fundamentally more capable. FourKites partnership could be more likely than competition." },
        { risk: "Enterprise sales cycle delays revenue growth", severity: "high", mitigation: "Derek's Fortune 500 relationships shorten the cycle. Focus on expanding within existing pilot customers." },
        { risk: "IoT hardware adds complexity and reduces margins", severity: "medium", mitigation: "Camera-first approach minimizes hardware needs; most facilities have existing cameras." },
        { risk: "First-time founder risk", severity: "medium", mitigation: "Strong CTO partner (Rachel, ex-Samsara). Provide hands-on founder coaching and board support." }
      ],
      key_concerns: [
        "First-time founder managing enterprise sales cycle and fundraising simultaneously",
        "IoT/hardware component increases deployment complexity vs. pure SaaS",
        "Need to validate that pilot results replicate across different facility types",
        "FourKites competitive dynamics — partnership vs. competition is unclear"
      ],
      reference_questions: [
        "How has YardIQ changed your daily yard operations? What did you do before?",
        "How long did implementation take? What was the biggest challenge?",
        "Would you expand YardIQ to other facilities in your network? Why or why not?",
        "How does YardIQ compare to other yard/dock tools you've evaluated?"
      ],
      recommendation: "approve_for_ic",
      recommendation_reasoning: "YardIQ is a high-conviction seed opportunity in our core logistics thesis. Derek's domain expertise, compelling pilot results, and the massive underserved yard management market create a strong investment case. At $12M pre-money, risk-reward is attractive. Recommend approval with conditions: validate Fortune 500 expansion commitment and complete reference calls."
    },
    touchpoints: [
      { date: "2024-12-10", type: "email", summary: "Derek reached out via warm intro from former Amazon colleague. Described YardIQ vision and early traction." },
      { date: "2025-01-05", type: "call", summary: "Initial call — product demo and pilot results review. Impressive CV technology and clear ROI metrics." },
      { date: "2025-01-15", type: "meeting", summary: "In-person meeting at YardIQ's pilot facility. Watched CV system in action — trailer tracking is seamless." },
      { date: "2025-01-28", type: "call", summary: "Term sheet discussion. $1.5M seed at $12M pre-money. Co-investors include Trucks VC." }
    ]
  },
  {
    id: "ds-2",
    name: "TrussPoint",
    founder_name: "Maria Santos",
    founder_email: "maria@trusspoint.com",
    website: "https://trusspoint.com",
    description: "Construction materials procurement platform connecting general contractors with suppliers. TrussPoint digitizes the RFQ (request for quote) process, provides real-time material pricing, and manages purchase orders — replacing the phone/email/fax procurement workflow that dominates construction.",
    deal_stage: "due_diligence",
    deal_size: "$2M (Seed)",
    valuation: "$15M pre-money",
    market: { size: "$600B US construction materials market", growth: "7.5% CAGR" },
    team_assessment: "Maria Santos is a former procurement director at Skanska (10 years) who managed $500M+ in annual material purchases. CTO James Liu is ex-Faire (built B2B marketplace matching). Team of 14 with strong construction + marketplace expertise.",
    product_assessment: "Digital RFQ platform with real-time pricing from 200+ suppliers. GCs can send RFQs to multiple suppliers simultaneously, compare bids side-by-side, and issue POs — all digitally. 50+ GC customers, $15M in GMV processed. Net promoter score of 72. Integration with Procore for project data.",
    meeting_count: 3,
    last_meeting_date: "2025-01-26",
    next_steps: "Deep dive on marketplace economics and supplier take rate. Reference calls with 3 GC customers. Review competitive dynamics with MTRL and Kojo.",
    opportunity_score: 7.9,
    concerns: [
      "Kojo ($45M+ raised) is the most direct competitor — well-funded and growing fast",
      "Construction procurement has many failed startups — 'construction is where tech goes to die'",
      "Marketplace liquidity (enough suppliers in each material category/geography) is critical"
    ],
    champions: ["Nichole Wischoff"],
    team_deep_dive: "Maria Santos spent 10 years at Skanska as a procurement director, managing $500M+ in annual material purchases across commercial and infrastructure projects. She witnessed the absurdity of faxing RFQs to 20 suppliers, receiving bids via email and phone, and manually entering everything into spreadsheets. Her domain expertise is unquestionable — she knows every material category, supplier relationship dynamic, and procurement pain point.\n\nJames Liu (CTO) spent 3 years at Faire building B2B marketplace matching algorithms, which directly applies to matching GCs with the right suppliers based on material specs, location, and delivery requirements. The engineering team (8 engineers) has experience with marketplace platforms and construction integrations.",
    touchpoints: [
      { date: "2025-01-10", type: "email", summary: "Maria introduced via Fifth Wall Ventures — strong recommendation based on her Skanska background." },
      { date: "2025-01-18", type: "call", summary: "Initial call — product walkthrough and metrics review. $15M GMV, 50+ GCs, Procore integration." },
      { date: "2025-01-26", type: "meeting", summary: "Deep dive on marketplace economics. Take rate is 2-3% from suppliers. Discussing seed round terms." }
    ]
  },
  {
    id: "ds-3",
    name: "ConcreteAI",
    founder_name: "Sanjay Krishnamurthy",
    founder_email: "sanjay@concreteai.co",
    website: "https://concreteai.co",
    description: "AI-powered concrete mix optimization platform that reduces cement usage by 20-30% while maintaining strength requirements. Uses ML models trained on millions of concrete test results to design optimized mixes — saving costs for producers and reducing carbon emissions (cement production is 8% of global CO2).",
    deal_stage: "due_diligence",
    deal_size: "$1.5M (Seed)",
    valuation: "$10M pre-money",
    market: { size: "$600B global concrete market", growth: "6.2% CAGR" },
    team_assessment: "Sanjay Krishnamurthy is a materials scientist with a PhD from MIT in cementitious materials. Co-founder Lisa Park is a ML engineer ex-DeepMind. Team of 8 — deep technical talent in both materials science and AI. Academic pedigree is exceptional.",
    product_assessment: "ML model trained on 3M+ concrete test results optimizes mix designs to reduce cement content while meeting strength and durability specs. Pilot results show 20-30% cement reduction, saving $5-15 per cubic yard. 6 concrete producers using the platform. Environmental angle (8% of global CO2) adds tailwind.",
    meeting_count: 3,
    last_meeting_date: "2025-01-27",
    next_steps: "Review technical validation from independent lab testing. Reference calls with 2 concrete producers. Evaluate IP landscape and defensibility of ML models.",
    opportunity_score: 8.2,
    concerns: [
      "Concrete producers are extremely conservative — changing mix designs risks structural failures",
      "Regulatory approval for optimized mixes may vary by jurisdiction and project type",
      "Small founding team — need to hire sales/GTM expertise for construction industry"
    ],
    champions: ["Nichole Wischoff"],
    due_diligence: {
      market_analysis: "Global concrete production is $600B annually, with cement representing 60-65% of concrete cost. Cement production is responsible for 8% of global CO2 emissions — making it one of the largest industrial contributors to climate change. Reducing cement content by 20-30% while maintaining structural integrity is both a massive cost savings ($5-15/cubic yard) and a significant environmental benefit. The market is enormous and the incentives for optimization are aligned across cost and sustainability.",
      competitive_intelligence: [
        { name: "Giatec Scientific", positioning: "Concrete testing and maturity monitoring — IoT sensors for concrete strength measurement", advantages: "Strong in concrete testing, $30M+ raised, established in the market", weaknesses: "Focused on monitoring, not mix optimization; different product" },
        { name: "CarbonCure", positioning: "CO2 injection into concrete — carbon sequestration approach to green concrete", advantages: "Strong brand in green concrete, raised $100M+, deployed at 700+ plants", weaknesses: "Different approach (CO2 injection vs. mix optimization); complementary not competitive" },
        { name: "Concrete.ai", positioning: "Similar AI mix optimization — direct competitor", advantages: "Similar approach, raised some funding", weaknesses: "Smaller dataset, less technical depth, narrower customer base" }
      ],
      technology_assessment: "ConcreteAI's ML model is trained on 3M+ concrete test results spanning different cement types, aggregates, admixtures, environmental conditions, and curing methods. The model can predict 28-day compressive strength within 5% accuracy and recommend optimized mixes that reduce cement by 20-30%. Independent lab testing by CTL Group confirmed the accuracy. The key technical moat is the training dataset — 3M+ results is orders of magnitude larger than any competitor.",
      regulatory_landscape: "Concrete mix designs must meet ACI (American Concrete Institute) standards and local building codes. ConcreteAI's optimized mixes comply with ACI standards, but project engineers and building departments may be skeptical of AI-optimized designs. The company works with structural engineers to validate each optimized mix for its intended application.",
      go_to_market_strategy: "Bottom-up adoption through concrete producers (ready-mix plants) who control mix designs. Each producer has 50-200 active mix designs; ConcreteAI optimizes each one. Land with a few mix designs at one plant, prove results, expand to all mixes and additional plants. Average starting ACV: $30K per plant, expanding to $100K+ for multi-plant networks.",
      financial_projections_review: "Very early: 6 pilot customers, $120K ARR. Seed funding ($1.5M) provides 18+ month runway. Path to Series A requires 25+ customers and $1M+ ARR. Unit economics are strong: 90%+ gross margin on pure software. The cement savings ($5-15/yard) creates 10-50x ROI for producers.",
      investment_thesis: "ConcreteAI addresses a $600B market with an AI approach that simultaneously reduces costs and carbon emissions. The 3M+ test result training dataset is a genuine moat. The founding team's MIT materials science + DeepMind ML combination is exceptionally rare. At $10M pre-money, this is an attractive entry point for a deep tech bet in industrial materials — perfectly aligned with our 'unsexy industries' thesis.",
      risk_matrix: [
        { risk: "Concrete producers resist AI-optimized mixes due to liability concerns", severity: "high", mitigation: "Independent lab validation and structural engineer partnerships reduce risk perception. Start with non-structural applications." },
        { risk: "Regulatory pushback on AI-designed concrete mixes", severity: "medium", mitigation: "All mixes comply with ACI standards. Building code compliance is validated per project." },
        { risk: "Small team lacks construction industry GTM experience", severity: "medium", mitigation: "Budget seed funding to include a construction industry sales hire." },
        { risk: "Dataset advantage could narrow as competitors collect more data", severity: "low", mitigation: "3M+ result head start is substantial; continuous data collection from customers maintains advantage." }
      ],
      key_concerns: [
        "Construction industry conservatism may slow adoption beyond early adopters",
        "Need to validate that optimized mixes perform consistently across diverse conditions",
        "Team needs construction sales expertise — both founders are technical",
        "Liability question: who's responsible if an AI-optimized mix underperforms?"
      ],
      reference_questions: [
        "How has ConcreteAI changed your mix design process? How much time and money has it saved?",
        "Have you had any quality issues with optimized mixes? How does ConcreteAI handle edge cases?",
        "How did your engineers react to AI-recommended mix designs? Was there resistance?",
        "Would you expand ConcreteAI to all your plants? What would hold you back?"
      ],
      recommendation: "approve_for_ic",
      recommendation_reasoning: "ConcreteAI is a rare deep tech opportunity in our 'unsexy industries' thesis — AI-optimized concrete that saves money and reduces carbon emissions. The founding team (MIT + DeepMind) is exceptional, the 3M+ test result dataset is a genuine moat, and the pilot results (20-30% cement reduction) are validated by independent labs. At $10M pre-money, the risk-reward is compelling for a seed investment."
    },
    touchpoints: [
      { date: "2025-01-08", type: "email", summary: "Sanjay reached out via MIT Venture Mentoring Service connection. Described ConcreteAI's technology and early traction." },
      { date: "2025-01-18", type: "call", summary: "Initial call — technical deep dive on ML model, training data, and pilot results. Impressive depth." },
      { date: "2025-01-27", type: "meeting", summary: "In-depth meeting to review independent lab validation results and discuss seed round terms." }
    ]
  },
  {
    id: "ds-4",
    name: "FleetLedger",
    founder_name: "Kara Nguyen",
    founder_email: "kara@fleetledger.io",
    website: "https://fleetledger.io",
    description: "Back-office automation platform for small and mid-size trucking companies. Automates driver settlements, IFTA fuel tax reporting, factoring reconciliation, and compliance document management — replacing the Excel spreadsheets and paper files that dominate trucking company back offices.",
    deal_stage: "initial_meeting",
    deal_size: "$1.5M (Seed)",
    valuation: "$11M pre-money",
    market: { size: "$8B trucking back-office software market", growth: "12% CAGR" },
    team_assessment: "Kara Nguyen grew up in her family's 50-truck trucking company and spent 5 years doing the back-office work FleetLedger automates. CTO Ryan Patel is ex-Gusto (payroll engineering). The founder-market fit is as strong as it gets — Kara is building the tool she desperately needed.",
    product_assessment: "Clean, modern platform that handles driver settlements (calculates per-mile and percentage pay), IFTA fuel tax reporting (automatically from ELD data), factoring reconciliation, and document management. 35 trucking companies using the platform, $400K ARR. NPS of 78. Strongest feature is IFTA automation — filing quarterly fuel tax reports is the #1 hated task in trucking back offices.",
    meeting_count: 1,
    last_meeting_date: "2025-01-25",
    next_steps: "Schedule full team meeting. Deep dive on trucking company unit economics and expansion potential. Evaluate competitive positioning vs. TruckingOffice and Rigbooks.",
    opportunity_score: 8.0,
    concerns: [
      "Trucking companies are extremely price-sensitive — need to validate willingness to pay for software",
      "Motive (ex-KeepTruckin) could bundle back-office features with their ELD/fleet management platform",
      "Small trucking companies have high failure rates — customer churn risk"
    ],
    champions: ["Nichole Wischoff"],
    touchpoints: [
      { date: "2025-01-18", type: "email", summary: "Kara introduced via Trucks VC network. Strong founder story — family trucking company background." },
      { date: "2025-01-25", type: "call", summary: "Initial call — impressive product demo and metrics. 35 trucking companies, $400K ARR, strong word-of-mouth growth." }
    ]
  }
];
