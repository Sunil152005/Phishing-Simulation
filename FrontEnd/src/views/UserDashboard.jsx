import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Award, Clock, ArrowRight, BookOpen, Brain, Bell } from 'lucide-react';
import Shield3D from '../components/Shield3D';

export default function UserDashboard({ student, setView }) {
  
  // Badges lists based on user completions
  const badges = [
    { name: "Zero-Click Champion", desc: "Successfully identified and ignored simulated phishing bait.", active: student.clickedSimulations?.length === 0, icon: <Shield className="text-emerald-400" size={18} /> },
    { name: "Certified Aware", desc: "Scored 80% or higher in the Phishing Awareness Quiz.", active: student.quizScore >= 80, icon: <Award className="text-cyan-400" size={18} /> },
    { name: "Remediation Complete", desc: "Finished training after a click compromise.", active: student.trainingCompleted, icon: <BookOpen className="text-purple-400" size={18} /> }
  ];

  const getRiskColor = (lvl) => {
    if (lvl === 'HIGH RISK') return 'text-red-400 border-red-500/20 bg-red-500/5 shadow-glow-danger';
    if (lvl === 'LOW RISK') return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
    return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-glow-accent';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in text-xs font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Student Portal Cockpit
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">Aegis Awareness & Remediation Center</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView('student-email-inbox')}
            className="px-4 py-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 transition-all flex items-center gap-2 cursor-pointer relative"
          >
            <Bell size={14} className="animate-bounce" />
            <span>Simulation Inbox</span>
            {student.openedSimulations?.length === 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            )}
          </button>

          <button 
            onClick={() => setView('landing')}
            className="px-4 py-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* THREE-D SHIELD & PRIMARY STATS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left 3D Shield */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-spot-cyan pointer-events-none rounded-full blur-3xl opacity-20"></div>
          <Shield3D size={260} />
          
          <div className="text-center mt-2 space-y-1 z-10">
            <span className="text-[10px] text-slate-500 uppercase">Interactive Shield Matrix</span>
            <span className="text-xs text-cyan-400 block font-bold">NODE STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Right Stats Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Awareness Score Card */}
            <div className="glass-panel border-cyan-500/15 p-5 rounded-xl space-y-2">
              <span className="text-[10px] text-slate-500 block uppercase">Cybersecurity Awareness Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white text-glow-cyan">
                  {student.quizScore > 0 ? student.quizScore : 60}%
                </span>
                <span className="text-[10px] text-slate-400">evaluated rating</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Computed from safety quizzes and successful recognition of mock phishing emails.
              </p>
            </div>

            {/* Risk Category Card */}
            <div className={`glass-panel p-5 rounded-xl border space-y-2 ${getRiskColor(student.riskLevel)}`}>
              <span className="text-[10px] text-slate-500 block uppercase">Student Risk Profile</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-wider">{student.riskLevel}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Low Risk profiles indicate complete training logs and high comprehension grades.
              </p>
            </div>

          </div>

          {/* Action Links */}
          <div className="glass-panel border-slate-800 p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-cyan-400 uppercase">Training Remediations</h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300 font-sans text-xs">
              <div className="space-y-1">
                <p className="font-bold text-slate-200">Interactive Phishing Awareness Course</p>
                <p className="text-[10px] text-slate-500 font-mono">STATUS: {student.trainingCompleted ? 'COMPLETED (100%)' : 'PENDING ACTION'}</p>
              </div>
              
              <button
                onClick={() => setView('awareness-training')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs rounded flex items-center gap-1.5 cursor-pointer shadow-glow-secondary transform active:scale-95 transition-all shrink-0"
              >
                {student.trainingCompleted ? 'Review Modules' : 'Start Course'} <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ACHIEVEMENTS / BADGES CARD */}
      <div className="glass-panel border-slate-800 p-6 rounded-xl space-y-4">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Acquired Safety Achievements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          {badges.map((b, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex flex-col justify-between h-32 transition-all ${
                b.active 
                  ? 'glass-panel border-cyan-500/25 text-slate-200 shadow-cyber-inset' 
                  : 'border-slate-900 bg-slate-950/20 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 bg-slate-900/60 rounded border ${b.active ? 'border-cyan-500/20' : 'border-slate-850'}`}>
                  {b.icon}
                </div>
                {b.active ? (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">UNLOCKED</span>
                ) : (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-700">LOCKED</span>
                )}
              </div>
              <div>
                <h4 className={`font-bold mt-3 ${b.active ? 'text-slate-200' : 'text-slate-600'}`}>{b.name}</h4>
                <p className="text-[10px] text-slate-500 leading-normal mt-1">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUIZ LOG HISTORY */}
      <div className="glass-panel border-slate-850 rounded-xl overflow-hidden shadow-cyber-inset">
        <div className="p-3 bg-slate-900 border-b border-slate-900 font-bold text-slate-300 uppercase text-[10px]">
          Knowledge Assessments log
        </div>
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-950 text-slate-500 uppercase text-[9px] border-b border-slate-900">
            <tr>
              <th className="p-3">Topic</th>
              <th className="p-3">Score</th>
              <th className="p-3">Time Limit</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 bg-slate-950/20">
            <tr>
              <td className="p-3 text-slate-200 font-bold font-sans">General Phishing Defense Test</td>
              <td className="p-3 font-bold font-mono text-emerald-400">
                {student.quizScore > 0 ? `${student.quizScore}%` : 'N/A'}
              </td>
              <td className="p-3 text-slate-400 font-mono">{student.quizTime || 'N/A'}</td>
              <td className="p-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                  student.quizScore >= 80 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : student.quizScore > 0 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-slate-900 text-slate-600'
                }`}>
                  {student.quizScore >= 80 ? 'PASSED' : student.quizScore > 0 ? 'FAIL (RE-TAKE)' : 'UNATTENDED'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
