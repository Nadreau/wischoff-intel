import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Mail, Inbox, UserPlus, Filter, Settings, Loader2 } from 'lucide-react';
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

// Sample early stage companies from email/LinkedIn tracking
const earlyStageData = [
  {
    name: "VectorAI",
    contact_name: "Sarah Chen",
    contact_email: "sarah@vectorai.io",
    website: "https://vectorai.io",
    description: "AI-powered vector database optimization for enterprise applications",
    contact_source: "inbound",
    stage: "meeting_scheduled",
    last_contact_date: "2025-01-29",
    email_thread_count: 4,
    market: "AI Infrastructure",
    ai_summary: "Founder reached out via warm intro from portfolio company. Strong technical background (ex-Google). Building vector DB optimization layer. Early traction with 3 design partners."
  },
  {
    name: "HealthFlow",
    contact_name: "Michael Rodriguez",
    contact_email: "michael@healthflow.ai",
    website: "https://healthflow.ai",
    description: "Patient engagement platform for specialty clinics",
    contact_source: "referral",
    stage: "follow_up",
    last_contact_date: "2025-01-27",
    email_thread_count: 2,
    market: "Healthcare Tech",
    ai_summary: "Referred by Dr. Lisa Park (advisor). Building patient engagement for specialty practices. Pre-revenue but strong clinical advisor network. Seeking seed funding."
  },
  {
    name: "GreenLoop",
    contact_name: "Emily Watson",
    contact_email: "emily@greenloop.co",
    website: "https://greenloop.co",
    description: "Carbon accounting software for mid-market companies",
    contact_source: "event",
    stage: "responded",
    last_contact_date: "2025-01-26",
    email_thread_count: 1,
    market: "Climate Tech",
    ai_summary: "Met at Climate Tech Summit. Building carbon accounting for mid-market. $500K in LOIs. Strong sustainability compliance angle. First-time founder."
  },
  {
    name: "DevInsight",
    contact_name: "Alex Kim",
    contact_email: "alex@devinsight.dev",
    website: "https://devinsight.dev",
    description: "Analytics platform for developer productivity",
    contact_source: "outbound",
    stage: "new",
    last_contact_date: "2025-01-28",
    email_thread_count: 0,
    market: "Developer Tools",
    ai_summary: "Sourced via AngelList. Second-time founder (previous exit to GitHub). Building developer analytics with privacy-first approach. Bootstrapped so far."
  },
  {
    name: "TalentMatch",
    contact_name: "Jennifer Lee",
    contact_email: "jen@talentmatch.io",
    website: "https://talentmatch.io",
    description: "AI recruiting assistant for SMBs",
    contact_source: "linkedin",
    stage: "responded",
    last_contact_date: "2025-01-25",
    email_thread_count: 3,
    market: "HR Tech",
    ai_summary: "Connected via LinkedIn. Building recruiting automation for SMBs. 50 beta customers, $10K MRR. Adjacent to our TalentGraph investment - potential synergy."
  },
  {
    name: "FinOps Pro",
    contact_name: "David Park",
    contact_email: "david@finopspro.com",
    website: "https://finopspro.com",
    description: "Cloud cost optimization for startups",
    contact_source: "referral",
    stage: "follow_up",
    last_contact_date: "2025-01-24",
    email_thread_count: 2,
    market: "Cloud Infrastructure",
    ai_summary: "Warm intro from AWS partner. Building FinOps for startups. Already saved customers $2M+ collectively. Strong technical founder (ex-AWS)."
  }
];

export default function EarlyStage() {
  const [earlyStageData, setEarlyStageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await base44.entities.EarlyStageCompany.list();
        setEarlyStageData(data);
      } catch (error) {
        console.error('Error loading early stage companies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredCompanies = earlyStageData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || company.stage === stageFilter;
    const matchesSource = sourceFilter === 'all' || company.contact_source === sourceFilter;
    return matchesSearch && matchesStage && matchesSource;
  });

  const getStageColor = (stage) => {
    switch (stage) {
      case 'new': return 'bg-slate-100 text-slate-700';
      case 'responded': return 'bg-blue-100 text-blue-700';
      case 'follow_up': return 'bg-amber-100 text-amber-700';
      case 'meeting_scheduled': return 'bg-emerald-100 text-emerald-700';
      case 'passed': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'inbound': return '📩';
      case 'referral': return '🤝';
      case 'outbound': return '📤';
      case 'event': return '🎤';
      case 'linkedin': return '💼';
      default: return '✉️';
    }
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
              <div className="p-2 rounded-xl bg-blue-100 border border-blue-200">
                <Inbox className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Early Stage Pipeline</h1>
                <p className="text-slate-500">Initial conversations and outreach - {filteredCompanies.length} companies</p>
              </div>
            </div>
            <Button className="gap-2" onClick={() => setShowDemoModal(true)}>
              <Settings className="w-4 h-4" />
              Connect Gmail/Outlook
            </Button>
          </div>

          {/* Integration Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-500">Connect Gmail or Outlook to auto-track founder communications</p>
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
            <div className="flex gap-3">
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="follow_up">Follow Up</SelectItem>
                  <SelectItem value="meeting_scheduled">Meeting Scheduled</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Company Cards */}
        <div className="grid gap-4">
          {filteredCompanies.map((company, index) => (
            <Link key={company.name} to={createPageUrl(`EarlyStageDetail?company=${encodeURIComponent(company.name)}`)}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer"
              >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center text-lg font-semibold text-slate-600">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
                      <span className="text-xl">{getSourceIcon(company.contact_source)}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{company.description}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-500">
                        <UserPlus className="w-4 h-4 inline mr-1" />
                        {company.contact_name}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{company.market}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{company.email_thread_count} emails</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStageColor(company.stage)}>
                  {company.stage.replace('_', ' ')}
                </Badge>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm font-medium text-slate-700 mb-1">AI Summary:</p>
                <p className="text-sm text-slate-600 leading-relaxed">{company.ai_summary}</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <DemoModal
        open={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        featureName="email integration"
        features={['Email threads', 'Response tracking', 'Auto-update profiles', 'Communication frequency']}
      />
    </div>
  );
}