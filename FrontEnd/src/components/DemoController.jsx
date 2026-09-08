import React, { useState } from 'react';
import { Sliders, RefreshCw, User, ShieldAlert, Eye, Terminal, ChevronLeft, ChevronRight, Sparkles, BookOpen, ShieldCheck, Settings } from 'lucide-react';

/**
 * DemoController Component
 * ------------------------
 * Floating HUD Control tool for professors, evaluators, and judges.
 * Allows quick perspective switching (Admin vs Student), triggering real-time
 * phishing delivery/clicks, and resetting the mock memory database.
 */
export default function DemoController({ 
  currentView, 
  setView, 
  adminTab,
  setAdminTab,
  resetDemoData, 
  triggerStudentEmail, 
  triggerStudentClick 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const adminViews = [
    { id: 'admin-dashboard', name: 'Dashboard Overview' },
    { id: 'create-simulation', name: 'Create Simulation' },
    { id: 'campaigns', name: 'Campaign Tracker' },
    { id: 'user-behaviour', name: 'User Behaviour' },
    { id: 'training', name: 'Training Console' },
    { id: 'quiz-results', name: 'Quiz Roster Results' },
    { id: 'risk-analysis', name: 'Risk Analysis' },
    { id: 'reports', name: 'Reports Console' },
    { id: 'settings', name: 'Settings & Rules' },
  ];

  const studentViews = [
    { id: 'user-auth', name: 'User Login / Register' },
    { id: 'student-dashboard', name: 'Student Dashboard' },
    { id: 'student-email-inbox', name: 'Mock Email Inbox' },
    { id: 'phishing-alert', name: 'Phishing Warning Page' },
    { id: 'awareness-training', name: 'Awareness Training' },
    { id: 'quiz', name: 'Cyber Quiz' },
    { id: 'quiz-result', name: 'Quiz Result Screen' },
  ];

  // Navigate directly to an admin sub-tab
  const handleAdminNav = (tabId) => {
    if (setAdminTab) setAdminTab(tabId);
    setView('admin-dashboard');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end">
      {/* HUD Panel */}
      {isOpen && (
        <div className="mr-2 w-80 glass-panel border-cyan-500/30 p-4 rounded-xl shadow-glow-primary animate-fade-in-up text-xs font-mono max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-wider">
              <Terminal size={14} className="animate-pulse" />
              DEMO HUD CONTROL
            </span>
            <span className="text-[10px] text-slate-500">v2.4-PROTOTYPE</span>
          </div>

          {/* Perspective Jumps */}
          <div className="mb-4">
            <div className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-bold">
              Core Perspectives
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => {
                  if (setAdminTab) setAdminTab('admin-dashboard');
                  setView('admin-dashboard');
                }}
                className={`py-1.5 px-2 rounded border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  currentView === 'admin-dashboard' 
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-primary font-bold' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Sliders size={11} /> Admin Portal
              </button>
              <button 
                onClick={() => setView('student-dashboard')}
                className={`py-1.5 px-2 rounded border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  studentViews.some(v => v.id === currentView) 
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-glow-secondary font-bold' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <User size={11} /> Student Portal
              </button>
            </div>
          </div>

          {/* Admin Navigation */}
          <div className="mb-3">
            <div className="text-[10px] text-cyan-400/80 mb-1 uppercase tracking-wider font-bold">
              Admin Screen Tabs
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {adminViews.map((tab) => {
                const isCurrent = currentView === 'admin-dashboard' && adminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleAdminNav(tab.id)}
                    className={`py-1 px-1.5 text-[10px] rounded text-left truncate transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-cyan-500/20 border-l-2 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900/40 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Navigation */}
          <div className="mb-4">
            <div className="text-[10px] text-purple-400/80 mb-1 uppercase tracking-wider font-bold">
              Student Screens
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {studentViews.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setView(view.id)}
                  className={`py-1 px-1.5 text-[10px] rounded text-left truncate transition-all cursor-pointer ${
                    currentView === view.id
                      ? 'bg-purple-500/20 border-l-2 border-purple-400 text-purple-200 font-bold'
                      : 'bg-slate-900/40 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  {view.name}
                </button>
              ))}
              <button
                onClick={() => setView('landing')}
                className={`py-1.5 px-2 text-[10px] rounded text-center truncate transition-all col-span-2 cursor-pointer mt-1 ${
                  currentView === 'landing'
                    ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                🏠 Platform Landing Page
              </button>
            </div>
          </div>

          {/* Trigger State Manipulations */}
          <div className="border-t border-slate-800 pt-3 mb-3">
            <div className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-bold">
              Simulation Live Triggers
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={triggerStudentEmail}
                className="py-1.5 px-2 rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 text-center flex items-center justify-center gap-1.5 cursor-pointer font-bold"
              >
                <Eye size={12} /> Deliver Simulation Alert
              </button>
              <button 
                onClick={triggerStudentClick}
                className="py-1.5 px-2 rounded border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-center flex items-center justify-center gap-1.5 cursor-pointer font-bold"
              >
                <ShieldAlert size={12} /> Force Phishing Link Compromised
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button 
            onClick={resetDemoData}
            className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 text-center flex items-center justify-center gap-2 rounded-lg transition-all cursor-pointer text-xs"
          >
            <RefreshCw size={12} className="animate-spin-slow" /> Reset Simulation State
          </button>
        </div>
      )}

      {/* Trigger Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 w-11 rounded-full flex items-center justify-center glass-panel border-cyan-500/40 bg-cyan-950/60 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all hover:scale-105 duration-300 shadow-glow-primary cursor-pointer"
        title="Toggle Demo HUD Control Panel"
      >
        <Sliders size={18} />
      </button>
    </div>
  );
}
