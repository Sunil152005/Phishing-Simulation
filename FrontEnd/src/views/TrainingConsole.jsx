import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, CheckCircle, Award, Shield, ArrowRight, Play, Eye } from 'lucide-react';

/**
 * TrainingConsole Component
 * -------------------------
 * Admin perspective for monitoring employee/student remedial security training courses,
 * completion ratios, curriculum details, and module structures.
 */
export default function TrainingConsole({ stats, setView }) {
  const courses = [
    {
      id: 'course-1',
      name: 'Phishing Fundamentals & Social Engineering',
      modules: 6,
      duration: '15 mins',
      enrolled: stats.linksClicked || 48,
      completed: stats.trainingCompleted || 84,
      topics: [
        'What is Phishing & Social Engineering',
        'Recognizing Header Spoofing & Domain Anomalies',
        'Hovering & Analyzing Embedded Links',
        'Dangerous File Extensions (.exe, .scr, .vbs)',
        'Macro-Enabled Documents Danger',
        'Official Security Incident Reporting Protocols'
      ],
      difficulty: 'Beginner to Intermediate',
      category: 'Core Curriculum'
    },
    {
      id: 'course-2',
      name: 'Smishing & Mobile Vector Awareness',
      modules: 4,
      duration: '10 mins',
      enrolled: 35,
      completed: 28,
      topics: [
        'SMS spoofing tactics and fake delivery notices',
        'WhatsApp verification scams',
        'Mobile authentication security',
        'Reporting malicious numbers'
      ],
      difficulty: 'Intermediate',
      category: 'Mobile Security'
    },
    {
      id: 'course-3',
      name: 'Spear Phishing & CEO Fraud Defense',
      modules: 5,
      duration: '12 mins',
      enrolled: 22,
      completed: 19,
      topics: [
        'High-value target profiling',
        'Urgent invoice redirection scams',
        'Secondary verification protocols',
        'Defense against AI voice cloning'
      ],
      difficulty: 'Advanced',
      category: 'Executive Protection'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs animate-fade-in pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Training Courses Console
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">
            Remedial Course Assignments, Completion Metrics & Curriculum Overview
          </p>
        </div>

        {setView && (
          <button
            onClick={() => setView('awareness-training')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase rounded-lg shadow-glow-secondary flex items-center gap-2 cursor-pointer transition-all text-xs"
          >
            <Play size={13} /> Preview Training Player
          </button>
        )}
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel border-cyan-500/15 p-4 rounded-xl flex items-center justify-between shadow-cyber-inset">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Active Courses</span>
            <span className="text-2xl font-extrabold text-white">{courses.length}</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400">
            <BookOpen size={20} />
          </div>
        </div>

        <div className="glass-panel border-purple-500/15 p-4 rounded-xl flex items-center justify-between shadow-cyber-inset">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Total Passed Remediations</span>
            <span className="text-2xl font-extrabold text-purple-300">{stats.trainingCompleted}</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-purple-400">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="glass-panel border-emerald-500/15 p-4 rounded-xl flex items-center justify-between shadow-cyber-inset">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Total Click Remediation Rate</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              {stats.linksClicked ? Math.round((stats.trainingCompleted / stats.linksClicked) * 100) : 100}%
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          Available Awareness Curriculums
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {courses.map((c) => {
            const completionPct = c.enrolled ? Math.min(Math.round((c.completed / c.enrolled) * 100), 100) : 0;

            return (
              <div
                key={c.id}
                className="glass-panel border-slate-800 hover:border-slate-700 p-6 rounded-xl space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold uppercase">
                        {c.category}
                      </span>
                      <span className="text-slate-500 text-[10px]">• {c.duration}</span>
                      <span className="text-slate-500 text-[10px]">• {c.difficulty}</span>
                    </div>
                    <h3 className="text-base font-bold font-sans text-slate-100">{c.name}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Passed Rate</span>
                      <span className="text-base font-extrabold text-cyan-400">{c.completed} completed</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Remediation Enrollment Progress ({c.completed} / {c.enrolled} users)</span>
                    <span className="font-bold text-slate-200">{completionPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded shadow-glow-secondary" 
                      style={{ width: `${completionPct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Topics list pills */}
                <div className="pt-2 border-t border-slate-900">
                  <span className="text-[10px] text-slate-500 uppercase block mb-2 font-bold">
                    Curriculum Modules Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[10px] text-slate-300">
                    {c.topics.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-900/40 border border-slate-850 rounded">
                        <span className="w-4 h-4 rounded bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[9px] shrink-0">
                          {i + 1}
                        </span>
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
