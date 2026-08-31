import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, PhoneCall, MessageSquare, ChevronRight, X, BarChart3, Users, Send, MousePointer, ShieldAlert, BookOpen } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function CampaignPage({ campaigns, students }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const getChannelIcon = (ch) => {
    switch (ch) {
      case 'Email': return <Mail size={14} className="text-cyan-400" />;
      case 'SMS': return <PhoneCall size={14} className="text-purple-400" />;
      case 'WhatsApp': return <MessageSquare size={14} className="text-emerald-400" />;
      default: return <Mail size={14} />;
    }
  };

  // Safe percentage helper
  const getPercentage = (part, total) => {
    if (!total) return 0;
    return Math.round((part / total) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Campaign Performance Tracker
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">ACTIVE SPOOF SIMULATIONS & INTERACTION AUDITING</p>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((c, i) => {
          const openRate = getPercentage(c.opened, c.sent);
          const clickRate = getPercentage(c.clicked, c.sent);
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedCampaign(c)}
              className="glass-panel border-cyan-500/10 hover:border-cyan-500/35 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer glass-panel-hover"
            >
              {/* Campaign Title & Channel */}
              <div className="flex items-center gap-4 min-w-[250px]">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  {getChannelIcon(c.channel)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{c.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{c.channel}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">{c.status}</span>
                  </div>
                </div>
              </div>

              {/* Progress metrics */}
              <div className="flex-1 grid grid-cols-3 gap-2 max-w-md font-mono text-xs text-center">
                <div>
                  <span className="text-[9px] text-slate-500 block">DELIVERED</span>
                  <span className="text-sm font-extrabold text-slate-300">{c.sent}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">OPEN RATE</span>
                  <span className="text-sm font-extrabold text-cyan-400">{openRate}%</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">CLICK RATE</span>
                  <span className={`text-sm font-extrabold ${clickRate > 40 ? 'text-red-400' : 'text-yellow-400'}`}>{clickRate}%</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-end">
                <button className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 rounded-lg transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CAMPAIGN METRICS OVERLAY MODAL */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCampaign(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-4xl glass-panel border-cyan-500/30 rounded-2xl overflow-hidden shadow-glow-primary z-50 flex flex-col max-h-[85vh]"
            >
              {/* Scanline */}
              <div className="scan-line"></div>

              {/* Header */}
              <div className="p-5 border-b border-cyan-500/15 bg-slate-900/60 flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-cyan-400" size={20} />
                  <div>
                    <h2 className="text-sm font-bold text-slate-200 uppercase">{selectedCampaign.name}</h2>
                    <span className="text-[10px] text-slate-500">DETAILED TELEMETRY REPORTS</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCampaign(null)}
                  className="p-1 text-slate-500 hover:text-slate-200 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                {/* Micro Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Target List Size", count: selectedCampaign.sent, icon: <Users size={16} />, color: "text-slate-400" },
                    { label: "Delivered", count: selectedCampaign.sent, icon: <Send size={16} />, color: "text-purple-400" },
                    { label: "Opened Message", count: selectedCampaign.opened, icon: <MousePointer size={16} />, color: "text-cyan-400" },
                    { label: "Link Clicked", count: selectedCampaign.clicked, icon: <ShieldAlert size={16} />, color: "text-red-400" }
                  ].map((s, idx) => (
                    <div key={idx} className="glass-panel p-3.5 border-slate-800 rounded-lg flex items-center justify-between font-mono">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">{s.label}</span>
                        <span className="text-lg font-extrabold text-slate-200">{s.count}</span>
                      </div>
                      <div className={`p-2 bg-slate-900 border border-slate-850 rounded-md ${s.color}`}>
                        {s.icon}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Recharts Bar */}
                  <div className="lg:col-span-6 glass-panel border-slate-800 p-4 rounded-xl">
                    <h3 className="text-xs font-bold font-mono text-cyan-400 mb-3 uppercase">Interaction Ratio</h3>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Sent', count: selectedCampaign.sent },
                          { name: 'Opened', count: selectedCampaign.opened },
                          { name: 'Clicked', count: selectedCampaign.clicked }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.2)" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(6, 182, 212, 0.2)', fontSize: 11 }} />
                          <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Funnel Ratios */}
                  <div className="lg:col-span-6 glass-panel border-slate-800 p-4 rounded-xl flex flex-col justify-center space-y-4 font-mono text-xs">
                    <h3 className="text-xs font-bold text-cyan-400 uppercase">Conversion Analysis</h3>
                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Open Success Rate</span>
                          <span className="text-cyan-400 font-bold">{getPercentage(selectedCampaign.opened, selectedCampaign.sent)}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
                          <div className="bg-cyan-400 h-full rounded" style={{ width: `${getPercentage(selectedCampaign.opened, selectedCampaign.sent)}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Click Susceptibility (CTR)</span>
                          <span className="text-red-400 font-bold">{getPercentage(selectedCampaign.clicked, selectedCampaign.sent)}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
                          <div className="bg-red-500 h-full rounded shadow-glow-danger" style={{ width: `${getPercentage(selectedCampaign.clicked, selectedCampaign.sent)}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-[11px] text-slate-400">
                          <span>Training Attendance of compromised targets</span>
                          <span className="text-emerald-400 font-bold">{getPercentage(selectedCampaign.completedTraining, selectedCampaign.clicked)}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded border border-slate-850 overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded" style={{ width: `${getPercentage(selectedCampaign.completedTraining, selectedCampaign.clicked)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Targets Status List */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase">Target Directory Log</h3>
                  <div className="max-h-[180px] overflow-y-auto border border-slate-850 rounded-lg">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead className="bg-slate-900 text-slate-500 sticky top-0 uppercase text-[10px]">
                        <tr>
                          <th className="p-2.5">Target Name</th>
                          <th className="p-2.5">Email</th>
                          <th className="p-2.5 text-center">Opened</th>
                          <th className="p-2.5 text-center">Clicked</th>
                          <th className="p-2.5 text-center">Risk Factor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 bg-slate-950/40">
                        {students.filter(s => selectedCampaign.studentTargets?.includes(s.id)).map((s, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/20">
                            <td className="p-2.5 text-slate-200 font-bold">{s.name}</td>
                            <td className="p-2.5 text-slate-400">{s.email}</td>
                            <td className="p-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded ${s.openedSimulations?.includes(selectedCampaign.name) ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-slate-600'}`}>
                                {s.openedSimulations?.includes(selectedCampaign.name) ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td className="p-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded ${s.clickedSimulations?.includes(selectedCampaign.name) ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-slate-900 text-slate-600'}`}>
                                {s.clickedSimulations?.includes(selectedCampaign.name) ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td className="p-2.5">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                s.riskLevel === 'HIGH RISK' ? 'text-red-400 border border-red-500/20 bg-red-500/5' : 'text-cyan-400 border border-cyan-500/20 bg-cyan-500/5'
                              }`}>{s.riskLevel}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-900 bg-slate-900/40 text-right">
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="px-4 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 font-mono text-xs rounded transition-all cursor-pointer"
                >
                  CLOSE REPORT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
