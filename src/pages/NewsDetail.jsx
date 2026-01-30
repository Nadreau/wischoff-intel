import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ExternalLink, TrendingUp, AlertTriangle, Sparkles, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function NewsDetail() {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const alertId = params.get('id');
    
    if (alertId) {
      loadAlert(alertId);
    }
  }, []);

  const loadAlert = async (alertId) => {
    try {
      const alerts = await base44.entities.Alert.filter({ id: alertId });
      if (alerts.length > 0) {
        setAlert(alerts[0]);
        // Mark as read
        await base44.entities.Alert.update(alertId, { read: true });
      }
    } catch (error) {
      console.error('Error loading alert:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">News Not Found</h2>
            <p className="text-slate-600 mb-6">The news item you're looking for doesn't exist.</p>
            <Link to={createPageUrl('Dashboard')}>
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const TypeIcon = alert.type === 'opportunity' ? TrendingUp : AlertTriangle;
  const typeColor = alert.type === 'opportunity' 
    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
    : 'bg-red-50 border-red-200 text-red-700';

  const priorityColor = alert.priority === 'high' 
    ? 'bg-red-100 text-red-700' 
    : alert.priority === 'medium' 
    ? 'bg-amber-100 text-amber-700' 
    : 'bg-blue-100 text-blue-700';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6"
        >
          <div className={`p-6 border-b ${typeColor}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl border ${typeColor}`}>
                <TypeIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <Link
                  to={createPageUrl(`CompanyDetail?company=${encodeURIComponent(alert.company_name)}`)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-2 inline-block"
                >
                  {alert.company_name}
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 mb-3">{alert.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={`${priorityColor} text-xs`}>
                    {alert.priority} priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {alert.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {alert.category}
                  </Badge>
                  {alert.date && (
                    <>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(alert.date), 'MMMM d, yyyy')}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {alert.source_url && (
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
              <a
                href={alert.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
                View Original Source
              </a>
            </div>
          )}
        </motion.div>

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-violet-100">
              <Sparkles className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Investment Impact Analysis</h2>
              <p className="text-sm text-slate-500">AI-generated analysis for {alert.company_name}</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            {alert.article_content ? (
              <ReactMarkdown
                className="text-slate-700"
                components={{
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                  ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-slate-700">{children}</li>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">{children}</h3>,
                }}
              >
                {alert.article_content}
              </ReactMarkdown>
            ) : (
              <p className="text-slate-600">{alert.description}</p>
            )}
          </div>
        </motion.div>

        {/* Impact Summary */}
        {alert.impact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl border p-6 ${
              alert.type === 'opportunity'
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <h3 className={`font-semibold mb-2 ${
              alert.type === 'opportunity' ? 'text-emerald-900' : 'text-red-900'
            }`}>
              Key Impact:
            </h3>
            <p className={`${
              alert.type === 'opportunity' ? 'text-emerald-800' : 'text-red-800'
            }`}>
              {alert.impact}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}