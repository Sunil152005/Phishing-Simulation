import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Shield, ShieldAlert, ShieldCheck, Info, Users, Clock, Award, MousePointer } from 'lucide-react';

export default function RiskAnalysis({ students, stats }) {
  const [activeRiskLevel, setActiveRiskLevel] = useState('ALL');

  // Filter students based on category click
  const filteredStudents = students.filter(s => {
    if (activeRiskLevel === 'ALL') return true;
    return s.riskLevel === activeRiskLevel;
  });

  // Calculate average quiz score
  const quizScores = students.filter(s => s.quizScore > 0).map(s => s.quizScore);
  const avgQuizScore = quizScores.length ? Math.round(quizScores.reduce((a,b)=>a+b, 0) / quizScores.length) : 0;

  // Rule based scores calculations
  const totalClickers = students.filter(s => s.clickedSimulations?.length > 0).length;
  const trainingFinished = students.filter(s => s.trainingCompleted).length;
  const trainingRatio = totalClickers ? Math.round((trainingFinished / totalClickers) * 100) : 0;

  // Organisation risk percentage (average risk based on high/low ratio)
  // Let's say: High risk counts as 100, low risk as 40, aware as 0
  const orgRiskIndex = Math.round(
    ((stats.highRiskUsers * 100) + (stats.lowRiskUsers * 35) + (stats.awareUsers * 5)) / stats.totalUsers
  );

  const riskPieData = [
    { name: 'Aware (Secure)', value: stats.awareUsers, color: '#10b981' },
    { name: 'Low Risk', value: stats.lowRiskUsers, color: '#06b6d4' },
    { name: 'High Risk', value: stats.highRiskUsers, color: '#ef4444' },
  ];

  // Colors for risk level
  const getRiskColor = (lvl) => {
    if (lvl === 'HIGH RISK') return 'text-red-400 border-red-500/20 bg-red-500/5';
    if (lvl === 'LOW RISK') return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
    return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-mono text-xs">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Risk Analysis Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">Demo Rule-Based Risk Assessment Console</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-400">
          <Info size={14} className="shrink-0" />
          <span>SCORING SCHEME: STATIC HEURISTIC ENGINE v1.2</span>
        </div>
      </div>

      {/* TOP ROW: METER & CHART & ENGINE RULES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk index meter */}
        <div className="lg:col-span-4 glass-panel border-cyan-500/10 p-5 rounded-xl flex flex-col justify-between items-center text-center">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 self-start">Organizational Risk Index</h3>
          
          <div className="relative flex flex-col items-center justify-center pt-6">
            {/* SVG Speedometer/Meter */}
            <svg className="w-40 h-24" viewBox="0 0 100 50">
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#1f2937" 
                strokeWidth="8" 
                strokeLinecap="round" 
              />
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="url(#riskGradient)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeDasharray={`${(orgRiskIndex / 100) * 125} 125`}
              />
              
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>

            {/* Value overlay */}
            <div className="absolute bottom-1 space-y-0.5">
              <span className="text-3xl font-extrabold text-white block leading-none">{orgRiskIndex}%</span>
              <span className="text-[9px] text-slate-500 block uppercase">
                {orgRiskIndex > 60 ? '🔴 CRITICAL LEVEL' : orgRiskIndex > 30 ? '🟡 WARNING STATUS' : '🟢 SAFE SYSTEM'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-4">
            Aggregated system susceptibility calculated from compromised student clicks versus module awareness test pass rates.
          </p>
        </div>

        {/* Heuristic Formula Rules explanation */}
        <div className="lg:col-span-5 glass-panel border-cyan-500/10 p-5 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Scoring Heuristics Formula</h3>
          
          <div className="space-y-2 text-[10px] border-b border-slate-900 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">1. Click Phishing simulated link</span>
              <span className="text-red-400 font-bold font-sans">+40 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">2. Ignore / Report simulation email</span>
              <span className="text-emerald-400 font-bold font-sans">-10 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3. Finish Security awareness training</span>
              <span className="text-emerald-400 font-bold font-sans">-20 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">4. Complete evaluation quiz (Score &gt;= 80%)</span>
              <span className="text-emerald-400 font-bold font-sans">-30 pts</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[9px] text-slate-500 uppercase font-bold">Category Ranges:</div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px]">AWARE: &lt;10 pts</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px]">LOW RISK: 10 - 45 pts</span>
              <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[9px]">HIGH RISK: &gt;=50 pts</span>
            </div>
          </div>
        </div>

        {/* Dynamic risk distribution quick togglers */}
        <div className="lg:col-span-3 glass-panel border-cyan-500/10 p-5 rounded-xl flex flex-col justify-between">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Group Toggles</h3>
          
          <div className="space-y-2">
            {[
              { id: 'ALL', name: 'Global Roster', count: stats.totalUsers, border: 'border-slate-800 text-slate-300 hover:border-slate-700' },
              { id: 'AWARE', name: 'Aware Profiles', count: stats.awareUsers, border: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10' },
              { id: 'LOW RISK', name: 'Low Risk Profiles', count: stats.lowRiskUsers, border: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10' },
              { id: 'HIGH RISK', name: 'High Risk Profiles', count: stats.highRiskUsers, border: 'border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 animate-pulse' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveRiskLevel(btn.id)}
                className={`w-full p-2.5 rounded border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeRiskLevel === btn.id 
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 font-bold shadow-glow-primary' 
                    : btn.border
                }`}
              >
                <span>{btn.name}</span>
                <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded font-bold">{btn.count}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* DETAILED STATS CORRELATION ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "compromised clicks", val: `${getPercentage(totalClickers, stats.totalUsers)}%`, detail: `${totalClickers} total clicked users`, icon: <MousePointer size={16} />, color: "text-red-400" },
          { label: "remediation rates", val: `${trainingRatio}%`, detail: `${trainingFinished} clicked completed training`, icon: <Clock size={16} />, color: "text-purple-400" },
          { label: "average quiz grades", val: `${avgQuizScore}%`, detail: "evaluated knowledge rating", icon: <Award size={16} />, color: "text-emerald-400" },
          { label: "total active targets", val: stats.totalUsers, detail: "current system student pool", icon: <Users size={16} />, color: "text-cyan-400" }
        ].map((c, idx) => (
          <div key={idx} className="glass-panel p-4 border-slate-850 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 block uppercase">{c.label}</span>
              <span className="text-xl font-extrabold text-white block">{c.val}</span>
              <span className="text-[9px] text-slate-400 block font-sans">{c.detail}</span>
            </div>
            <div className={`p-2 bg-slate-900 border border-slate-800 rounded-md ${c.color}`}>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      {/* FILTERED USERS TABLE */}
      <div className="glass-panel border-cyan-500/10 rounded-xl overflow-hidden shadow-cyber-inset">
        <div className="p-3 bg-slate-900/60 border-b border-slate-900 font-bold text-slate-300 uppercase text-[10px]">
          Target Directory risk categorization List - FILTER: {activeRiskLevel}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-950 text-slate-500 uppercase text-[9px] border-b border-slate-900">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3 text-center">Simulations Clicked</th>
                <th className="p-3 text-center">Training Status</th>
                <th className="p-3 text-center">Quiz Grade</th>
                <th className="p-3">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 bg-slate-950/20">
              {filteredStudents.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-900/20">
                  <td className="p-3 font-sans font-bold text-slate-200">{s.name}</td>
                  <td className="p-3 text-slate-400">{s.email}</td>
                  <td className="p-3 text-center text-red-400 font-bold">
                    {s.clickedSimulations?.length || 0}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] ${
                      s.trainingCompleted 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : s.clickedSimulations?.length > 0 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse' 
                        : 'bg-slate-900 text-slate-600'
                    }`}>
                      {s.trainingCompleted ? 'Completed' : s.clickedSimulations?.length > 0 ? 'Pending' : 'No Actions'}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-slate-200">
                    {s.quizScore > 0 ? `${s.quizScore}%` : 'N/A'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getRiskColor(s.riskLevel)}`}>
                      {s.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
