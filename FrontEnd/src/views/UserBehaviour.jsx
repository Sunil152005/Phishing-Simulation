import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, User, Mail, Send, Award, Clock, 
  AlertTriangle, ShieldCheck, X, FileText, Activity, ShieldAlert, BookOpen
} from 'lucide-react';

export default function UserBehaviour({ students, triggerSingleTest }) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [riskFilter, setRiskFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  // Filter students list
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'All' || s.riskLevel === riskFilter;
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    return matchesSearch && matchesRisk && matchesDept;
  });

  const getRiskBadge = (lvl) => {
    switch (lvl) {
      case 'HIGH RISK': 
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 border border-red-500/30 text-red-400 animate-pulse shadow-glow-danger">HIGH RISK</span>;
      case 'LOW RISK': 
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">LOW RISK</span>;
      default: 
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-glow-accent">AWARE</span>;
    }
  };

  const getStatusBadge = (s) => {
    if (s.quizScore >= 80) {
      return <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Quiz Completed</span>;
    }
    if (s.trainingCompleted) {
      return <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Training Done</span>;
    }
    if (s.clickedSimulations?.length > 0) {
      return <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">Training Pending</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-slate-900 text-slate-500 border border-slate-800">No Action</span>;
  };

  const getPercentageColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-yellow-400';
    if (score > 0) return 'text-red-400';
    return 'text-slate-500';
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          User Behaviour telemetry
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">REAL-TIME BEHAVIOURAL PROFILES & AUDIT TRAILS</p>
      </div>

      {/* FILTER PANEL */}
      <div className="glass-panel border-cyan-500/10 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student profile or email..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950/80 border border-slate-850 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] uppercase">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300"
            >
              <option value="All">All Risks</option>
              <option value="AWARE">Aware</option>
              <option value="LOW RISK">Low Risk</option>
              <option value="HIGH RISK">High Risk</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] uppercase">Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300"
            >
              <option value="All">All Depts</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="glass-panel border-cyan-500/10 rounded-xl overflow-hidden shadow-cyber-inset">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-900/80 text-slate-500 uppercase text-[10px] border-b border-slate-900 sticky top-0">
              <tr>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Active Campaign</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5 text-center">Opened</th>
                <th className="p-3.5 text-center">Clicked</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Quiz Score</th>
                <th className="p-3.5 text-center">Quiz Time</th>
                <th className="p-3.5">Risk Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 bg-slate-950/20">
              {filteredStudents.map((s, idx) => {
                const latestCampaign = s.openedSimulations?.[s.openedSimulations.length - 1] || 'None';
                const channelName = s.clickedSimulations?.length > 0 ? 'Email' : 'N/A';
                const hasOpened = s.openedSimulations?.length > 0;
                const hasClicked = s.clickedSimulations?.length > 0;

                return (
                  <tr 
                    key={s.id} 
                    onClick={() => setSelectedStudent(s)}
                    className="hover:bg-cyan-500/5 transition-all cursor-pointer group"
                  >
                    <td className="p-3.5 font-sans font-bold text-slate-200 group-hover:text-cyan-400 transition-all flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 text-[10px] uppercase font-mono">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div>{s.name}</div>
                        <div className="text-[9px] text-slate-500 font-mono font-normal mt-0.5">{s.department}</div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300 font-bold truncate max-w-[150px]">{latestCampaign}</td>
                    <td className="p-3.5 text-slate-500">{channelName}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${hasOpened ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-slate-600'}`}>
                        {hasOpened ? 'YES' : 'NO'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${hasClicked ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-slate-900 text-slate-600'}`}>
                        {hasClicked ? 'YES' : 'NO'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">{getStatusBadge(s)}</td>
                    <td className={`p-3.5 text-center font-bold ${getPercentageColor(s.quizScore)}`}>
                      {s.quizScore > 0 ? `${s.quizScore}%` : 'N/A'}
                    </td>
                    <td className="p-3.5 text-center text-slate-400">{s.quizTime || 'N/A'}</td>
                    <td className="p-3.5">{getRiskBadge(s.riskLevel)}</td>
                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No matching student telemetry records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPREHENSIVE DOSSIER SLIDE DRAWER */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-40 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            ></motion.div>

            {/* Slide Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full glass-panel border-l border-cyan-500/20 bg-slate-950/95 shadow-glow-primary z-50 flex flex-col p-6 font-mono text-xs relative"
            >
              {/* Scanline */}
              <div className="scan-line"></div>

              {/* Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-cyan-400 animate-pulse" />
                  <span className="text-sm font-bold text-slate-200 uppercase">Security Dossier</span>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-1 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-1.5">
                
                {/* Profile Header */}
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-950 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg font-bold shadow-glow-primary">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 font-sans">{selectedStudent.name}</h3>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedStudent.email}</p>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">{selectedStudent.department}</p>
                  </div>
                  {getRiskBadge(selectedStudent.riskLevel)}
                </div>

                {/* Telemetry Summary */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-cyan-400 uppercase tracking-wider">Metrics Breakdown</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/30 border border-slate-850 p-3 rounded-lg">
                      <span className="text-[9px] text-slate-500 block uppercase mb-1">Safety Score</span>
                      <span className="text-lg font-extrabold text-emerald-400">{selectedStudent.quizScore || 0}%</span>
                    </div>
                    <div className="bg-slate-900/30 border border-slate-850 p-3 rounded-lg">
                      <span className="text-[9px] text-slate-500 block uppercase mb-1">Time Elapsed</span>
                      <span className="text-lg font-extrabold text-cyan-400">{selectedStudent.quizTime || '0s'}</span>
                    </div>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div className="space-y-3">
                  <h4 className="text-[10px] text-cyan-400/80 uppercase tracking-wider">Simulation Audit Timeline</h4>
                  <div className="space-y-3 relative before:absolute before:top-2 before:left-[11px] before:bottom-2 before:w-0.5 before:bg-slate-800">
                    
                    {/* Received */}
                    {selectedStudent.openedSimulations?.map((camName, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-950 border border-cyan-500/20 flex items-center justify-center shrink-0 z-10">
                          <Send size={10} className="text-cyan-400" />
                        </div>
                        <div className="pt-0.5">
                          <span className="text-[10px] text-slate-400 font-bold block">Delivered Phishing simulation</span>
                          <span className="text-[9px] text-slate-500 block">Campaign: {camName}</span>
                        </div>
                      </div>
                    ))}

                    {/* Opened */}
                    {selectedStudent.openedSimulations?.map((camName, idx) => (
                      <div key={`opened-${idx}`} className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-950 border border-yellow-500/30 flex items-center justify-center shrink-0 z-10">
                          <Mail size={10} className="text-yellow-400 animate-pulse" />
                        </div>
                        <div className="pt-0.5">
                          <span className="text-[10px] text-yellow-300 font-bold block">Message Opened</span>
                          <span className="text-[9px] text-slate-500 block">Campaign: {camName}</span>
                        </div>
                      </div>
                    ))}

                    {/* Clicked */}
                    {selectedStudent.clickedSimulations?.map((camName, idx) => (
                      <div key={`clicked-${idx}`} className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-950 border border-red-500/30 flex items-center justify-center shrink-0 z-10 shadow-glow-danger animate-pulse">
                          <ShieldAlert size={10} className="text-red-400" />
                        </div>
                        <div className="pt-0.5">
                          <span className="text-[10px] text-red-400 font-bold block">Compromised (Clicked Link)</span>
                          <span className="text-[9px] text-slate-500 block">Immediate redirection triggered to sandbox</span>
                        </div>
                      </div>
                    ))}

                    {/* Training */}
                    {selectedStudent.trainingCompleted && (
                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-950 border border-indigo-500/30 flex items-center justify-center shrink-0 z-10">
                          <BookOpen size={10} className="text-indigo-400" />
                        </div>
                        <div className="pt-0.5">
                          <span className="text-[10px] text-indigo-400 font-bold block">Awareness Training Finished</span>
                          <span className="text-[9px] text-slate-500 block">Read all slides on phishing warning indicators</span>
                        </div>
                      </div>
                    )}

                    {/* Quiz */}
                    {selectedStudent.quizScore > 0 && (
                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-950 border border-emerald-500/30 flex items-center justify-center shrink-0 z-10 shadow-glow-accent">
                          <Award size={10} className="text-emerald-400" />
                        </div>
                        <div className="pt-0.5">
                          <span className="text-[10px] text-emerald-400 font-bold block">Quiz Passed ({selectedStudent.quizScore}%)</span>
                          <span className="text-[9px] text-slate-500 block">Completed in {selectedStudent.quizTime}</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Direct Simulation launch for target student */}
                <div className="border-t border-slate-900 pt-4">
                  <button
                    onClick={() => {
                      triggerSingleTest(selectedStudent.id);
                      setSelectedStudent(null);
                    }}
                    className="w-full py-2 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-300 font-bold text-center rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={12} /> Target for Phishing Simulation
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
