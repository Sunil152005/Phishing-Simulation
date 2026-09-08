import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Mail, User, Eye, EyeOff, ArrowRight, ArrowLeft, 
  Sparkles, CheckCircle, AlertCircle, Building2, Check
} from 'lucide-react';

/**
 * UserAuth Component
 * -------------------
 * Provides a dedicated, secure, and user-friendly portal for Student & Employee
 * Authentication (Login, Registration, and Google / LinkedIn Single Sign-On).
 * 
 * Features:
 *  - Tabbed switching between Login and Registration
 *  - Form validations with real-time feedback
 *  - Pre-configured Demo Profile quick-selector for effortless presentation / evaluation
 *  - Interactive Google and LinkedIn OAuth simulation flows
 *  - Automatic session initialization into Student Portal Cockpit
 */
export default function UserAuth({ setView, students = [], onLogin, onRegister }) {
  // Mode: 'login' | 'register'
  const [mode, setMode] = useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('vishal.sharma.cs22@university.edu');
  const [loginPassword, setLoginPassword] = useState('student123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDept, setRegDept] = useState('Computer Science');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Feedback and loading states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthProvider, setOauthProvider] = useState(null); // 'Google' | 'LinkedIn'

  // Departments list for registration dropdown
  const departments = [
    'Computer Science',
    'Information Technology',
    'Cyber Security & Forensics',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Data Science & AI',
    'Business Administration'
  ];

  // =========================================================================
  // HANDLERS
  // =========================================================================

  // Handle standard student credentials login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Please provide both student email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Find matching student or use first student as fallback
      const foundStudent = students.find(
        (s) => s.email.toLowerCase() === loginEmail.trim().toLowerCase()
      );

      if (foundStudent) {
        if (onLogin) onLogin(foundStudent);
        setView('student-dashboard');
      } else {
        // Create an active session with this email if valid format
        const dynamicStudent = {
          id: `stud-${Date.now()}`,
          name: loginEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          email: loginEmail,
          department: 'Computer Science',
          riskLevel: 'LOW RISK',
          quizScore: 0,
          quizTime: '',
          trainingCompleted: false,
          openedSimulations: [],
          clickedSimulations: []
        };
        if (onLogin) onLogin(dynamicStudent);
        setView('student-dashboard');
      }
      setLoading(false);
    }, 600);
  };

  // Handle new student registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!regName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setError('Please enter a valid academic/organizational email address.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    // Check if email already registered
    const existing = students.find(
      (s) => s.email.toLowerCase() === regEmail.trim().toLowerCase()
    );
    if (existing) {
      setError('An account with this email address already exists. Please log in.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newStudentObj = {
        id: `stud-${Date.now()}`,
        name: regName.trim(),
        email: regEmail.trim(),
        department: regDept,
        riskLevel: 'AWARE',
        quizScore: 0,
        quizTime: '',
        trainingCompleted: false,
        openedSimulations: [],
        clickedSimulations: []
      };

      if (onRegister) {
        onRegister(newStudentObj);
      } else if (onLogin) {
        onLogin(newStudentObj);
      }

      setLoading(false);
      setView('student-dashboard');
    }, 800);
  };

  // Handle Social OAuth simulation (Google / LinkedIn)
  const handleSocialAuth = (provider) => {
    setError('');
    setOauthProvider(provider);

    setTimeout(() => {
      const emailDomain = provider === 'Google' ? '@gmail.com' : '@linkedin.user';
      const studentName = provider === 'Google' ? 'Alex Rivera (Google SSO)' : 'Jordan Lee (LinkedIn SSO)';
      const socialEmail = `${studentName.toLowerCase().split(' ')[0]}.${Date.now().toString().slice(-4)}${emailDomain}`;

      const socialStudent = {
        id: `stud-social-${Date.now()}`,
        name: studentName,
        email: socialEmail,
        department: 'Cyber Security & Forensics',
        riskLevel: 'AWARE',
        quizScore: 85,
        quizTime: '2m 10s',
        trainingCompleted: true,
        openedSimulations: [],
        clickedSimulations: []
      };

      if (onLogin) onLogin(socialStudent);
      setOauthProvider(null);
      setView('student-dashboard');
    }, 1200);
  };

  // Quick switch profile for evaluator convenience
  const selectDemoStudent = (stud) => {
    setLoginEmail(stud.email);
    setLoginPassword('student123');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans relative">
      
      {/* Back to Home Button */}
      <button
        onClick={() => setView('landing')}
        className="fixed top-6 left-6 z-30 px-3.5 py-2 glass-panel border-cyan-500/20 hover:border-cyan-400 text-cyan-300 hover:text-white rounded-lg font-mono text-xs flex items-center gap-2 transition-all cursor-pointer shadow-cyber-inset"
      >
        <ArrowLeft size={14} /> Back to Home
      </button>

      {/* Main Authentication Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="w-full max-w-xl glass-panel rounded-2xl border-cyan-500/25 p-6 sm:p-8 shadow-glow-primary relative overflow-hidden my-12"
      >
        {/* Subtle Cyber Scan Line */}
        <div className="scan-line pointer-events-none"></div>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-2xl text-cyan-400 shadow-glow-primary animate-pulse-slow">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Student & User Portal
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            AEGIS CYBERSECURITY AWARENESS & SIMULATION ACCESS
          </p>
        </div>

        {/* Tab Switcher: Login vs Registration */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/80 border border-slate-800 rounded-xl mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`py-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-primary'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User size={13} /> User Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`py-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-glow-secondary'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={13} /> New Registration
          </button>
        </div>

        {/* Social Authentication Buttons (Google & LinkedIn) */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Sign in with Google Button */}
            <button
              type="button"
              onClick={() => handleSocialAuth('Google')}
              disabled={loading || oauthProvider !== null}
              className="w-full py-2.5 px-4 bg-slate-900/90 hover:bg-slate-850 border border-slate-750 hover:border-slate-600 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition-all shadow-cyber-inset hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {oauthProvider === 'Google' ? (
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
              )}
              <span>{mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
            </button>

            {/* Sign in with LinkedIn Button */}
            <button
              type="button"
              onClick={() => handleSocialAuth('LinkedIn')}
              disabled={loading || oauthProvider !== null}
              className="w-full py-2.5 px-4 bg-slate-900/90 hover:bg-slate-850 border border-slate-750 hover:border-slate-600 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition-all shadow-cyber-inset hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {oauthProvider === 'LinkedIn' ? (
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 fill-[#0A66C2] shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              )}
              <span>{mode === 'login' ? 'Sign in with LinkedIn' : 'Sign up with LinkedIn'}</span>
            </button>

          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="w-full border-t border-slate-800"></div>
            <span className="absolute px-3 bg-slate-900 text-[10px] text-slate-500 uppercase font-mono tracking-wider">
              Or with credentials
            </span>
          </div>
        </div>

        {/* Error Feedback Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg font-mono flex items-center gap-2"
          >
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* FORM SECTION */}
        <AnimatePresence mode="wait">
          
          {/* ============================================================= */}
          {/* 1. LOGIN FORM */}
          {/* ============================================================= */}
          {mode === 'login' && (
            <motion.form
              key="login-form"
              onSubmit={handleLoginSubmit}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  Student / Employee Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="student.name@university.edu"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    Password
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Default: student123</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Quick Select Demo Profile Picker */}
              <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="uppercase font-bold text-cyan-400">Quick-Select Demo Profile:</span>
                  <span>(1-Click Load)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-[10px]">
                  {students.slice(0, 6).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => selectDemoStudent(s)}
                      className={`p-1.5 rounded text-left truncate border transition-all cursor-pointer ${
                        loginEmail === s.email
                          ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 font-bold'
                          : 'border-slate-850 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                      }`}
                    >
                      <div className="truncate font-bold">{s.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-slate-500 truncate">{s.riskLevel}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-glow-primary hover:shadow-glow-secondary transform active:scale-98 transition-all text-xs cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Login to Student Portal</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              {/* Toggle to register */}
              <div className="text-center pt-2 text-xs text-slate-400">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError('');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer ml-1"
                >
                  Register Here
                </button>
              </div>
            </motion.form>
          )}

          {/* ============================================================= */}
          {/* 2. REGISTRATION FORM */}
          {/* ============================================================= */}
          {mode === 'register' && (
            <motion.form
              key="register-form"
              onSubmit={handleRegisterSubmit}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono transition-all"
                  />
                </div>
              </div>

              {/* Email and Department in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Academic Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                    Student Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@university.edu"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono transition-all"
                    />
                  </div>
                </div>

                {/* Department Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                    Department
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Building2 size={16} />
                    </span>
                    <select
                      value={regDept}
                      onChange={(e) => setRegDept(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono transition-all"
                    >
                      {departments.map((d, idx) => (
                        <option key={idx} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Passwords (Password & Confirm Password) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Show Password Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="showRegPass"
                  checked={showRegPassword}
                  onChange={(e) => setShowRegPassword(e.target.checked)}
                  className="w-3.5 h-3.5 accent-purple-500 cursor-pointer"
                />
                <label htmlFor="showRegPass" className="text-[11px] text-slate-400 font-mono cursor-pointer">
                  Show passwords
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold uppercase tracking-wider rounded-lg shadow-glow-secondary hover:shadow-glow-primary transform active:scale-98 transition-all text-xs cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Check size={14} />
                    <span>Create Student Account</span>
                  </>
                )}
              </button>

              {/* Toggle to login */}
              <div className="text-center pt-2 text-xs text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-purple-400 hover:text-purple-300 font-bold underline cursor-pointer ml-1"
                >
                  Login Instead
                </button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>

      </motion.div>
    </div>
  );
}
