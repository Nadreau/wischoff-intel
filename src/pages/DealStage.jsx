import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Handshake, FileText, TrendingUp, AlertCircle, Users, Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DemoModal from '@/components/DemoModal';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Sample deal stage companies
const dealStageData = [
  {
    name: "NeuralOps",
    founder_name: "James Martinez",
    founder_email: "james@neuralops.ai",
    website: "https://neuralops.ai",
    description: "MLOps platform for enterprise AI teams - automated model deployment, monitoring, and governance",
    deal_stage: "term_sheet",
    deal_size: "$5M Series A",
    valuation: "$25M pre-money",
    market: { size: "$4B MLOps market by 2027", growth: "40% CAGR" },
    team_assessment: "Exceptional technical team - 3 ex-Google ML engineers. CEO has strong enterprise sales experience from Databricks.",
    product_assessment: "Production-ready platform with 8 paying customers including 2 Fortune 500s. Strong technical moat in model governance.",
    meeting_count: 5,
    last_meeting_date: "2025-01-27",
    next_steps: "Final partner meeting scheduled for Feb 2. Term sheet ready pending approval.",
    opportunity_score: 8.9,
    concerns: [
      "Competitive landscape includes Databricks and AWS SageMaker",
      "Enterprise sales cycle averaging 6-9 months"
    ],
    champions: ["Sarah (Partner)", "Mike (Advisor)"]
  },
  {
    name: "RetailSync",
    founder_name: "Amanda Chen",
    founder_email: "amanda@retailsync.io",
    website: "https://retailsync.io",
    description: "Inventory management system for multi-location retailers with real-time synchronization",
    deal_stage: "due_diligence",
    deal_size: "$3M Seed",
    valuation: "$12M pre-money",
    market: { size: "$2.3B retail inventory software market", growth: "12% CAGR" },
    team_assessment: "Strong operator CEO with 10 years retail experience. Technical co-founder from Shopify. Some concerns about go-to-market leadership.",
    product_assessment: "Solid MVP with 15 customers, $40K MRR. Good retention (95%). Product still needs work on scalability.",
    meeting_count: 3,
    last_meeting_date: "2025-01-25",
    next_steps: "Customer reference calls this week. Technical due diligence with CTO scheduled.",
    opportunity_score: 7.4,
    concerns: [
      "Need to hire VP of Sales - GTM execution risk",
      "Platform scalability needs investment",
      "Unit economics unclear at current pricing"
    ],
    champions: ["David (Associate)"]
  },
  {
    name: "SecureAuth",
    founder_name: "Robert Kim",
    founder_email: "robert@secureauth.dev",
    website: "https://secureauth.dev",
    description: "Passwordless authentication platform for B2B SaaS companies",
    deal_stage: "negotiation",
    deal_size: "$2.5M Seed",
    valuation: "$10M pre-money",
    market: { size: "$3.7B identity and access management", growth: "15% CAGR" },
    team_assessment: "Technical founder with strong security background (ex-Okta). Solo founder is a concern - needs to build out team.",
    product_assessment: "Innovative biometric approach with strong security. 20 beta customers, converting to paid. SOC 2 in progress.",
    meeting_count: 4,
    last_meeting_date: "2025-01-29",
    next_steps: "Negotiating valuation. Waiting on updated financial projections. Decision by Feb 5.",
    opportunity_score: 7.1,
    concerns: [
      "Solo founder - needs co-founder or strong exec team",
      "Crowded market with Okta, Auth0, etc.",
      "Longer sales cycles than projected"
    ],
    champions: ["Sarah (Partner)"]
  },
  {
    name: "DataBridge",
    founder_name: "Lisa Wang",
    founder_email: "lisa@databridge.io",
    website: "https://databridge.io",
    description: "No-code data integration platform for non-technical teams",
    deal_stage: "initial_meeting",
    deal_size: "$4M Series A",
    valuation: "$20M pre-money",
    market: { size: "$5.2B data integration market", growth: "22% CAGR" },
    team_assessment: "Experienced founder (2nd startup, first was acquired). Strong technical and business balance. Building out sales team.",
    product_assessment: "Good product traction - 50+ customers, $80K MRR, growing 20% MoM. Competing with Zapier and Make.",
    meeting_count: 1,
    last_meeting_date: "2025-01-23",
    next_steps: "Second meeting with full team scheduled for Feb 1. Need to see detailed metrics and roadmap.",
    opportunity_score: 7.8,
    concerns: [
      "Zapier is 800lb gorilla in the space",
      "Monetization strategy needs clarity"
    ],
    champions: []
  }
];

export default function DealStage() {
  const [dealStageData, setDealStageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await base44.entities.DealStageCompany.list();
        setDealStageData(data);
      } catch (error) {
        console.error('Error loading deal stage companies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredCompanies = dealStageData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.founder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || company.deal_stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageInfo = (stage) => {
    const stages = {
      initial_meeting: { label: 'Initial Meeting', progress: 20, color: 'bg-blue-500' },
      due_diligence: { label: 'Due Diligence', progress: 40, color: 'bg-amber-500' },
      term_sheet: { label: 'Term Sheet', progress: 70, color: 'bg-emerald-500' },
      negotiation: { label: 'Negotiation', progress: 85, color: 'bg-violet-500' },
      closing: { label: 'Closing', progress: 95, color: 'bg-emerald-600' },
      passed: { label: 'Passed', progress: 0, color: 'bg-red-500' }
    };
    return stages[stage] || stages.initial_meeting;
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 7) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-200">
                <Handshake className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Active Deals</h1>
                <p className="text-slate-500">Companies in active due diligence - {filteredCompanies.length} deals</p>
              </div>
            </div>
            <Button className="gap-2" onClick={() => setShowDemoModal(true)}>
              <Settings className="w-4 h-4" />
              Connect CRM
            </Button>
          </div>

          {/* Integration Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-500">Connect HubSpot or Salesforce to auto-sync deal stages and notes</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 text-xs" onClick={() => setShowDemoModal(true)}>
                  Set Up
                </Button>
                <button className="text-slate-400 hover:text-slate-600 text-xs px-1">✕</button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search companies, founders, markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Deal Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="initial_meeting">Initial Meeting</SelectItem>
                <SelectItem value="due_diligence">Due Diligence</SelectItem>
                <SelectItem value="term_sheet">Term Sheet</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closing">Closing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Deal Cards */}
        <div className="grid gap-6">
          {filteredCompanies.map((company, index) => {
            const stageInfo = getStageInfo(company.deal_stage);
            return (
              <Link key={company.name} to={createPageUrl(`DealStageDetail?company=${encodeURIComponent(company.name)}`)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center text-xl font-semibold text-slate-600">
                        {company.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">{company.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{company.description}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span>{company.founder_name}</span>
                          <span className="text-slate-300">•</span>
                          <span>{company.deal_size}</span>
                          <span className="text-slate-300">•</span>
                          <span>{company.valuation}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`px-3 py-1 ${stageInfo.color} text-white border-0`}>
                      {stageInfo.label}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{stageInfo.label}</span>
                      <span className="text-sm text-slate-500">{stageInfo.progress}% complete</span>
                    </div>
                    <Progress value={stageInfo.progress} className="h-2" />
                  </div>

                  {/* Assessment Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Team Assessment</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{company.team_assessment}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product Assessment</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{company.product_assessment}</p>
                    </div>
                  </div>

                  {/* Concerns */}
                  {company.concerns?.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-slate-700">Key Concerns</span>
                      </div>
                      <div className="space-y-2">
                        {company.concerns.map((concern, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{concern}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Next Steps</p>
                      <p className="text-sm font-medium text-slate-900">{company.next_steps}</p>
                    </div>
                    {company.champions?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <div className="text-sm text-slate-600">
                          {company.champions.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
      <DemoModal
        open={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        featureName="CRM integration"
        features={['Deal sync', 'Meeting history', 'Email tracking', 'Contact notes']}
      />
    </div>
  );
}