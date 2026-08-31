import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldAlert, ArrowRight, AlertTriangle, AlertCircle, HelpCircle, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SimulationExperience({ 
  currentCampaign, 
  student, 
  registerClick, 
  setView 
}) {
  const [clicked, setClicked] = useState(false);

  // Fallback campaign if none is active (for demo HUD purposes)
  const activeCampaign = currentCampaign || {
    name: 'Office 365 Password Sync',
    channel: 'Email',
    subject: 'CRITICAL: Password Security Sync Required Immediately',
    message: 'A security review of your Office 365 student account indicates suspicious login attempts. To prevent suspension, you must synchronize your password profile immediately using the secure gateway link below.',
    link: 'https://security-verify.student-aegis.org/login',
    attachmentName: 'security_verification.pdf'
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setClicked(true);
    registerClick(); // Updates student risk profile and counts click in global state
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono text-xs">
      
      {!clicked ? (
        /* ================= MOCK EMAIL CLIENT / NOTIFICATION ================= */
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <div>
              <h1 className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                Mock Student Inbox
              </h1>
              <p className="text-[10px] text-slate-500 uppercase mt-0.5">Simulated Messaging Gateway</p>
            </div>
            
            <span className="px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 animate-pulse text-[10px]">
              📩 1 UNREAD SECURE ALERT
            </span>
          </div>

          {activeCampaign.channel === 'Email' ? (
            /* Standard Web Email UI */
            <div className="glass-panel border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[400px]">
              {/* Mail client Header */}
              <div className="bg-slate-900 px-4 py-2 text-[10px] text-slate-500 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
                </div>
                <span>Aegis SecureWeb Mailer v4.1</span>
              </div>

              {/* Sender Details */}
              <div className="p-4 bg-slate-950/80 border-b border-slate-900 text-xs space-y-1.5 font-sans">
                <div>
                  <span className="text-slate-500 font-mono text-[11px] uppercase mr-2">From:</span>
                  <span className="text-slate-300 font-bold">University Security HelpDesk</span>{' '}
                  <span className="text-rose-400 text-[10px] font-mono">&lt;admin-sync@aegis-portal.net&gt;</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[11px] uppercase mr-2">To:</span>
                  <span className="text-slate-300">{student.name} &lt;{student.email}&gt;</span>
                </div>
                <div className="pt-2 font-bold text-slate-200 border-t border-slate-900/50">
                  <span className="text-slate-500 font-mono text-[11px] font-normal uppercase mr-2">Subject:</span>
                  {activeCampaign.subject}
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 flex-1 bg-white text-slate-800 font-sans text-sm space-y-6 leading-relaxed">
                <p>Dear student,</p>
                <p>{activeCampaign.message}</p>

                {/* Simulated Link Button */}
                <div className="py-2">
                  <button
                    onClick={handleLinkClick}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-md transition-all inline-block cursor-pointer text-xs uppercase"
                  >
                    Synchronize Account Credentials
                  </button>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">
                    Official redirect domain: {activeCampaign.link}
                  </p>
                </div>

                {/* PDF Attachment mockup */}
                {activeCampaign.attachmentName && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <div className="flex items-center gap-1.5">
                      <FileText size={16} className="text-red-500" />
                      <span className="underline cursor-pointer hover:text-red-500">{activeCampaign.attachmentName}</span>
                    </div>
                    <span>(1.2 MB)</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Mobile Device mock layout for SMS/WhatsApp */
            <div className="flex justify-center">
              <div className="w-[300px] h-[480px] border-[8px] border-slate-800 rounded-[36px] bg-slate-950 relative overflow-hidden flex flex-col font-sans">
                {/* Speaker/Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-xl z-20"></div>
                
                {/* Signal/Time status bar */}
                <div className="bg-slate-900 border-b border-slate-850 px-4 pt-6 pb-2 text-[9px] text-slate-400 flex items-center justify-between font-mono">
                  <span>AegisNetwork</span>
                  <span>10:33 AM</span>
                </div>

                {/* Mobile screen chat client */}
                <div className="p-4 flex-1 flex flex-col justify-end space-y-4">
                  {activeCampaign.channel === 'SMS' ? (
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-bl-none text-xs text-slate-200 max-w-[90%] space-y-2 leading-relaxed">
                      <div className="font-bold text-purple-400 text-[10px] font-mono">{activeCampaign.subject}</div>
                      <p>{activeCampaign.message}</p>
                      <button 
                        onClick={handleLinkClick}
                        className="text-cyan-400 underline block font-mono break-all text-left text-[11px] cursor-pointer"
                      >
                        {activeCampaign.link}
                      </button>
                    </div>
                  ) : (
                    /* WhatsApp style bubble */
                    <div className="bg-emerald-950/40 border border-emerald-500/20 p-3 rounded-2xl rounded-bl-none text-xs text-slate-200 max-w-[95%] space-y-2 relative shadow-glow-accent">
                      <div className="text-[9px] text-emerald-400 font-bold font-mono uppercase tracking-wider">Aegis University Coordinator</div>
                      <p>{activeCampaign.message}</p>
                      <button
                        onClick={handleLinkClick}
                        className="w-full p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded flex items-center justify-between text-[10px] text-emerald-400 font-mono font-bold cursor-pointer text-left"
                      >
                        <span>🔗 Revised Timetable Portal</span>
                        <ChevronRight size={12} />
                      </button>
                      <div className="text-right text-[8px] text-slate-500 mt-1">10:33 AM ✓✓</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= AWARENESS ALERT LANDING PAGE ================= */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8 animate-fade-in text-center"
        >
          {/* Main Warning Banner */}
          <div className="glass-panel border-red-500/30 bg-red-950/20 p-8 rounded-2xl shadow-glow-danger space-y-4 max-w-2xl mx-auto relative overflow-hidden">
            <div className="scan-line"></div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-full text-red-500 w-fit mx-auto animate-pulse">
              <ShieldAlert size={48} />
            </div>

            <h1 className="text-3xl font-extrabold font-sans text-glow-red text-red-500">
              ⚠️ SECURITY ASSESSMENT ALERT
            </h1>
            
            <h2 className="text-md font-bold text-slate-200 uppercase tracking-wide font-mono">
              You clicked a simulated phishing link.
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-lg mx-auto">
              If this had been a real cyber attack, unauthorized adversaries could have compromised your computer, collected network login credentials, or deployed ransomware on the organization database.
            </p>
          </div>

          {/* Educational Bento grid */}
          <div className="space-y-4 max-w-2xl mx-auto text-left">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider text-center">HOW PHISHING WORKS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              
              <div className="glass-panel border-slate-800 p-4 rounded-xl space-y-2">
                <div className="p-2 bg-slate-900 border border-slate-850 rounded text-red-400 w-fit">
                  <AlertCircle size={16} />
                </div>
                <h4 className="font-bold text-slate-200">The Urgency Bait</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Attackers use high-stress prompts like "account suspension" or "revised schedule" to bypass critical reasoning.
                </p>
              </div>

              <div className="glass-panel border-slate-800 p-4 rounded-xl space-y-2">
                <div className="p-2 bg-slate-900 border border-slate-850 rounded text-purple-400 w-fit">
                  <AlertTriangle size={16} />
                </div>
                <h4 className="font-bold text-slate-200">Spoofed Headers</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Emails claim to be official but reveal mismatch domains in headers (e.g. `aegis-portal.net` instead of `university.edu`).
                </p>
              </div>

              <div className="glass-panel border-slate-800 p-4 rounded-xl space-y-2">
                <div className="p-2 bg-slate-900 border border-slate-850 rounded text-cyan-400 w-fit">
                  <HelpCircle size={16} />
                </div>
                <h4 className="font-bold text-slate-200">Lookalike Links</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Hovering over links reveals they point to unauthorized sandbox targets, not genuine campus domains.
                </p>
              </div>

            </div>
          </div>

          {/* Redirection CTA */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-[10px] text-slate-500">
              * This is a controlled educational simulation. No credentials were collected.
            </p>
            <button
              onClick={() => setView('awareness-training')}
              className="px-8 py-3.5 bg-gradient-to-r from-red-500 to-amber-600 hover:from-red-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-glow-danger transform hover:-translate-y-0.5 transition-all text-xs cursor-pointer flex items-center gap-2"
            >
              Start Awareness Training <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
