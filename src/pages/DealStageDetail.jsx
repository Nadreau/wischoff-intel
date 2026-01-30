import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, DollarSign, TrendingUp, Users, AlertTriangle, Sparkles, Loader2, FileText, Target, Mail, Phone, Video, MessageSquare, User, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';

export default function DealStageDetail() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadCompany = async () => {
      const params = new URLSearchParams(window.location.search);
      const companyName = params.get('company');
      if (companyName) {
        try {
          const { base44 } = await import('@/api/base44Client');
          const companies = await base44.entities.DealStageCompany.filter({ name: companyName });
          if (companies.length > 0) {
            setCompany(companies[0]);
          }
        } catch (error) {
          console.error('Error loading company:', error);
        }
      }
      setLoading(false);
    };
    loadCompany();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Company not found</h2>
          <Link to={createPageUrl('DealStage')} className="text-blue-600 hover:text-blue-700">
            Return to Deal Stage
          </Link>
        </div>
      </div>
    );
  }

  const dd = company.due_diligence || {};

  const getStageColor = (stage) => {
    const colors = {
      initial_meeting: 'bg-blue-100 text-blue-700',
      due_diligence: 'bg-amber-100 text-amber-700',
      term_sheet: 'bg-purple-100 text-purple-700',
      negotiation: 'bg-orange-100 text-orange-700',
      closing: 'bg-emerald-100 text-emerald-700',
      passed: 'bg-red-100 text-red-700'
    };
    return colors[stage] || 'bg-slate-100 text-slate-700';
  };

  const getTouchpointIcon = (type) => {
    switch(type) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'meeting': return Video;
      default: return MessageSquare;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link 
            to={createPageUrl('DealStage')} 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Deal Stage
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 p-8 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{company.name}</h1>
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {company.website}
              </a>
            </div>
            <Badge className={`${getStageColor(company.deal_stage)} text-xs font-medium px-3 py-1`}>
              {company.deal_stage?.replace(/_/g, ' ')}
            </Badge>
          </div>

          <p className="text-slate-600 mb-6">{company.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Deal Size</p>
                <p className="font-medium text-slate-900">{company.deal_size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Valuation</p>
                <p className="font-medium text-slate-900">{company.valuation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Founder</p>
                <p className="font-medium text-slate-900">{company.founder_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Market</p>
                <p className="font-medium text-slate-900">{typeof company.market === 'object' ? company.market.size : company.market}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diligence">Deep Due Diligence</TabsTrigger>
            <TabsTrigger value="touchpoints">Touchpoints</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Team Assessment</h3>
                  <p className="text-slate-700 leading-relaxed">{company.team_assessment}</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Product Assessment</h3>
                  <p className="text-slate-700 leading-relaxed">{company.product_assessment}</p>
                </div>
              </div>

              {/* Market Info */}
              {typeof company.market === 'object' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Market</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                      <p className="text-xs font-medium text-violet-600 mb-1">Market Size</p>
                      <p className="text-lg font-semibold text-slate-900">{company.market.size}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <p className="text-xs font-medium text-emerald-600 mb-1">Growth Rate</p>
                      <p className="text-lg font-semibold text-slate-900">{company.market.growth}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Key Concerns</h3>
                  <ul className="space-y-2">
                    {company.concerns?.map((concern, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Internal Champions</h3>
                  <div className="space-y-2">
                    {company.champions?.map((champion, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {champion.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-slate-700">{champion}</span>
                      </div>
                    ))}
                    {(!company.champions || company.champions.length === 0) && (
                      <p className="text-sm text-slate-500">No internal champions assigned yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Team Deep Dive */}
              {company.team_deep_dive && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-slate-900">Team Deep Dive</h3>
                  </div>
                  <div className="prose prose-slate prose-sm max-w-none">
                    {company.team_deep_dive.split('\n\n').map((para, i) => (
                      <p key={i} className="text-slate-700 leading-relaxed mb-4">{para}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Next Steps</h3>
                <p className="text-slate-700">{company.next_steps}</p>
                <p className="text-xs text-slate-500 mt-3">
                  Last meeting: {company.last_meeting_date ? format(new Date(company.last_meeting_date), 'MMM d, yyyy') : 'N/A'} • {company.meeting_count} meetings total
                </p>
              </div>
            </div>
          </TabsContent>

          {/* DEEP DUE DILIGENCE */}
          <TabsContent value="diligence">
            <div className="space-y-6">
              {/* Recommendation */}
              {dd.recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200 p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Recommendation</h3>
                  <Badge className={`mb-3 ${
                    dd.recommendation === 'approve_for_ic' ? 'bg-emerald-100 text-emerald-700' :
                    dd.recommendation === 'request_more_info' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {dd.recommendation.replace(/_/g, ' ')}
                  </Badge>
                  <p className="text-slate-700 whitespace-pre-line">{dd.recommendation_reasoning}</p>
                </motion.div>
              )}

              {/* Investment Thesis */}
              {dd.investment_thesis && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Investment Thesis</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">{dd.investment_thesis}</p>
                </motion.div>
              )}

              {/* Market Analysis */}
              {dd.market_analysis && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Market Analysis</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">{dd.market_analysis}</p>
                </motion.div>
              )}

              {/* Competitive Intelligence */}
              {dd.competitive_intelligence?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Competitive Intelligence</h3>
                  <div className="space-y-3">
                    {dd.competitive_intelligence.map((comp, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-lg">
                        <p className="font-medium text-slate-900 mb-1">{comp.name}</p>
                        <p className="text-sm text-slate-600 mb-2">{comp.positioning}</p>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="font-medium text-emerald-700 mb-1">Advantages:</p>
                            <p className="text-slate-600">{comp.advantages}</p>
                          </div>
                          <div>
                            <p className="font-medium text-red-700 mb-1">Weaknesses:</p>
                            <p className="text-slate-600">{comp.weaknesses}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tech + Regulatory */}
              <div className="grid md:grid-cols-2 gap-6">
                {dd.technology_assessment && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Technology Assessment</h3>
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{dd.technology_assessment}</p>
                  </motion.div>
                )}

                {dd.regulatory_landscape && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Regulatory Landscape</h3>
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{dd.regulatory_landscape}</p>
                  </motion.div>
                )}
              </div>

              {/* GTM + Financials */}
              {dd.go_to_market_strategy && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Go-to-Market Strategy</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">{dd.go_to_market_strategy}</p>
                </motion.div>
              )}

              {dd.financial_projections_review && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Financial Review</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">{dd.financial_projections_review}</p>
                </motion.div>
              )}

              {/* Risk Matrix */}
              {dd.risk_matrix?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Risk Matrix</h3>
                  <div className="space-y-3">
                    {dd.risk_matrix.map((risk, i) => (
                      <div key={i} className={`p-4 rounded-lg border ${
                        risk.severity === 'critical' ? 'bg-red-50 border-red-200' :
                        risk.severity === 'high' ? 'bg-amber-50 border-amber-200' :
                        'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-slate-900">{risk.risk}</p>
                          <Badge className={`text-[10px] ${
                            risk.severity === 'critical' ? 'bg-red-100 text-red-700' :
                            risk.severity === 'high' ? 'bg-amber-100 text-amber-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {risk.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700">
                          <span className="font-medium">Mitigation:</span> {risk.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Key Concerns + Reference Questions */}
              {dd.key_concerns?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Key Concerns for IC</h3>
                  <ul className="space-y-2">
                    {dd.key_concerns.map((concern, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="font-medium text-slate-900">{i + 1}.</span>
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {dd.reference_questions?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Reference Check Questions</h3>
                  <ol className="space-y-2">
                    {dd.reference_questions.map((q, i) => (
                      <li key={i} className="text-sm text-slate-700">
                        <span className="font-medium">Q{i + 1}:</span> {q}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* TOUCHPOINTS */}
          <TabsContent value="touchpoints">
            <div className="space-y-4">
              {company.touchpoints?.length > 0 ? (
                company.touchpoints.map((tp, i) => {
                  const Icon = getTouchpointIcon(tp.type);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-slate-200 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                          tp.type === 'email' ? 'bg-blue-50 border border-blue-100' :
                          tp.type === 'call' ? 'bg-emerald-50 border border-emerald-100' :
                          'bg-violet-50 border border-violet-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            tp.type === 'email' ? 'text-blue-600' :
                            tp.type === 'call' ? 'text-emerald-600' :
                            'text-violet-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline" className="text-xs capitalize">{tp.type}</Badge>
                            <span className="text-xs text-slate-500">{format(new Date(tp.date), 'MMM d, yyyy')}</span>
                          </div>
                          <p className="text-sm text-slate-700 mt-2 leading-relaxed">{tp.summary}</p>
                          {tp.participants?.length > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <p className="text-xs text-slate-500">{tp.participants.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Touchpoints Yet</h3>
                  <p className="text-slate-600">Meeting history and communications will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
