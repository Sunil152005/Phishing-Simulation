import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, Brain, AlertCircle, Clock, Shield } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    q: "What is the primary objective of a phishing attack?",
    options: [
      "To inspect local database systems for software performance",
      "To manipulate victims into revealing confidential credentials or run malware",
      "To encrypt local hard drives for Bitcoin ransomware collection",
      "To intercept WiFi packets at airport hotspots"
    ],
    correct: 1
  },
  {
    id: 2,
    q: "If an email display name says 'Dean of CS' but the address header is 'dean-update@secure-verify.net', this is an indicator of:",
    options: [
      "Secure sub-domain delegation",
      "SMTP Header Spoofing",
      "Automatic email synchronization",
      "SSL Certificate authorization"
    ],
    correct: 1
  },
  {
    id: 3,
    q: "Hovering your mouse cursor over a hyperlink in a message is crucial because:",
    options: [
      "It tests the responsiveness of your local browser cache",
      "It reveals the true destination URL before clicking",
      "It automatically runs a local security antivirus scan",
      "It disables javascript payloads inside link anchors"
    ],
    correct: 1
  },
  {
    id: 4,
    q: "You receive an email attachment named 'semester_grades.xlsx.exe'. What danger does this present?",
    options: [
      "It is an encrypted spreadsheet requiring MS Excel",
      "It is an executable script that installs malware/spyware when run",
      "It is a corrupted document template that needs re-sending",
      "It is an official compressed file for college databases"
    ],
    correct: 1
  },
  {
    id: 5,
    q: "What is the correct protocol when you identify a suspicious phishing message in your campus inbox?",
    options: [
      "Forward the email immediately to all your classmates to warn them",
      "Delete the email and ignore it, as it cannot harm you anymore",
      "Report the message to the college IT security helpdesk for domain blocking",
      "Reply directly to the sender demanding they remove you from their directory"
    ],
    correct: 2
  },
  {
    id: 6,
    q: "Phishing emails often employ artificial urgency (e.g. 'Sync in 24h or account is deleted') to:",
    options: [
      "Ensure fast internet server packet delivery times",
      "Bypass critical reasoning and force hasty click interactions",
      "Sync database directories before network midnight backups",
      "Authorize security keys before they expire naturally"
    ],
    correct: 1
  },
  {
    id: 7,
    q: "Does the prefix 'https://' and a padlock symbol guarantee a website is 100% safe and genuine?",
    options: [
      "Yes, padlocks prove the site is certified secure by national intelligence agencies",
      "No, it only means traffic is encrypted. Attackers can install SSL certificates on fake sites too",
      "Yes, browsers block padlocks on spoofed look-alike domains",
      "No, padlocks only work on campus intranet portals"
    ],
    correct: 1
  },
  {
    id: 8,
    q: "What distinguishes 'Spear Phishing' from regular phishing attacks?",
    options: [
      "It targets mobile device applications exclusively via SMS",
      "It targets specific organizations or selected individuals with personalized bait",
      "It involves deploying physical hardware devices to intercept data",
      "It bypasses all antivirus firewalls using custom zero-day exploits"
    ],
    correct: 1
  },
  {
    id: 9,
    q: "Smishing is a cybersecurity term describing which type of attack vector?",
    options: [
      "Phishing attacks deployed through mobile SMS text messaging",
      "Keylogging scripts installed on smartwatches",
      "Fake WiFi routers cloning campus hotspots",
      "Spam emails containing macro-based PowerPoint slide attachments"
    ],
    correct: 0
  },
  {
    id: 10,
    q: "Why is forwarding a phishing email directly to a friend dangerous?",
    options: [
      "It violates campus mail server storage size quotas",
      "It duplicates database keys and logs errors in systems",
      "It propagates the risk of compromise to your friend if they click the link",
      "It changes the SMTP sender header parameters permanently"
    ],
    correct: 2
  }
];

export default function QuizPage({ setView, saveQuizResults }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleNext = () => {
    if (selectedOpt === null) return;

    // Check correction
    const isCorrect = selectedOpt === QUIZ_QUESTIONS[currentIdx].correct;
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      // Finished!
      const finalScore = Math.round(((correctAnswersCount + (isCorrect ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);
      const timeElapsedString = formatTime(seconds);
      
      saveQuizResults(finalScore, timeElapsedString);
      setView('quiz-result');
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const qProgress = Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in font-mono text-xs">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="text-cyan-400 animate-pulse" size={20} />
          <div>
            <h1 className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Cybersecurity Awareness Quiz
            </h1>
            <p className="text-[10px] text-slate-500 uppercase mt-0.5">COMPREHENSION EVALUATION UNIT</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded">
          <Clock size={12} className="text-cyan-400" />
          <span>{formatTime(seconds)}</span>
        </div>
      </div>

      {/* Progress metrics */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
          <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
          <span>{qProgress}% Complete</span>
        </div>
        <div className="w-full bg-slate-950 h-1.5 rounded-full border border-slate-900 overflow-hidden">
          <div 
            className="bg-cyan-500 h-full transition-all duration-300 shadow-glow-primary"
            style={{ width: `${qProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel border-cyan-500/15 p-6 rounded-xl relative overflow-hidden space-y-6">
        <div className="scan-line"></div>

        {/* The Question */}
        <h2 className="text-sm font-bold font-sans text-slate-100 leading-normal flex gap-2.5 items-start">
          <HelpCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" />
          <span>{currentQ.q}</span>
        </h2>

        {/* Options list */}
        <div className="space-y-3 font-sans text-xs">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedOpt(idx)}
                className={`w-full p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex gap-3.5 items-center ${
                  isSelected 
                    ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-200 shadow-cyber-inset' 
                    : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:border-slate-800 hover:bg-slate-900/10'
                }`}
              >
                {/* Node check indicator */}
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 font-mono text-[9px] font-bold ${
                  isSelected ? 'border-cyan-400 text-cyan-400 bg-cyan-950' : 'border-slate-800 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-end border-t border-slate-900 pt-4 mt-6">
          <button
            onClick={handleNext}
            disabled={selectedOpt === null}
            className={`px-5 py-2.5 font-mono font-bold text-xs rounded flex items-center gap-1.5 shadow-glow-primary transform active:scale-95 transition-all cursor-pointer ${
              selectedOpt === null 
                ? 'bg-slate-900 border border-slate-850 text-slate-600 cursor-not-allowed shadow-none' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
            }`}
          >
            {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'FINISH QUIZ' : 'SUBMIT ANSWER'} <ArrowRight size={12} />
          </button>
        </div>
      </div>

    </div>
  );
}
