import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Sparkles, LayoutDashboard, List, BarChart3, Link as LinkIcon, Inbox, Handshake } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { name: 'EarlyStage', icon: Sparkles, label: 'Early Stage' },
    { name: 'DealStage', icon: LinkIcon, label: 'Deal Stage' },
    { name: 'PortfolioList', icon: List, label: 'Portfolio' },
    { name: 'Alerts', icon: BarChart3, label: 'Alerts' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Dashboard')} className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">Wischoff</span>
                <span className="text-sm text-slate-500 ml-2 hidden sm:inline">Portfolio Intelligence</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.name;
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-slate-100 text-slate-900' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Wischoff Portfolio Intelligence</span>
            </div>
            <p className="text-sm text-slate-400">
              Powered by AI-driven market analysis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}