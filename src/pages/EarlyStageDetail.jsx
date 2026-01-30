import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mail, Calendar, User, Building2, Sparkles, Loader2, FileText, MessageSquare, TrendingUp, Target, CheckCircle2, AlertTriangle, Phone, Video, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';

export default function EarlyStageDetail() {
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
          const companies = await base44.entities.EarlyStageCompany.filter({ name: companyName });
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
          <Link to={createPageUrl('EarlyStage')} className="text-blue-600 hover:text-blue-700">
            Return to Early Stage
          </Link>
        </div>
      </div>
    );
  }

  const getStageColor = (stage) => {
    const colors = {
      new: 'bg-slate-100 text-slate-700',
      responded: 'bg-blue-100 text-blue-700',
      follow_up: 'bg-amber-100 text-amber-700',
      meeting_scheduled: 'bg-emerald-100 text-emerald-700',
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link 
            to={createPageUrl('EarlyStage')} 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Early Stage
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
            <Badge className={`${getStageColor(company.stage)} text-xs font-medium px-3 py-1`}>
              {company.stage?.replace(/_/g, ' ')}
            </Badge>
          </div>

          <p className="text-slate-600 mb-6">{company.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Contact</p>
                <p className="font-medium text-slate-900">{company.contact_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Emails</p>
                <p className="font-medium text-slate-900">{company.email_thread_count} threads</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Last Contact</p>
                <p className="font-medium text-slate-900">
                  {company.last_contact_date ? format(new Date(company.last_contact_date), 'MMM d, yyyy') : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-slate-500 text-xs">Market</p>
                <p className="font-medium text-slate-900">{company.market}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diligence">Due Diligence</TabsTrigger>
            <TabsTrigger value="communication">Touchpoints</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* AI Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">AI Summary</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{company.ai_summary}</p>
              </motion.div>

              {/* Market & Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-violet-600" />
                    <h3 className="font-semibold text-slate-900">Market Opportunity</h3>
                  </div>
                  <div className="space-y-4">
                    {company.market_size && (
                      <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                        <p className="text-xs font-medium text-violet-600 mb-1">Market Size</p>
                        <p className="text-lg font-semibold text-slate-900">{company.market_size}</p>
                      </div>
                    )}
                    {company.market_growth && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                        <p className="text-xs font-medium text-emerald-600 mb-1">Growth Rate</p>
                        <p className="text-lg font-semibold text-slate-900">{company.market_growth}</p>
                      </div>
                    )}
                  </div>
                  {company.market_assessment && (
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed">{company.market_assessment}</p>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-slate-900">Team</h3>
                  </div>
                  {company.team_background?.length > 0 ? (
                    <ul className="space-y-3">
                      {company.team_background.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">Team details not yet available.</p>
                  )}
                </div>
              </motion.div>

              {/* Green/Red Flags */}
              {(company.green_flags?.length > 0 || company.red_flags?.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {company.green_flags?.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-semibold text-slate-900">Green Flags</h3>
                      </div>
                      <ul className="space-y-2">
                        {company.green_flags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-emerald-600 mt-0.5">✓</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {company.red_flags?.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <h3 className="font-semibold text-slate-900">Red Flags</h3>
                      </div>
                      <ul className="space-y-2">
                        {company.red_flags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-red-600 mt-0.5">!</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Internal Notes */}
              {company.notes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-slate-500" />
                    <h3 className="font-semibold text-slate-900">Internal Notes</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{company.notes}</p>
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* DUE DILIGENCE TAB */}
          <TabsContent value="diligence">
            <div className="space-y-6">
              {/* Recommendation */}
              {company.recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-6 ${
                    company.recommendation === 'advance_to_deal_stage' ? 'bg-emerald-50 border-emerald-200' :
                    company.recommendation === 'follow_up' ? 'bg-amber-50 border-amber-200' :
                    'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">AI Recommendation</h3>
                    <Badge className={`${
                      company.recommendation === 'advance_to_deal_stage' ? 'bg-emerald-100 text-emerald-700' :
                      company.recommendation === 'follow_up' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {company.recommendation.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  {company.recommendation_reasoning && (
                    <p className="text-sm text-slate-700 leading-relaxed">{company.recommendation_reasoning}</p>
                  )}
                </motion.div>
              )}

              {/* Market Assessment */}
              {company.market_assessment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <h4 className="font-semibold text-slate-900 mb-3">Market Assessment</h4>
                  <p className="text-slate-700 leading-relaxed">{company.market_assessment}</p>
                </motion.div>
              )}

              {/* Competitive Landscape */}
              {company.competitive_landscape?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <h4 className="font-semibold text-slate-900 mb-3">Competitive Landscape</h4>
                  <div className="space-y-2">
                    {company.competitive_landscape.map((comp, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-lg">
                        <p className="font-medium text-slate-900 text-sm">{comp.name}</p>
                        <p className="text-xs text-slate-600">{comp.positioning}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Green/Red Flags */}
              <div className="grid md:grid-cols-2 gap-6">
                {company.green_flags?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6"
                  >
                    <h4 className="font-semibold text-slate-900 mb-3">Green Flags</h4>
                    <ul className="space-y-2">
                      {company.green_flags.map((flag, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-emerald-600">✓</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {company.red_flags?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6"
                  >
                    <h4 className="font-semibold text-slate-900 mb-3">Red Flags</h4>
                    <ul className="space-y-2">
                      {company.red_flags.map((flag, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-red-600">!</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Founder Background */}
              {company.team_background?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6"
                >
                  <h4 className="font-semibold text-slate-900 mb-3">Founder Background</h4>
                  <ul className="space-y-2">
                    {company.team_background.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700">• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Key Questions */}
              {company.key_questions?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-br from-violet-50 to-white rounded-2xl border border-violet-200 p-6"
                >
                  <h4 className="font-semibold text-slate-900 mb-3">Key Questions for Next Meeting</h4>
                  <ol className="space-y-2">
                    {company.key_questions.map((q, i) => (
                      <li key={i} className="text-sm text-slate-700">
                        <span className="font-medium">Q{i + 1}:</span> {q}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* TOUCHPOINTS TAB */}
          <TabsContent value="communication">
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
                  <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Touchpoints Yet</h3>
                  <p className="text-slate-600">Communication history will appear here as interactions are logged.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
