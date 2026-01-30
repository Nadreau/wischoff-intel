import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Bell, TrendingUp, AlertTriangle, Newspaper, Settings, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from 'date-fns';

const alertsData = [
  {
    id: 1,
    company: "Watershed Rx",
    type: "opportunity",
    category: "regulatory",
    title: "CMS Announces New Prior Authorization Rules",
    description: "New CMS mandate requires 72-hour PA response times via FHIR APIs starting Q3 2026. Watershed Rx's FHIR-native platform is positioned to benefit significantly.",
    impact: "Massive regulatory tailwind - forces payers to adopt modern PA technology. Accelerates market adoption timeline by 12-18 months.",
    date: "2026-01-22",
    priority: "high",
    read: false,
    stage: "portfolio"
  },
  {
    id: 2,
    company: "ClaimTech",
    type: "threat",
    category: "competitive",
    title: "Shift Technology Raises $100M Series D",
    description: "Major competitor Shift Technology raised $100M at $1B+ valuation to expand AI claims automation globally.",
    impact: "Increased competitive pressure and customer acquisition costs. May need to accelerate fundraising timeline.",
    date: "2026-01-21",
    priority: "high",
    read: false,
    stage: "portfolio"
  },
  {
    id: 3,
    company: "TalentGraph",
    type: "opportunity",
    category: "market",
    title: "Fortune 500 Enterprise Win",
    description: "TalentGraph closed deal with Fortune 100 tech company - $500K ACV, validates enterprise readiness.",
    impact: "Proves enterprise sales motion works. Can now confidently target larger deals with 3-5x ACV expansion.",
    date: "2026-01-20",
    priority: "high",
    read: false,
    stage: "portfolio"
  },
  {
    id: 4,
    company: "Studio",
    type: "threat",
    category: "competitive",
    title: "Figma Announces AI Design Features at Config",
    description: "Figma unveiled native AI design assistant and code generation at annual conference.",
    impact: "Major competitive threat. Studio needs to differentiate beyond AI or focus on specific niche where Figma is weak.",
    date: "2026-01-19",
    priority: "medium",
    read: true,
    stage: "portfolio"
  },
  {
    id: 5,
    company: "NeuralOps",
    type: "opportunity",
    category: "deal",
    title: "Term Sheet Ready for Final Approval",
    description: "Due diligence completed successfully. Term sheet drafted and ready for partner approval.",
    impact: "Deal on track to close within 2 weeks. Exceptional technical team and strong early traction.",
    date: "2026-01-18",
    priority: "high",
    read: false,
    stage: "deal"
  },
  {
    id: 6,
    company: "Homebound Financial",
    type: "threat",
    category: "market",
    title: "Mortgage Rates Hit 7.5% - Application Volume Down 30%",
    description: "Rising interest rates continue to pressure mortgage origination volumes across the industry.",
    impact: "Headwind for growth. Monitor burn rate carefully. B2B2C partnership strategy provides some insulation.",
    date: "2026-01-17",
    priority: "medium",
    read: true,
    stage: "portfolio"
  },
  {
    id: 7,
    company: "VectorAI",
    type: "opportunity",
    category: "founder",
    title: "Meeting Scheduled with Founder",
    description: "First meeting set for Jan 25. Strong technical background (ex-Google) building vector DB optimization.",
    impact: "Promising early-stage opportunity in hot AI infrastructure space. 3 design partners already engaged.",
    date: "2026-01-16",
    priority: "medium",
    read: false,
    stage: "early"
  },
  {
    id: 8,
    company: "Clarity Diagnostics",
    type: "opportunity",
    category: "regulatory",
    title: "CE Mark Approved for European Market",
    description: "CE marking secured, enabling commercial launch in EU market Q2 2026.",
    impact: "Opens $4B+ European POC diagnostics market. Hospital networks eager for solutions post-pandemic.",
    date: "2026-01-15",
    priority: "high",
    read: true,
    stage: "portfolio"
  }
];

export default function Alerts() {
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [showRead, setShowRead] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await base44.entities.Alert.list('-date');
        setAlertsData(data);
        
        // Check URL for company filter
        const urlParams = new URLSearchParams(window.location.search);
        const companyParam = urlParams.get('company');
        if (companyParam) {
          setCompanyFilter(companyParam);
        }
      } catch (error) {
        console.error('Error loading alerts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredAlerts = alertsData.filter(alert => {
    if (typeFilter !== 'all' && alert.type !== typeFilter) return false;
    if (stageFilter !== 'all' && alert.company_stage !== stageFilter) return false;
    if (priorityFilter !== 'all' && alert.priority !== priorityFilter) return false;
    if (companyFilter !== 'all' && alert.company_name !== companyFilter) return false;
    if (!showRead && alert.read) return false;
    return true;
  });

  // Get unique company names for filter dropdown
  const uniqueCompanies = [...new Set(alertsData.map(a => a.company_name))].sort();

  const unreadCount = alertsData.filter(a => !a.read).length;

  const getTypeIcon = (type) => {
    return type === 'opportunity' ? TrendingUp : AlertTriangle;
  };

  const getTypeColor = (type) => {
    return type === 'opportunity' 
      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
      : 'bg-red-50 border-red-200 text-red-700';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (priority === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-100 border border-violet-200">
                <Bell className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Alerts & Notifications</h1>
                <p className="text-slate-500">{unreadCount} unread alerts • {filteredAlerts.length} total shown</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Filter Alerts</h3>
            </div>
            
            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-2 block">Company</label>
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {uniqueCompanies.map(company => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-2 block">Alert Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="opportunity">Opportunities Only</SelectItem>
                    <SelectItem value="threat">Threats Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-2 block">Company Stage</label>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="portfolio">Portfolio Only</SelectItem>
                    <SelectItem value="deal">Deal Stage</SelectItem>
                    <SelectItem value="early">Early Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-2 block">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-2 block">Show Read</label>
                <div className="flex items-center gap-2 h-10">
                  <Switch checked={showRead} onCheckedChange={setShowRead} />
                  <span className="text-sm text-slate-600">{showRead ? 'Shown' : 'Hidden'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, i) => {
            const TypeIcon = getTypeIcon(alert.type);
            return (
              <Link key={alert.id} to={createPageUrl(`NewsDetail?id=${alert.id}`)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all cursor-pointer ${
                    alert.read ? 'border-slate-200 opacity-75' : 'border-violet-200 bg-violet-50/30'
                  }`}
                >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${getTypeColor(alert.type)}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link 
                          to={createPageUrl(`CompanyDetail?company=${encodeURIComponent(alert.company_name)}`)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          {alert.company_name}
                        </Link>
                        <h3 className="text-lg font-semibold text-slate-900 mt-0.5">{alert.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {!alert.read && (
                          <div className="w-2 h-2 rounded-full bg-violet-600" />
                        )}
                        <Badge className={`${getPriorityColor(alert.priority)} text-xs`}>
                          {alert.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={`text-xs ${getTypeColor(alert.type)}`}>
                        {alert.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{format(new Date(alert.date), 'MMM d, yyyy')}</span>
                    </div>

                    <p className="text-slate-700 mb-3">{alert.description}</p>

                    <div className={`p-3 rounded-lg border ${
                      alert.type === 'opportunity' 
                        ? 'bg-emerald-50 border-emerald-100' 
                        : 'bg-red-50 border-red-100'
                    }`}>
                      <p className={`text-xs font-semibold mb-1 ${
                        alert.type === 'opportunity' ? 'text-emerald-900' : 'text-red-900'
                      }`}>
                        IMPACT:
                      </p>
                      <p className={`text-sm ${
                        alert.type === 'opportunity' ? 'text-emerald-800' : 'text-red-800'
                      }`}>{alert.impact}</p>
                    </div>

                    {alert.action_items?.length > 0 && (
                      <div className="p-3 rounded-lg border border-blue-100 bg-blue-50 mt-3">
                        <p className="text-xs font-semibold text-blue-900 mb-2">ACTION ITEMS:</p>
                        <ul className="space-y-1">
                          {alert.action_items.map((item, idx) => (
                            <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              </Link>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No alerts match your filters</h3>
            <p className="text-slate-600">Try adjusting your filter settings</p>
          </div>
        )}
      </div>
    </div>
  );
}