import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Lock, Sliders, RefreshCw, CheckCircle, Database, Bell } from 'lucide-react';

/**
 * SettingsPage Component
 * ----------------------
 * Provides centralized administration and configuration settings for the Aegis
 * Phishing Simulation & Security Rules Engine.
 * 
 * Includes:
 *  - HTTPS sandbox enforcement
 *  - Fake SSL Certificate padlock indicators
 *  - Automated remedial training enrollment for compromised users
 *  - Local simulation telemetry persistence
 *  - System data reset triggers
 */
export default function SettingsPage({ resetDemoData }) {
  const [forceHttps, setForceHttps] = useState(true);
  const [fakeSslWarnings, setFakeSslWarnings] = useState(true);
  const [autoRemediation, setAutoRemediation] = useState(true);
  const [emailSpoofStrictness, setEmailSpoofStrictness] = useState('High');
  const [showSaveNotice, setShowSaveNotice] = useState(false);

  const handleSave = () => {
    setShowSaveNotice(true);
    setTimeout(() => setShowSaveNotice(false), 3000);
  };

  return (
    <div className="space-y-6 font-mono text-xs animate-fade-in pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Settings & Security Rules
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">
            Aegis Phishing Platform Engine Configuration & Policies
          </p>
        </div>

        {showSaveNotice && (
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg flex items-center gap-1.5 text-xs">
            <CheckCircle size={14} /> Settings Saved
          </div>
        )}
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Security Rule Parameters Card */}
        <div className="lg:col-span-7 glass-panel border-slate-800 p-6 rounded-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="text-cyan-400" size={18} />
            <h2 className="text-sm font-bold text-slate-200 uppercase">Simulation Safety Protocols</h2>
          </div>

          <div className="space-y-4">
            
            {/* Rule 1 */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div>
                <p className="font-bold text-slate-200">Force HTTPS Encryption</p>
                <p className="text-[10px] text-slate-500">
                  Enforces SSL sandbox redirection on all generated mock phishing link targets.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={forceHttps} 
                onChange={(e) => setForceHttps(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-cyan-500" 
              />
            </div>

            {/* Rule 2 */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div>
                <p className="font-bold text-slate-200">Attach Fake SSL Warning Padlocks</p>
                <p className="text-[10px] text-slate-500">
                  Embed visual padlock indicators in SMS and email templates to test psychological trust heuristics.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={fakeSslWarnings} 
                onChange={(e) => setFakeSslWarnings(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-cyan-500" 
              />
            </div>

            {/* Rule 3 */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div>
                <p className="font-bold text-slate-200">Remedial Enrollment Auto-trigger</p>
                <p className="text-[10px] text-slate-500">
                  Automatically enroll compromised targets into mandatory awareness training slides upon link click.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={autoRemediation} 
                onChange={(e) => setAutoRemediation(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-cyan-500" 
              />
            </div>

            {/* Rule 4 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-200">Email Spoofing Header Strictness</p>
                <p className="text-[10px] text-slate-500">
                  Filter aggressiveness for simulated SMTP envelope header mismatches.
                </p>
              </div>
              <select 
                value={emailSpoofStrictness}
                onChange={(e) => setEmailSpoofStrictness(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="Low">Low (Permissive)</option>
                <option value="Medium">Medium (Realistic)</option>
                <option value="High">High (Strict)</option>
              </select>
            </div>

          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase rounded-lg shadow-glow-primary transition-all cursor-pointer text-xs"
            >
              Apply Changes
            </button>
          </div>
        </div>

        {/* System Memory & Environment Status Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Database className="text-purple-400" size={18} />
              <h2 className="text-sm font-bold text-slate-200 uppercase">Demo Memory Database</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Environment Mode</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
                  LOCAL_SANDBOX_ACTIVE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Zero-Exploit Guarantee</span>
                <span className="text-cyan-400 font-bold">100% Educational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Engine Version</span>
                <span className="text-slate-300">Aegis Core v2.4.0</span>
              </div>
            </div>

            {resetDemoData && (
              <div className="border-t border-slate-900 pt-4">
                <button
                  onClick={resetDemoData}
                  className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <RefreshCw size={13} /> Reset Simulation Memory
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
