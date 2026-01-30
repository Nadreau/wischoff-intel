import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Search, Filter, ArrowLeft, SortDesc, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PortfolioTable from '@/components/dashboard/PortfolioTable';

// Full portfolio data
const portfolioData = [
  {
    "name": "TalentGraph",
    "website": "https://talentgraph.ai",
    "description": "TalentGraph is an AI-powered talent intelligence and recruiting platform.",
    "funding": { "total": null },
    "market": { "size": "$3.85B by 2025, global talent intelligence and recruitment software market", "growth": "14.3% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "TalentGraph Raises $15M Series A", "date": "2025-01-28", "summary": "Series A funding round." }],
    "analysis": { "opportunity_score": 6.2, "health_assessment": "Concerning - no funding" }
  },
  {
    "name": "Homebound Financial",
    "website": "https://homeboundfinancial.com",
    "description": "Homebound Financial provides mortgage and home financing solutions.",
    "funding": { "total": null },
    "market": { "size": "$13.5T total U.S. mortgage market", "growth": "12-15% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "Homebound Financial Secures $50M Series B", "date": "2025-01-20", "summary": "Series B funding." }],
    "analysis": { "opportunity_score": 6.5, "health_assessment": "Concerning - no funding" }
  },
  {
    "name": "ClaimTech",
    "website": "https://claimtech.io",
    "description": "ClaimTech provides AI-powered insurance claims processing solutions.",
    "funding": { "total": null },
    "market": { "size": "$15.8B by 2028 (global insurance claims management)", "growth": "14.2% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "ClaimTech Raises $45M Series B", "date": "2025-01-28", "summary": "Series B funding." }],
    "analysis": { "opportunity_score": 6.5, "health_assessment": "Cautious - limited funding" }
  },
  {
    "name": "Clarity Diagnostics",
    "website": "https://claritydiagnostics.com",
    "description": "Clarity Diagnostics develops rapid point-of-care diagnostic tests.",
    "funding": { "total": null },
    "market": { "size": "$45B by 2027 (global POC diagnostics)", "growth": "8.5% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "Clarity Diagnostics Secures $45M Series B", "date": "2025-01-28", "summary": "Series B funding." }],
    "analysis": { "opportunity_score": 6.5, "health_assessment": "Cautious - limited funding" }
  },
  {
    "name": "Studio",
    "website": "https://studio.design",
    "description": "Studio enables teams to create and collaborate on web designs.",
    "funding": { "total": "$3M" },
    "market": { "size": "$15.8B by 2027 (global web design software)", "growth": "22.4% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "Studio Announces $50M Series B", "date": "2025-01-20", "summary": "Series B funding." }],
    "analysis": { "opportunity_score": 6.2, "health_assessment": "Cautious - underfunded" }
  },
  {
    "name": "Stackwise",
    "website": "https://stackwise.io",
    "description": "Stackwise provides embedded banking and payment solutions.",
    "funding": { "total": "$3.7M" },
    "market": { "size": "$7.2B by 2027 (embedded finance)", "growth": "28-32% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "Stackwise Raises $15M Series A", "date": "2025-01-20", "summary": "Series A funding." }],
    "analysis": { "opportunity_score": 6.8, "health_assessment": "Moderate - underfunded" }
  },
  {
    "name": "Watershed Rx",
    "website": "https://watershedrx.com",
    "description": "Watershed Rx provides prior authorization and benefit verification.",
    "funding": { "total": "$20M" },
    "market": { "size": "$6.8B by 2028 (prior authorization tech)", "growth": "12-15% CAGR" },
    "competitors": [{}, {}, {}, {}, {}, {}, {}],
    "news": [{ "title": "Watershed Rx Secures $15M Series A", "date": "2025-01-28", "summary": "Series A funding." }],
    "analysis": { "opportunity_score": 7.2, "health_assessment": "Healthy - adequate funding" }
  }
];

export default function PortfolioList() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [healthFilter, setHealthFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companies, allAlerts] = await Promise.all([
          base44.entities.PortfolioCompany.list(),
          base44.entities.Alert.list('-date')
        ]);
        setPortfolioData(companies);
        setAlerts(allAlerts);
      } catch (error) {
        console.error('Error loading portfolio companies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getHealthStatus = (health) => {
    const lower = health?.toLowerCase() || '';
    if (lower.includes('healthy') || lower.includes('strong')) return 'healthy';
    if (lower.includes('cautious') || lower.includes('moderate') || lower.includes('concerning')) return 'caution';
    return 'risk';
  };

  const filteredCompanies = portfolioData
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHealth = healthFilter === 'all' || getHealthStatus(company.analysis?.health_assessment) === healthFilter;
      const matchesScore = scoreFilter === 'all' || 
                          (scoreFilter === 'high' && company.analysis?.opportunity_score >= 7) ||
                          (scoreFilter === 'medium' && company.analysis?.opportunity_score >= 6 && company.analysis?.opportunity_score < 7) ||
                          (scoreFilter === 'low' && company.analysis?.opportunity_score < 6);
      return matchesSearch && matchesHealth && matchesScore;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return (b.analysis?.opportunity_score || 0) - (a.analysis?.opportunity_score || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

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
          <Link 
            to={createPageUrl('Dashboard')} 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portfolio Companies</h1>
          <p className="text-slate-500 mt-1">Complete list of all {portfolioData.length} portfolio companies</p>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search companies, markets, competitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={healthFilter} onValueChange={setHealthFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Health Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="caution">Caution</SelectItem>
                  <SelectItem value="risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Score Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (7+)</SelectItem>
                  <SelectItem value="medium">Medium (6-7)</SelectItem>
                  <SelectItem value="low">Low (&lt;6)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SortDesc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">By Score</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {filteredCompanies.length} of {portfolioData.length} companies
            </p>
          </div>
          <PortfolioTable companies={filteredCompanies} alerts={alerts} />
        </motion.div>
      </div>
    </div>
  );
}