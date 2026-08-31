import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Shield, HelpCircle, ArrowRight, ArrowLeft, Brain, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export default function AwarenessTraining({ student, setView, completeTraining }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "1. What is Phishing?",
      subtitle: "THE FUNDAMENTAL CYBER VECTOR",
      content: "Phishing is a type of social engineering attack where malicious actors masquerade as trusted entities (like banks, professors, or IT helpdesks) to deceive victims into opening attachments, clicking malicious links, or volunteering passwords. It accounts for over 80% of reported security incidents globally.",
      tips: ["It relies on psychological manipulation, not technical exploits.", "Phishing attempts bypass traditional firewalls by targetting users directly."]
    },
    {
      title: "2. How Phishing Works",
      subtitle: "THE ATTACK RECON CYCLE",
      content: "Cyber adversaries follow a standard workflow: first, they research target directory emails. Next, they forge domain emails that resemble genuine institutions (Spoofing). Then, they send bait messages requesting urgent updates. If clicked, the victim lands on a fake login page that steals credentials.",
      tips: ["Attackers copy logo templates to replicate authentic email clients.", "Links redirect you to custom attacker domains instead of organization systems."]
    },
    {
      title: "3. Common Warning Signs",
      subtitle: "IDENTIFYING CRITICAL ANOMALIES",
      content: "Always check for discrepancies: (a) High Urgency commands (e.g. 'Sync now or account will be deleted in 24 hours'), (b) Spelling errors or awkward grammar, (c) General greetings like 'Dear User' instead of your specific name, and (d) Requests to override safety settings.",
      tips: ["Official administrators will never demand you share password tokens.", "Be suspicious of notifications sent during off-hours (e.g., 2:00 AM)."]
    },
    {
      title: "4. Suspicious Link Anatomy",
      subtitle: "INSPECTING REDIRECT URLS",
      content: "Hover your mouse cursor over any link before clicking. This reveals the actual target URL. Check the domain extension suffix. For example, a link claiming to point to `university.edu/login` might actually point to a spoofed link like `university-login.edu-verification.net/auth`.",
      tips: ["Look for spelling variations (e.g., microsofft.com instead of microsoft.com).", "Only use HTTPS, but remember attackers can install SSL certificates too."]
    },
    {
      title: "5. Attachment Safety",
      subtitle: "AVOIDING MALICIOUS EXECUTABLES",
      content: "Phishing emails frequently include files. Be highly suspicious of attachments, especially files claiming to be receipts or course lists. Look out for double extensions (like `assignment.pdf.exe` or `report.docx.scr`). If downloaded, these files run scripts that install malware/keyloggers.",
      tips: ["Never click 'Enable Macros' in downloaded Office spreadsheets.", "Verify attachments via alternative channels before opening them."]
    },
    {
      title: "6. How to Report Phishing",
      subtitle: "REINFORCING DEFENsIVE CYBER PROTOCOLS",
      content: "If you detect suspicious communications, never forward them to others (it risks spreading the infection). Instead, utilize your secure 'Report Phishing' client button or forward the message header details directly to `it-security@organization.edu`. Let the professionals inspect the headers.",
      tips: ["Reporting quickly alerts administrators to block the domain organization-wide.", "Deleting the email is good, but reporting is active protection."]
    }
  ];

  const progress = Math.round((activeSlide / (slides.length - 1)) * 100);

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(prev => prev + 1);
    } else {
      completeTraining(); // Set trainingCompleted in state
      setView('quiz'); // Transition to the Cyber Quiz
    }
  };

  const handlePrev = () => {
    setActiveSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in font-mono text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="text-purple-400" size={20} />
          <div>
            <h1 className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Awareness Training Module
            </h1>
            <p className="text-[10px] text-slate-500 uppercase mt-0.5">CYBER SECURITY AWARENESS PLAYER</p>
          </div>
        </div>
        
        <span className="text-slate-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded">
          PROGRESS: {progress}%
        </span>
      </div>

      {/* Progress Bar indicator */}
      <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-900 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-500 shadow-glow-secondary"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Active slide layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Topics menu list */}
        <div className="md:col-span-4 glass-panel border-slate-850 p-4 rounded-xl space-y-1.5 flex flex-col justify-center">
          <div className="text-[9px] text-slate-500 uppercase mb-2">COURSE STRUCTURE</div>
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-full py-2 px-3 rounded text-left transition-all flex items-center justify-between cursor-pointer ${
                activeSlide === idx 
                  ? 'bg-purple-500/10 border-l-2 border-purple-400 text-purple-300' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
              }`}
            >
              <span className="truncate">{s.title.substring(3)}</span>
              {activeSlide > idx && <CheckCircle2 size={12} className="text-emerald-400 shrink-0 ml-1.5" />}
            </button>
          ))}
        </div>

        {/* Right Active slide details */}
        <div className="md:col-span-8 glass-panel border-purple-500/15 p-6 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Scanline */}
          <div className="scan-line"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 flex-1"
            >
              <div>
                <span className="text-[9px] text-purple-400 font-bold block tracking-widest">{slides[activeSlide].subtitle}</span>
                <h2 className="text-base font-bold text-slate-100 font-sans mt-0.5">{slides[activeSlide].title}</h2>
              </div>

              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {slides[activeSlide].content}
              </p>

              {/* Tips cards list */}
              <div className="space-y-2 pt-3 border-t border-slate-900/60 font-sans text-[11px]">
                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">CRITICAL RULE CHECKS:</div>
                {slides[activeSlide].tips.map((t, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-slate-400">
                    <span className="text-purple-400 text-xs mt-0.5">▪</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation panel */}
          <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={activeSlide === 0}
              className={`px-3 py-1.5 rounded border flex items-center gap-1.5 transition-all text-[11px] ${
                activeSlide === 0 
                  ? 'border-slate-900 text-slate-700 cursor-not-allowed' 
                  : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 cursor-pointer'
              }`}
            >
              <ArrowLeft size={12} /> BACK
            </button>

            <button
              onClick={handleNext}
              className={`px-4 py-2 font-bold rounded flex items-center gap-1.5 transition-all text-[11px] cursor-pointer shadow-glow-secondary ${
                activeSlide === slides.length - 1 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-glow-accent' 
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {activeSlide === slides.length - 1 ? (
                <>
                  START ASSESSMENT <Play size={12} />
                </>
              ) : (
                <>
                  NEXT TOPIC <ArrowRight size={12} />
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
