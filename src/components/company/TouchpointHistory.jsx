import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Calendar, Phone, Link as LinkIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import DemoModal from '@/components/DemoModal';

export default function TouchpointHistory({ company }) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const hasTouchpoints = company.touchpoints && company.touchpoints.length > 0;
  
  const getIcon = (type) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
            <Users className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Touchpoint History</h2>
        </div>
      </div>
      
      <div className="p-6">
        {!hasTouchpoints ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto mb-4 flex items-center justify-center">
              <LinkIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect CRM Data</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Link HubSpot, Salesforce, or Gmail to see all founder communications and meeting history.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="gap-2" onClick={() => setShowDemoModal(true)}>
                <img src="https://cdn.worldvectorlogo.com/logos/hubspot-1.svg" className="w-5 h-5" alt="HubSpot" />
                Connect HubSpot
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setShowDemoModal(true)}>
                <img src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" className="w-5 h-5" alt="Salesforce" />
                Connect Salesforce
              </Button>
            </div>
            <DemoModal
              open={showDemoModal}
              onClose={() => setShowDemoModal(false)}
              featureName="CRM integration"
              features={['Deal sync', 'Meeting history', 'Email tracking', 'Contact notes']}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {company.touchpoints.map((touchpoint, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  {getIcon(touchpoint.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-slate-900">{touchpoint.title}</span>
                    <span className="text-xs text-slate-400">
                      {format(new Date(touchpoint.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{touchpoint.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}