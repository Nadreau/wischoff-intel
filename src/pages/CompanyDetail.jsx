import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import CompanyHeader from '@/components/company/CompanyHeader';
import CompanyOverview from '@/components/company/CompanyOverview';
import MarketIntelligence from '@/components/company/MarketIntelligence';
import ExecutiveBrief from '@/components/company/ExecutiveBrief';
import DeepIntelligence from '@/components/company/DeepIntelligence';
import CompetitiveLandscape from '@/components/company/CompetitiveLandscape';
import RecentNews from '@/components/company/RecentNews';
import FinancialMetrics from '@/components/company/FinancialMetrics';

export default function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const params = new URLSearchParams(window.location.search);
      const companyName = params.get('company');

      if (!companyName) {
        setError('No company specified');
        setLoading(false);
        return;
      }

      try {
        // Load portfolio companies and find by name
        const companies = await base44.entities.PortfolioCompany.list();
        const foundCompany = companies.find(c => c.name === companyName);

        if (foundCompany) {
          setCompany(foundCompany);

          // Load alerts for this company
          try {
            const allAlerts = await base44.entities.Alert.list('-date');
            setAlerts(allAlerts);
          } catch (alertError) {
            console.error('Error loading alerts:', alertError);
          }
        } else {
          setError(`Company "${companyName}" not found`);
        }
      } catch (err) {
        console.error('Error loading company:', err);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading company intelligence...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">{error || 'Company not found'}</h2>
          <Link to={createPageUrl('Dashboard')} className="text-blue-600 hover:text-blue-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to={createPageUrl('Dashboard')}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Company Header */}
        <CompanyHeader company={company} alerts={alerts} />

        {/* Last Updated Info */}
        {(company.intelligence_last_updated || company.news_last_updated) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xs text-slate-400"
          >
            {company.intelligence_last_updated && (
              <span>Intelligence updated: {new Date(company.intelligence_last_updated).toLocaleDateString()}</span>
            )}
            {company.intelligence_last_updated && company.news_last_updated && <span className="mx-2">|</span>}
            {company.news_last_updated && (
              <span>News updated: {new Date(company.news_last_updated).toLocaleDateString()}</span>
            )}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="daily">Daily Brief</TabsTrigger>
              <TabsTrigger value="intelligence">Deep Intel</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            </TabsList>

            {/* Tab 1: Company Overview - Static data refreshed weekly */}
            <TabsContent value="overview" className="space-y-6">
              <CompanyOverview company={company} />
              <div className="grid md:grid-cols-2 gap-6">
                <MarketIntelligence company={company} />
                <CompetitiveLandscape company={company} />
              </div>
              <RecentNews company={company} />
              <FinancialMetrics company={company} />
            </TabsContent>

            {/* Tab 2: Executive Brief - Curated quick overview for VCs */}
            <TabsContent value="daily" className="space-y-6">
              <ExecutiveBrief company={company} alerts={alerts} />
            </TabsContent>

            {/* Tab 3: Deep Intelligence - Organized VC-grade analysis */}
            <TabsContent value="intelligence" className="space-y-6">
              <DeepIntelligence company={company} />
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">AI Assistant for {company.name}</h3>
                  <p className="text-sm opacity-90">Ask questions about {company.name}, market trends, competitors, or opportunities. Trained on all company data and real-time market intelligence.</p>
                </div>

                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-2xl bg-violet-100 mx-auto mb-4 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-violet-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">Start a conversation</h4>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                          Ask anything about {company.name}, their market, competitors, or strategic opportunities.
                        </p>
                        <div className="space-y-2 max-w-lg mx-auto">
                          <Button variant="outline" className="w-full justify-start text-left" onClick={() => setChatInput("What are the biggest threats to " + company.name + " right now?")}>
                            What are the biggest threats right now?
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left" onClick={() => setChatInput("How does " + company.name + " compare to top competitors?")}>
                            How do they compare to top competitors?
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left" onClick={() => setChatInput("What growth opportunities should we prioritize?")}>
                            What growth opportunities should we prioritize?
                          </Button>
                        </div>
                      </div>
                    )}

                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-violet-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-900'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        </div>
                      </div>
                    ))}

                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                          <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 p-4">
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      if (!chatInput.trim() || isChatLoading) return;

                      const userMessage = chatInput;
                      setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
                      setChatInput('');
                      setIsChatLoading(true);

                      try {
                        // Simulate AI response with company context
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        
                        const contextualResponse = `Based on the available intelligence for ${company.name}:\n\n` +
                          `${company.description}\n\n` +
                          `Market: ${company.market?.size || 'N/A'} (${company.market?.growth || 'N/A'} growth)\n\n` +
                          `This is a demo preview — when connected to the AI backend, I'll provide real-time analysis combining company data, market intelligence, and competitive insights to answer your specific question about "${userMessage}".`;

                        setChatMessages(prev => [...prev, { role: 'assistant', content: contextualResponse }]);
                      } catch (error) {
                        setChatMessages(prev => [...prev, { role: 'assistant', content: 'AI assistant will be fully connected in the production version. This demo shows the interface and interaction flow.' }]);
                      } finally {
                        setIsChatLoading(false);
                      }
                    }} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about market trends, competitors, opportunities..."
                        className="flex-1"
                        disabled={isChatLoading}
                      />
                      <Button type="submit" disabled={isChatLoading || !chatInput.trim()} className="bg-violet-600 hover:bg-violet-700">
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}