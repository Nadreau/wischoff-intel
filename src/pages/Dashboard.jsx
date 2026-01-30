import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { 
  Briefcase, 
  TrendingUp, 
  Bell,
  Sparkles,
  ChevronRight,
  Mail,
  FileCheck,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/dashboard/StatsCard';
import AlertCard from '@/components/dashboard/AlertCard';
import PortfolioTable from '@/components/dashboard/PortfolioTable';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [earlyStageCounts, setEarlyStageCounts] = useState(0);
  const [dealStageCounts, setDealStageCounts] = useState(0);
  const [unreadAlerts, setUnreadAlerts] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [portfolioData, earlyStageData, dealStageData, allAlerts, recentAlerts] = await Promise.all([
          base44.entities.PortfolioCompany.list(),
          base44.entities.EarlyStageCompany.list(),
          base44.entities.DealStageCompany.list(),
          base44.entities.Alert.list('-date'),
          base44.entities.Alert.list('-date', 6)
        ]);
        
        setCompanies(portfolioData);
        setEarlyStageCounts(earlyStageData.length);
        setDealStageCounts(dealStageData.length);
        setUnreadAlerts(allAlerts.filter(a => !a.read).length);
        setAlerts(allAlerts);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Welcome to Portfolio Intelligence
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Get started by importing your portfolio companies, deal pipeline, and early-stage contacts.
            </p>
            <Link to={createPageUrl('InvestorSettings')}>
              <Button className="gap-2 bg-slate-900 hover:bg-slate-800">
                <TrendingUp className="w-4 h-4" />
                Import Your Companies
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

// Legacy hardcoded data - now replaced with entity data
const portfolioData_OLD = [
  {
    "name": "TalentGraph",
    "website": "https://talentgraph.ai",
    "description": "TalentGraph is an AI-powered talent intelligence and recruiting platform that helps companies identify, engage, and hire top talent.",
    "funding": { "history": [], "total": null, "last_round": { "amount": null, "date": null }, "valuation": null },
    "market": { "size": "$3.85B by 2025, global talent intelligence and recruitment software market", "growth": "14.3% CAGR (2023-2028)" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "TalentGraph Raises $15M Series A to Expand AI-Powered Recruiting Platform", "date": "2025-01-28", "summary": "TalentGraph announced a $15 million Series A funding round led by Accel Partners." },
      { "title": "TalentGraph Launches Skills Graph 2.0 with Enhanced AI Matching", "date": "2025-01-22", "summary": "The company unveiled Skills Graph 2.0, featuring improved machine learning algorithms." }
    ],
    "analysis": { "opportunity_score": 7.8, "growth_trajectory": "Strong growth with proven AI capabilities and market traction", "health_assessment": "Healthy - scaling in high-growth recruitment tech market" },
    "growth_opportunities": [
      { "title": "European Market Expansion", "impact": "high", "identified_date": "2025-01-25" },
      { "title": "Enterprise Upsell Opportunity", "impact": "medium", "identified_date": "2025-01-20" }
    ]
  },
  {
    "name": "Homebound Financial",
    "website": "https://homeboundfinancial.com",
    "description": "Homebound Financial is a fintech company that provides mortgage and home financing solutions designed to simplify the home buying and refinancing process.",
    "funding": { "history": [], "total": "$50M", "last_round": { "amount": "$50M", "date": "2025-01-20" }, "valuation": null },
    "market": { "size": "$13.5T total U.S. mortgage market", "growth": "12-15% CAGR for digital mortgage segment" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "Homebound Financial Secures $50M Series B Funding", "date": "2025-01-20", "summary": "Homebound Financial announced a $50 million Series B funding round.", "impact": "major" },
      { "title": "Homebound Financial Launches AI-Powered Home Valuation Tool", "date": "2025-01-18", "summary": "The company introduced a new AI-based home valuation platform.", "impact": "product" }
    ],
    "analysis": { "opportunity_score": 8.2, "growth_trajectory": "Excellent growth trajectory in expanding digital mortgage market with fresh capital", "health_assessment": "Healthy - well-funded with strong product-market fit" },
    "growth_opportunities": [
      { "title": "Home Equity Line Expansion", "impact": "high", "identified_date": "2025-01-22" }
    ]
  },
  {
    "name": "ClaimTech",
    "website": "https://claimtech.io",
    "description": "ClaimTech is a technology company that provides AI-powered solutions for insurance claims processing and management.",
    "funding": { "history": [], "total": "$45M", "last_round": { "amount": "$45M", "date": "2025-01-28" }, "valuation": null },
    "market": { "size": "$15.8B by 2028 (global insurance claims management software market)", "growth": "14.2% CAGR (2023-2028)" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "ClaimTech Raises $45M Series B to Expand AI-Powered Insurance Claims Platform", "date": "2025-01-28", "summary": "ClaimTech announced a $45 million Series B funding round.", "impact": "major" },
      { "title": "ClaimTech Partners with Major Insurance Carrier", "date": "2025-01-22", "summary": "ClaimTech secured a multi-year partnership with a top-10 U.S. insurance carrier.", "impact": "major" }
    ],
    "analysis": { "opportunity_score": 8.5, "growth_trajectory": "Exceptional momentum with major enterprise wins and fresh funding", "health_assessment": "Healthy - strong market position with proven enterprise traction" },
    "growth_opportunities": [
      { "title": "International Expansion to EU", "impact": "high", "identified_date": "2025-01-27" },
      { "title": "Property Insurance Vertical", "impact": "high", "identified_date": "2025-01-24" }
    ]
  },
  {
    "name": "Clarity Diagnostics",
    "website": "https://claritydiagnostics.com",
    "description": "Clarity Diagnostics is a medical diagnostics company that develops and manufactures rapid point-of-care diagnostic tests.",
    "funding": { "history": [{ "round": "Seed", "amount": "$5M" }, { "round": "Series A", "amount": "$20M" }, { "round": "Series B", "amount": "$45M" }], "total": "$70M", "last_round": { "amount": "$45M", "date": "2025-01-28" }, "valuation": null },
    "market": { "size": "$45B by 2027 (global point-of-care diagnostics market)", "growth": "8.5% CAGR (2023-2027)" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "Clarity Diagnostics Secures $45M Series B Funding", "date": "2025-01-28", "summary": "The diagnostic technology company announced Series B funding.", "impact": "major" },
      { "title": "FDA Grants 510(k) Clearance for Clarity's Rapid Infectious Disease Panel", "date": "2025-01-22", "summary": "Clarity Diagnostics received FDA clearance for its multiplex PCR panel.", "impact": "major" }
    ],
    "analysis": { "opportunity_score": 8.7, "growth_trajectory": "Outstanding trajectory with FDA clearance and strong funding position", "health_assessment": "Healthy - well-capitalized with regulatory approval achieved" },
    "growth_opportunities": [
      { "title": "Hospital Network Expansion", "impact": "high", "identified_date": "2025-01-26" },
      { "title": "European CE Mark Commercialization", "impact": "high", "identified_date": "2025-01-23" }
    ]
  },
  {
    "name": "Studio",
    "website": "https://studio.design",
    "description": "Studio is a design tool that enables teams to create, prototype, and collaborate on web designs directly in the browser.",
    "funding": { "history": [{ "round": "Seed", "amount": "$3M", "date": "2018-05", "investors": ["Accel", "SV Angel"] }, { "round": "Series B", "amount": "$50M", "date": "2025-01-20" }], "total": "$53M", "last_round": { "amount": "$50M", "date": "2025-01-20" }, "valuation": null },
    "market": { "size": "$15.8B by 2027 (global web design software market)", "growth": "22.4% CAGR (2022-2027)" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "Studio Announces Series B Funding Round of $50M", "date": "2025-01-20", "summary": "Studio secures $50 million in Series B funding.", "impact": "major" },
      { "title": "Studio Launches Real-Time Collaboration Features", "date": "2025-01-18", "summary": "The company unveils enhanced real-time collaboration tools.", "impact": "product" }
    ],
    "analysis": { "opportunity_score": 7.9, "growth_trajectory": "Strong growth with differentiated browser-native approach", "health_assessment": "Healthy - Series B funded with clear product differentiation" },
    "growth_opportunities": [
      { "title": "AI-Powered Design Assistant", "impact": "high", "identified_date": "2025-01-21" }
    ]
  },
  {
    "name": "Stackwise",
    "website": "https://stackwise.io",
    "description": "Stackwise is a financial technology company that provides embedded banking and payment solutions for software platforms.",
    "funding": { "history": [{ "round": "Seed", "amount": "$3.7M", "date": "2021-06", "investors": ["Fika Ventures", "Bling Capital", "SV Angel"] }, { "round": "Series A", "amount": "$15M", "date": "2025-01-20" }], "total": "$18.7M", "last_round": { "amount": "$15M", "date": "2025-01-20" }, "valuation": null },
    "market": { "size": "$7.2B by 2027 for embedded finance market", "growth": "28-32% CAGR through 2027" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "Stackwise Raises $15M Series A", "date": "2025-01-20", "summary": "Stackwise announced a $15 million Series A funding round.", "impact": "major" },
      { "title": "Stackwise Launches Real-Time Inventory Analytics Dashboard", "date": "2025-01-18", "summary": "The company unveiled a new analytics dashboard.", "impact": "product" }
    ],
    "analysis": { "opportunity_score": 8.1, "growth_trajectory": "Excellent positioning in rapidly growing embedded finance market", "health_assessment": "Healthy - well-funded with strong tailwinds in BaaS space" },
    "growth_opportunities": [
      { "title": "Vertical SaaS Partnerships", "impact": "high", "identified_date": "2025-01-19" }
    ]
  },
  {
    "name": "Watershed Rx",
    "website": "https://watershedrx.com",
    "description": "Watershed Rx is a healthcare technology company that provides a platform for managing prior authorizations and benefit verification.",
    "funding": { "history": [{ "round": "Seed", "amount": "$5M", "date": "2020-09", "investors": ["Primavera Capital", "Healthcare angels"] }, { "round": "Series A", "amount": "$15M", "date": "2022-03", "investors": ["Andreessen Horowitz (a16z)", "Primavera Capital"] }], "total": "$20M", "last_round": { "amount": "$15M", "date": "2022-03" }, "valuation": null },
    "market": { "size": "$6.8B by 2028 (US prior authorization and prescription benefit management technology market)", "growth": "12-15% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [
      { "title": "Watershed Rx Secures $15M Series A Funding", "date": "2025-01-28", "summary": "The healthcare technology company announced a Series A funding round.", "impact": "major" },
      { "title": "Watershed Rx Partners with Regional Health System", "date": "2025-01-22", "summary": "Watershed Rx announced a strategic partnership with a multi-hospital health system.", "impact": "major" }
    ],
    "analysis": { "opportunity_score": 8.4, "growth_trajectory": "Very strong trajectory with a16z backing and healthcare partnerships", "health_assessment": "Healthy - strong backing and proven healthcare market traction" },
    "growth_opportunities": [
      { "title": "Pharma Hub Services Expansion", "impact": "high", "identified_date": "2025-01-25" }
    ]
  }
  ];

  // Calculate actionable stats
  const companiesNeedingCheckIn = companies.filter(c => {
    // Simulate "last contact" - companies with older news haven't been contacted recently
    const latestNews = c.news?.[0];
    if (!latestNews) return true;
    const daysAgo = Math.floor((new Date() - new Date(latestNews.date)) / (1000 * 60 * 60 * 24));
    return daysAgo > 30;
  }).length;

  const totalOpportunities = companies.reduce((acc, c) => 
    acc + (c.growth_opportunities?.length || 0), 0
  );

  const highPriorityOpportunities = companies.reduce((acc, c) => 
    acc + (c.growth_opportunities?.filter(o => o.impact === 'high').length || 0), 0
  );



  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
                Dashboard
              </h1>
              <p className="text-slate-500">
                Real-time AI analysis of {companies.length} portfolio companies
              </p>
            </div>
            <Link to={createPageUrl('Integrations')}>
              <Button className="gap-2 bg-slate-900 hover:bg-slate-800">
                <TrendingUp className="w-4 h-4" />
                Integrations
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to={createPageUrl('EarlyStage')} className="block">
            <StatsCard 
              title="Early Stage" 
              value={earlyStageCounts}
              subtitle="initial conversations"
              icon={Mail}
              color="blue"
            />
          </Link>
          <Link to={createPageUrl('DealStage')} className="block">
            <StatsCard 
              title="Deal Stage" 
              value={dealStageCounts}
              subtitle="in due diligence"
              icon={FileCheck}
              color="amber"
            />
          </Link>
          <Link to={createPageUrl('PortfolioList')} className="block">
            <StatsCard 
              title="Portfolio" 
              value={companies.length}
              subtitle="current investments"
              icon={Briefcase}
              color="emerald"
            />
          </Link>
          <Link to={createPageUrl('Alerts')} className="block">
            <StatsCard 
              title="Alerts" 
              value={unreadAlerts}
              subtitle="unread notifications"
              icon={Bell}
              color="violet"
            />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio Table */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Portfolio Overview</h2>
                  <p className="text-sm text-slate-500">Click any company to view full details</p>
                </div>
                <Link to={createPageUrl('PortfolioList')}>
                  <Button variant="ghost" size="sm" className="gap-1 text-slate-500 hover:text-slate-900">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <PortfolioTable companies={companies} compact alerts={alerts} />
            </motion.div>
          </div>

          {/* Alerts */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                    <Bell className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Recent Alerts</h2>
                    <p className="text-sm text-slate-500">News & updates</p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {alerts.map((alert, index) => (
                  <AlertCard key={index} alert={alert} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}