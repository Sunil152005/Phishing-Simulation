import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, Send, MailOpen, MousePointer, ShieldCheck, BookOpen, 
  AlertTriangle, Shield, TrendingUp, BarChart3, Settings, LogOut,
  Sparkles
} from 'lucide-react';

export default function AdminDashboard({ 
  stats, 
  activeTab, 
  setActiveTab, 
  setView,
  children 
}) {
  
  // Sidebar items
  const menuItems = [
    { id: 'admin-dashboard', name: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'create-simulation', name: 'Create Simulation', icon: <Send size={18} /> },
    { id: 'campaigns', name: 'Campaigns', icon: <Sparkles size={18} /> },
    { id: 'user-behaviour', name: 'User Behaviour', icon: <Users size={18} /> },
    { id: 'training', name: 'Training Courses', icon: <BookOpen size={18} /> },
    { id: 'quiz-results', name: 'Quiz Results', icon: <ShieldCheck size={18} /> },
    { id: 'risk-analysis', name: 'Risk Analysis', icon: <AlertTriangle size={18} /> },
    { id: 'reports', name: 'Reports Console', icon: <TrendingUp size={18} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={18} /> },
  ];

  // Recharts Mock Data
  const behaviourTrendData = [
    { name: 'Mar', Sent: 40, Opened: 30, Clicked: 15 },
    { name: 'Apr', Sent: 70, Opened: 52, Clicked: 22 },
    { name: 'May', Sent: 90, Opened: 68, Clicked: 35 },
    { name: 'Jun', Sent: 110, Opened: 80, Clicked: 40 },
    { name: 'Jul', Sent: 130, Opened: 92, Clicked: 45 },
    { name: 'Aug', Sent: stats.simulationsSent, Opened: stats.messagesOpened, Clicked: stats.linksClicked },
  ];

  const channelComparisonData = [
    { name: 'Email', Opened: 78, Clicked: 32 },
    { name: 'SMS', Opened: 88, Clicked: 52 },
    { name: 'WhatsApp', Opened: 94, Clicked: 62 },
  ];

  const riskPieData = [
    { name: 'Aware (Secure)', value: stats.awareUsers, color: '#10b981' },
    { name: 'Low Risk', value: stats.lowRiskUsers, color: '#06b6d4' },
    { name: 'High Risk', value: stats.highRiskUsers, color: '#ef4444' },
  ];

  // Quick stat cards configuration
  const statCards = [
    { label: "Total Users", val: stats.totalUsers, icon: <Users size={20} className="text-cyan-400" />, shadow: "shadow-glow-primary" },
    { label: "Simulations Sent", val: stats.simulationsSent, icon: <Send size={20} className="text-purple-400" />, shadow: "shadow-glow-secondary" },
    { label: "Messages Opened", val: stats.messagesOpened, icon: <MailOpen size={20} className="text-yellow-400" />, shadow: "shadow-cyan-inset" },
    { label: "Links Clicked", val: stats.linksClicked, icon: <MousePointer size={20} className="text-rose-400" />, shadow: "shadow-glow-danger" },
    { label: "Aware Users", val: stats.awareUsers, icon: <ShieldCheck size={20} className="text-emerald-400" />, shadow: "shadow-glow-accent" },
    { label: "Training Completed", val: stats.trainingCompleted, icon: <BookOpen size={20} className="text-indigo-400" />, shadow: "shadow-cyber-inset" },
    { label: "High Risk Users", val: stats.highRiskUsers, icon: <AlertTriangle size={20} className="text-red-500" />, shadow: "border-red-500/20" },
    { label: "Low Risk Users", val: stats.lowRiskUsers, icon: <Shield size={20} className="text-emerald-500" />, shadow: "border-emerald-500/10" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden text-slate-200">
      
      {/* SIDEBAR */}
      <aside className="w-64 glass-panel border-r border-cyan-500/15 flex flex-col justify-between p-4 z-20">
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 border-b border-cyan-500/10 mb-4 cursor-pointer" onClick={() => setView('landing')}>
            <Shield className="text-cyan-400 animate-pulse-slow" size={24} />
            <div>
              <div className="font-sans font-bold text-sm tracking-wide text-glow-cyan text-cyan-400">AEGIS CONTROL</div>
              <div className="text-[9px] text-slate-500 font-mono">CYBER LAB CONSOLE</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                  activeTab === item.id 
                    ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-300 shadow-glow-primary' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wide text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all w-full text-left"
        >
          <LogOut size={18} />
          <span>LOGOUT CONSOLE</span>
        </button>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950/40 relative z-10 p-6 md:p-8">
        
        {/* Render nested content if tab is NOT activeTab dashboard */}
        {activeTab !== 'admin-dashboard' ? (
          children
        ) : (
          // RENDER CORE ADMIN DASHBOARD
          <div className="space-y-8 animate-fade-in">
            
            {/* Header Title */}
            <div>
              <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Security Posture Overview
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">SECURE NETWORK SIMULATOR & BEHAVIOURAL TELEMETRY</p>
            </div>

            {/* QUICK STATS DECK */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-panel p-4 rounded-xl border border-cyan-500/10 hover:border-cyan-500/35 transition-all duration-300 flex items-center justify-between ${c.shadow}`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">{c.label}</span>
                    <span className="text-2xl font-extrabold text-white block tracking-tight">
                      {c.val}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                    {c.icon}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CHARTS CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Trend Chart (Left) */}
              <div className="lg:col-span-8 glass-panel border border-cyan-500/10 p-5 rounded-2xl">
                <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-4">Simulations Telemetry (Opened vs Clicked)</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={behaviourTrendData}>
                      <defs>
                        <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClicked" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.3)" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(6, 182, 212, 0.2)', fontSize: 12, borderRadius: 8, color: '#f8fafc' }} />
                      <Area type="monotone" dataKey="Sent" stroke="#a855f7" fillOpacity={1} fill="url(#colorSent)" strokeWidth={1.5} />
                      <Area type="monotone" dataKey="Opened" stroke="#06b6d4" fillOpacity={1} fill="url(#colorOpened)" strokeWidth={1.5} />
                      <Area type="monotone" dataKey="Clicked" stroke="#ef4444" fillOpacity={1} fill="url(#colorClicked)" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Risk Donut Chart (Right) */}
              <div className="lg:col-span-4 glass-panel border border-cyan-500/10 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-4">Risk Level Profile</h3>
                  <div className="h-[180px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {riskPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(6, 182, 212, 0.2)', fontSize: 11, borderRadius: 8 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 pt-2 border-t border-slate-900">
                  {riskPieData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
                        <span className="text-slate-400">{item.name}</span>
                      </div>
                      <span className="text-slate-200 font-bold">{item.value} ({Math.round(item.value / stats.totalUsers * 100)}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Channel Comparison (Left) */}
              <div className="lg:col-span-6 glass-panel border border-cyan-500/10 p-5 rounded-2xl">
                <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-4">Channel Vector Success Rate (%)</h3>
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.3)" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(6, 182, 212, 0.2)', fontSize: 12, borderRadius: 8 }} />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="Opened" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Clicked" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Campaign Funnel (Right) */}
              <div className="lg:col-span-6 glass-panel border border-cyan-500/10 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-2">Campaign Flow Conversion</h3>
                  <p className="text-[10px] text-slate-400 font-mono mb-4">MOCK PERFORMANCE FUNNEL ANALYSIS</p>
                </div>

                {/* Vertical Funnel Flowchart */}
                <div className="space-y-3 font-mono text-[11px] pb-2">
                  {[
                    { label: "1. Delivered Simulation Messages", count: stats.simulationsSent, pct: "100%", color: "bg-purple-500/20 border-purple-500/40 text-purple-300" },
                    { label: "2. Opened Notification", count: stats.messagesOpened, pct: `${Math.round(stats.messagesOpened / stats.simulationsSent * 100)}%`, color: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" },
                    { label: "3. Compromised (Clicked Link)", count: stats.linksClicked, pct: `${Math.round(stats.linksClicked / stats.simulationsSent * 100)}%`, color: "bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse" },
                    { label: "4. Finished Training Slides", count: stats.trainingCompleted, pct: `${Math.round(stats.trainingCompleted / stats.linksClicked * 100)}% of clicks`, color: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" },
                    { label: "5. Quiz Passed (Low Risk)", count: stats.awareUsers, pct: `${Math.round(stats.awareUsers / stats.totalUsers * 100)}% of total`, color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" }
                  ].map((f, idx) => (
                    <div key={idx} className="relative">
                      {/* Connection arrow lines */}
                      {idx > 0 && (
                        <div className="absolute top-[-14px] left-8 w-0.5 h-3.5 bg-slate-800"></div>
                      )}
                      <div className={`p-2.5 rounded-lg border flex items-center justify-between ${f.color}`}>
                        <span className="font-bold">{f.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-400">({f.count} users)</span>
                          <span className="font-extrabold px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-800">{f.pct}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
