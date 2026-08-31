import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, Eye, EyeOff, Loader, Terminal } from 'lucide-react';

export default function AdminLogin({ setView }) {
  const [email, setEmail] = useState('admin@cyber.local');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logMessages, setLogMessages] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (email !== 'admin@cyber.local' || password !== 'admin123') {
      setError('Invalid simulation credentials. Try admin@cyber.local / admin123');
      return;
    }

    // Interactive decrypter loading animation
    setLoading(true);
    const logs = [
      'ESTABLISHING SECURE CONNECTION...',
      'ENCRYPTING HANDSHAKE SHA-256...',
      'VERIFYING CREDENTIAL SIGNATURE...',
      'PARSING ACCESS TOKENS...',
      'DECRYPTING CREDENTIALS...',
      'ACCESS GRANTED. REDIRECTING...'
    ];

    logs.forEach((msg, idx) => {
      setTimeout(() => {
        setLogMessages(prev => [...prev, msg]);
        if (idx === logs.length - 1) {
          setTimeout(() => {
            setView('admin-dashboard');
          }, 600);
        }
      }, (idx + 1) * 400);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="w-full max-w-md glass-panel rounded-2xl border-cyan-500/20 p-8 shadow-glow-primary relative overflow-hidden"
      >
        {/* Scan line effect inside card */}
        <div className="scan-line"></div>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-full text-cyan-400 shadow-glow-primary animate-pulse-slow">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-bold font-sans tracking-wide">Aegis Console</h2>
          <p className="text-xs text-slate-400 font-mono">ADMINISTRATOR DECRYPT GATEWAY</p>
        </div>

        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-5"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Error box */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded font-mono animate-shake">
                  ⚠ {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">Admin Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">Secure Token / Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-glow-primary hover:shadow-glow-secondary transform active:scale-95 transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
              >
                Login as Admin
              </button>

              {/* Help hint */}
              <div className="text-center text-[10px] font-mono text-slate-500">
                Credentials pre-filled for college evaluation.
              </div>
            </motion.form>
          ) : (
            // Cyber Decryption Output
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-slate-950 border border-cyan-500/10 rounded-lg font-mono text-[10px] text-cyan-400/90 space-y-1 min-h-[140px] max-h-[140px] overflow-y-auto">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold border-b border-cyan-500/10 pb-1 mb-2">
                  <Terminal size={12} className="animate-pulse" />
                  SHELL_SESSION_LOGIN
                </div>
                {logMessages.map((msg, index) => (
                  <div key={index} className="flex gap-1.5 items-start">
                    <span className="text-purple-400">&gt;</span>
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center items-center py-2 gap-2 text-xs font-mono text-cyan-400">
                <Loader size={14} className="animate-spin" />
                <span>DECRYPTING AUTHORIZATION SHARES...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
