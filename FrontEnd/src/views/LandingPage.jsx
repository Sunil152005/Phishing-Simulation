import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Mail, BookOpen, AlertTriangle, ChevronRight, Activity, Cpu } from 'lucide-react';
import ThreeDNetwork from '../components/ThreeDNetwork';

export default function LandingPage({ setView }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80 }
    }
  };

  const features = [
    {
      icon: <Mail className="text-cyan-400" size={24} />,
      title: "Phishing Simulation",
      desc: "Deploy highly realistic mock phishing emails, SMS, and WhatsApp alerts to test and evaluate employee vulnerabilities safely.",
      color: "border-cyan-500/20 shadow-glow-primary"
    },
    {
      icon: <Activity className="text-purple-400" size={24} />,
      title: "Behaviour Analysis",
      desc: "Track and log every interaction in real time: message opens, link clicks, credentials input, and time to fail/report.",
      color: "border-purple-500/20 shadow-glow-secondary"
    },
    {
      icon: <BookOpen className="text-emerald-400" size={24} />,
      title: "Awareness Training",
      desc: "Redirect compromised users instantly to bite-sized interactive training modules to reinforce critical email safety rules.",
      color: "border-emerald-500/20 shadow-glow-accent"
    },
    {
      icon: <AlertTriangle className="text-amber-400" size={24} />,
      title: "Risk Assessment",
      desc: "Run rule-based scoring models that evaluate students by combining link click counts, quiz scores, and training progress.",
      color: "border-amber-500/20"
    }
  ];

  return (
    <div className="relative w-full overflow-y-auto max-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Platform Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <Cpu size={12} className="animate-spin-slow" />
              CYBER SHIELD ACTIVE
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Phishing Simulation &{' '}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-glow-cyan">
                Cybersecurity Awareness
              </span>{' '}
              Platform
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 font-light">
              Simulate. Detect. Learn. Improve.<br/>
              Empower your students and administrators with an advanced, 3D interactive ecosystem to identify phishing attacks and secure organizational networks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setView('admin-login')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-glow-primary hover:shadow-glow-secondary transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
              >
                Admin Login
              </button>
              
              <button
                onClick={() => setView('student-dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 glass-panel border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-purple-200 uppercase tracking-wider rounded-lg shadow-cyber-inset hover:shadow-glow-secondary transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
              >
                User Login
              </button>
            </div>
          </motion.div>

          {/* Right 3D Visual Column */}
          <motion.div 
            className="lg:col-span-5 flex justify-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full max-w-[450px] aspect-square relative rounded-full bg-cyan-950/10 border border-cyan-500/10 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
              <ThreeDNetwork />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/40 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              How It Works
            </h2>
            <p className="text-sm text-slate-400">
              A comprehensive cycle of education that turns employees and students from the weakest link into human firewalls.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { step: "01", label: "Build Simulation", desc: "Admin selects channels (Email/SMS/WhatsApp) and builds realistic phishing messages." },
              { step: "02", label: "Deploy & Test", desc: "Platform delivers simulation templates to targets to observe real actions." },
              { step: "03", label: "Analyze Actions", desc: "Captures metrics on open rate, click rate, and device profiles." },
              { step: "04", label: "Train & Evaluate", desc: "Interactive modules and quizzes assess and correct student behavior patterns." }
            ].map((s, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="glass-panel border-cyan-500/10 p-6 rounded-xl relative group hover:border-cyan-500/30 transition-all shadow-cyber-inset"
              >
                <div className="font-mono text-4xl font-extrabold text-cyan-500/20 group-hover:text-cyan-400/20 transition-all absolute top-4 right-4">{s.step}</div>
                <h3 className="text-lg font-bold text-slate-200 mb-2 mt-4">{s.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Platform Features
            </h2>
            <p className="text-sm text-slate-400">
              Advanced administrative and educational modules engineered to address core cybersecurity issues.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`glass-panel border ${f.color} p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start transition-all hover:scale-[1.01]`}
              >
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  {f.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-200">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Banner / Security Footer */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950/80 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 Aegis Awareness Ecosystem. Authorized for College Engineering Demo. Zero malicious code active.</p>
      </footer>
    </div>
  );
}
