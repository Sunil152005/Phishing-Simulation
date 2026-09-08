import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Shield, ShieldAlert, ShieldCheck, Info, Users, Clock, Award, MousePointer, Send, Filter, Sparkles } from 'lucide-react';

/**
 * RiskAnalysis Component
 * ----------------------
 * Security Heuristic Risk Engine for analyzing student vulnerability levels,
 * scoring models, click ratios, and remediation progress across departments.
 */
export default function RiskAnalysis({ students = [], stats = {}, triggerSingleTest }) {
  const [activeRiskLevel, setActiveRiskLevel] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Safe percentage helper function
  const getPercentage = (part = 0, total = 0) => {
    if (!total || total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  // Filter students based on risk category & department click
  const filteredStudents = students.filter((s) => {
    const matchesRisk = activeRiskLevel === 'ALL' || s.riskLevel === activeRiskLevel;
    const matchesDept = selectedDept === 'ALL' || s.department === selectedDept;
    return matchesRisk && matchesDept;
  });

  // Calculate average quiz score
  const quizScores = students.filter((s) => s.quizScore > 0).map((s) => s.quizScore);
  const avgQuizScore = quizScores.length
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  // Rule based scores calculations
  const totalClickers = students.filter((s) => s.clickedSimulations?.length > 0).length;
  const trainingFinished = students.filter((s) => s.trainingCompleted).length;
  const trainingRatio = totalClickers ? Math.round((trainingFinished / totalClickers) * 100) : 0;

  // Organisation risk percentage (average risk based on high/low ratio)
  const totalUsers = stats.totalUsers || students.length || 1;
  const highRiskUsers = stats.highRiskUsers || students.filter((s) => s.riskLevel === 'HIGH RISK').length || 0;
  const lowRiskUsers = stats.lowRiskUsers || students.filter((s) => s.riskLevel === 'LOW RISK').length || 0;
  const awareUsers = stats.awareUsers || students.filter((s) => s.riskLevel === 'AWARE').length || 0;

  const orgRiskIndex = Math.min(
    100,
    Math.round(((highRiskUsers * 100) + (lowRiskUsers * 35) + (awareUsers * 5)) / totalUsers)
  );

  const riskPieData = [
    { name: 'Aware (Secure)', value: awareUsers, color: '#10b981' },
    { name: 'Low Risk', value: lowRiskUsers, color: '#06b6d4' },
    { name: 'High Risk', value: highRiskUsers, color: '#ef4444' },
  ];

  // Helper colors for risk level badges
  const getRiskColor = (lvl) => {
    if (lvl === 'HIGH RISK') return 'text-red-400 border-red-500/20 bg-red-500/5 shadow-glow-danger';
    if (lvl === 'LOW RISK') return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
    return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-glow-accent';
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Risk Analysis Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">
            Heuristic Risk Assessment & Vulnerability Telemetry
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs">
          <Info size={14} className="shrink-0" />
          <span>HEURISTIC ENGINE v2.4 (ACTIVE)</span>
        </div>
      </div>

      {/* TOP ROW: METER & CHART & ENGINE RULES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk index meter */}
        <div className="lg:col-span-4 glass-panel border-cyan-500/15 p-5 rounded-xl flex flex-col justify-between items-center text-center shadow-cyber-inset">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 self-start">
            Organizational Risk Index
          </h3>
          
          <div className="relative flex flex-col items-center justify-center pt-4">
            {/* SVG Speedometer/Meter */}
            <svg className="w-44 h-24" viewBox="0 0 100 50">
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
                strokeDasharray={`${Math.max((orgRiskIndex / 100) * 125, 5)} 125`}
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
              <span className="text-[9px] text-slate-400 block uppercase font-bold">
                {orgRiskIndex > 60 ? '🔴 CRITICAL RISK' : orgRiskIndex > 30 ? '🟡 MODERATE RISK' : '🟢 SECURE STATUS'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-4">
            Aggregated organizational vulnerability score based on click rates vs. remedial assessment completions.
          </p>
        </div>

        {/* Heuristic Formula Rules explanation */}
        <div className="lg:col-span-5 glass-panel border-slate-800 p-5 rounded-xl space-y-4 shadow-cyber-inset">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Scoring Heuristics Formula
          </h3>
          
          <div className="space-y-2.5 text-[10px] border-b border-slate-900 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">1. Click Phishing simulated link</span>
              <span className="text-red-400 font-bold font-sans">+40 pts (Penalty)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">2. Ignore / Report simulation email</span>
              <span className="text-emerald-400 font-bold font-sans">-10 pts (Reward)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3. Finish Security awareness training</span>
              <span className="text-emerald-400 font-bold font-sans">-20 pts (Reward)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">4. Complete evaluation quiz (Score ≥ 80%)</span>
              <span className="text-emerald-400 font-bold font-sans">-30 pts (Reward)</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[9px] text-slate-500 uppercase font-bold">Risk Tier Boundaries:</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                AWARE: &lt;10 pts
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-bold">
                LOW RISK: 10 - 45 pts
              </span>
              <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold">
                HIGH RISK: ≥50 pts
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic risk distribution quick togglers */}
        <div className="lg:col-span-3 glass-panel border-slate-800 p-5 rounded-xl flex flex-col justify-between shadow-cyber-inset">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
            Roster Risk Filter
          </h3>
          
          <div className="space-y-2">
            {[
              { id: 'ALL', name: 'Global Roster', count: students.length, border: 'border-slate-800 text-slate-300 hover:border-slate-700' },
              { id: 'AWARE', name: 'Aware Profiles', count: awareUsers, border: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10' },
              { id: 'LOW RISK', name: 'Low Risk Profiles', count: lowRiskUsers, border: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10' },
              { id: 'HIGH RISK', name: 'High Risk Profiles', count: highRiskUsers, border: 'border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveRiskLevel(btn.id)}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeRiskLevel === btn.id 
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 font-bold shadow-glow-primary' 
                    : btn.border
                }`}
              >
                <span>{btn.name}</span>
                <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded font-bold text-[10px]">
                  {btn.count}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* DETAILED STATS CORRELATION ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: "Compromised Clicks", 
            val: `${getPercentage(totalClickers, totalUsers)}%`, 
            detail: `${totalClickers} total clicked targets`, 
            icon: <MousePointer size={16} />, 
            color: "text-red-400" 
          },
          { 
            label: "Remediation Rate", 
            val: `${trainingRatio}%`, 
            detail: `${trainingFinished} clicked completed training`, 
            icon: <Clock size={16} />, 
            color: "text-purple-400" 
          },
          { 
            label: "Average Quiz Score", 
            val: `${avgQuizScore}%`, 
            detail: "Evaluated comprehension rating", 
            icon: <Award size={16} />, 
            color: "text-emerald-400" 
          },
          { 
            label: "Target Student Pool", 
            val: totalUsers, 
            detail: "Current registered directory", 
            icon: <Users size={16} />, 
            color: "text-cyan-400" 
          }
        ].map((c, idx) => (
          <div key={idx} className="glass-panel p-4 border-slate-800 rounded-xl flex items-center justify-between shadow-cyber-inset">
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 block uppercase">{c.label}</span>
              <span className="text-xl font-extrabold text-white block">{c.val}</span>
              <span className="text-[9px] text-slate-400 block font-sans">{c.detail}</span>
            </div>
            <div className={`p-2 bg-slate-900 border border-slate-800 rounded-lg ${c.color}`}>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      {/* FILTERED USERS TABLE */}
      <div className="glass-panel border-cyan-500/10 rounded-xl overflow-hidden shadow-cyber-inset">
        <div className="p-3.5 bg-slate-900/80 border-b border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-bold text-slate-300 uppercase text-[10px]">
          <div>
            Target Directory Risk Roster — Filter: <span className="text-cyan-400">{activeRiskLevel}</span>
          </div>
          <div className="text-slate-500 font-normal">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-950 text-slate-500 uppercase text-[9px] border-b border-slate-900">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Department</th>
                <th className="p-3 text-center">Simulations Clicked</th>
                <th className="p-3 text-center">Training Status</th>
                <th className="p-3 text-center">Quiz Grade</th>
                <th className="p-3">Risk Assessment</th>
                {triggerSingleTest && <th className="p-3 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-950/20">
              {filteredStudents.map((s, idx) => (
                <tr key={s.id || idx} className="hover:bg-slate-900/20 transition-all">
                  <td className="p-3 font-sans font-bold text-slate-200">
                    <div>{s.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 font-normal">{s.email}</div>
                  </td>
                  <td className="p-3 text-slate-400">{s.department}</td>
                  <td className="p-3 text-center text-red-400 font-bold">
                    {s.clickedSimulations?.length || 0}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] ${
                      s.trainingCompleted 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : s.clickedSimulations?.length > 0 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
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
                  {triggerSingleTest && (
                    <td className="p-3 text-right">
                      <button
                        onClick={() => triggerSingleTest(s.id)}
                        className="px-2.5 py-1 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded text-[9px] font-bold cursor-pointer transition-all inline-flex items-center gap-1"
                        title="Deploy Simulation Bait to this Student"
                      >
                        <Send size={10} /> Test
                      </button>
                    </td>
                  )}
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={triggerSingleTest ? 7 : 6} className="p-8 text-center text-slate-500">
                    No matching student risk records found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
