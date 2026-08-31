import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, ArrowRight, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';

export default function QuizResult({ student, setView }) {
  const score = student.quizScore || 0;
  const correctCount = Math.round((score / 100) * 10);
  const totalQuestions = 10;
  
  // Calculate dash offset for SVG circle
  // Radius is 50, circumference is 2 * PI * r = 314
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isPassed = score >= 80;

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 animate-fade-in font-mono text-xs text-center">
      
      {/* Icon header */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-sm mx-auto space-y-4">
        
        {isPassed ? (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-full text-emerald-400 w-fit mx-auto shadow-glow-accent animate-bounce">
            <ShieldCheck size={36} />
          </div>
        ) : (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/40 rounded-full text-yellow-400 w-fit mx-auto animate-pulse">
            <AlertTriangle size={36} />
          </div>
        )}

        <div>
          <h1 className="text-xl font-bold font-sans text-slate-100">
            {isPassed ? 'ASSESSMENT PASSED' : 'ASSESSMENT INCOMPLETE'}
          </h1>
          <p className="text-[9px] text-slate-500 uppercase mt-0.5">Comprehension scoring output</p>
        </div>

      </div>

      {/* CIRCULAR SCORE METER CARD */}
      <div className="glass-panel border-cyan-500/15 p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center space-y-4 shadow-glow-primary">
        <div className="scan-line"></div>

        {/* Circular SVG Progress */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="rgba(31, 41, 55, 0.5)"
              strokeWidth="8"
            />
            {/* Foreground circle */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={isPassed ? "#10b981" : "#eab308"}
              strokeWidth="8"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>

          {/* Core Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
            <span className="text-3xl font-extrabold text-white tracking-tight">{score}%</span>
            <span className="text-[9px] text-slate-500 uppercase">SCORE RESULT</span>
          </div>
        </div>

        {/* Stats details grid */}
        <div className="grid grid-cols-2 gap-4 w-full text-left pt-2 border-t border-slate-900/60">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">Correct Answers</span>
            <span className="text-sm font-bold text-slate-200">{correctCount} / {totalQuestions}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">Elapsed Time</span>
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1">
              <Clock size={12} className="text-cyan-400" />
              {student.quizTime || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">Training Logs</span>
            <span className="text-sm font-bold text-emerald-400">COMPLETED</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">Risk Assessment</span>
            <span className={`text-sm font-bold uppercase ${isPassed ? 'text-emerald-400' : 'text-yellow-400'}`}>
              {student.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Redirection CTA */}
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <button
          onClick={() => setView('student-dashboard')}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold uppercase rounded-lg shadow-glow-primary hover:shadow-glow-secondary flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95"
        >
          GO TO STUDENT DASHBOARD <ArrowRight size={14} />
        </button>

        {!isPassed && (
          <button
            onClick={() => setView('quiz')}
            className="w-full py-3 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RefreshCw size={12} /> RE-ATTEMPT QUIZ
          </button>
        )}
      </div>

    </div>
  );
}
