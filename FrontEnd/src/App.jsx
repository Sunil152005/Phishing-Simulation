import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Base Components
import CyberGrid from './components/CyberGrid';
import DemoController from './components/DemoController';

// Perspectives & Pages
import LandingPage from './views/LandingPage';
import AdminLogin from './views/AdminLogin';
import AdminDashboard from './views/AdminDashboard';
import CreateSimulation from './views/CreateSimulation';
import CampaignPage from './views/CampaignPage';
import UserBehaviour from './views/UserBehaviour';
import SimulationExperience from './views/SimulationExperience';
import AwarenessTraining from './views/AwarenessTraining';
import QuizPage from './views/QuizPage';
import QuizResult from './views/QuizResult';
import RiskAnalysis from './views/RiskAnalysis';
import ReportsPage from './views/ReportsPage';
import UserDashboard from './views/UserDashboard';

// Lucide Icons for fallback layouts
import { BookOpen, CheckCircle, Settings, ShieldAlert, Award } from 'lucide-react';

const INITIAL_STUDENTS = [
  { id: 'stud-1', name: 'Vishal Sharma', email: 'vishal.sharma.cs22@university.edu', department: 'Computer Science', riskLevel: 'HIGH RISK', quizScore: 0, quizTime: '', trainingCompleted: false, openedSimulations: [], clickedSimulations: [] },
  { id: 'stud-2', name: 'Emily Watson', email: 'emily.watson.it23@university.edu', department: 'Information Technology', riskLevel: 'LOW RISK', quizScore: 70, quizTime: '4m 12s', trainingCompleted: true, openedSimulations: ['Library Overdue Fine Alert'], clickedSimulations: ['Library Overdue Fine Alert'] },
  { id: 'stud-3', name: 'James Smith', email: 'james.smith.ee22@university.edu', department: 'Electronics', riskLevel: 'AWARE', quizScore: 90, quizTime: '2m 45s', trainingCompleted: true, openedSimulations: ['Office 365 Account Expiry'], clickedSimulations: [] },
  { id: 'stud-4', name: 'Sofia Rodriguez', email: 'sofia.rod.cs23@university.edu', department: 'Computer Science', riskLevel: 'HIGH RISK', quizScore: 0, quizTime: '', trainingCompleted: false, openedSimulations: ['Office 365 Account Expiry'], clickedSimulations: ['Office 365 Account Expiry'] },
  { id: 'stud-5', name: 'Arthur Dent', email: 'arthur.dent.me22@university.edu', department: 'Mechanical', riskLevel: 'LOW RISK', quizScore: 80, quizTime: '3m 50s', trainingCompleted: true, openedSimulations: ['Exam Schedule Change urgent'], clickedSimulations: ['Exam Schedule Change urgent'] },
  { id: 'stud-6', name: 'Keanu Reeves', email: 'keanu.r.cs22@university.edu', department: 'Computer Science', riskLevel: 'AWARE', quizScore: 100, quizTime: '1m 55s', trainingCompleted: true, openedSimulations: [], clickedSimulations: [] }
];

const INITIAL_CAMPAIGNS = [
  { name: 'Office 365 Account Expiry', channel: 'Email', sent: 12, opened: 9, clicked: 4, completedTraining: 2, status: 'Active', studentTargets: ['stud-3', 'stud-4'] },
  { name: 'Library Overdue Fine Alert', channel: 'SMS', sent: 8, opened: 7, clicked: 2, completedTraining: 2, status: 'Completed', studentTargets: ['stud-2'] },
  { name: 'Exam Schedule Change urgent', channel: 'WhatsApp', sent: 15, opened: 14, clicked: 3, completedTraining: 3, status: 'Completed', studentTargets: ['stud-5'] }
];

const INITIAL_STATS = {
  totalUsers: 150,
  simulationsSent: 142,
  messagesOpened: 98,
  linksClicked: 48,
  awareUsers: 102,
  trainingCompleted: 84,
  highRiskUsers: 16,
  lowRiskUsers: 134
};

export default function App() {
  // Navigation View State
  const [view, setView] = useState('landing');
  const [adminTab, setAdminTab] = useState('admin-dashboard');

  // Core Simulation Mock Database States
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [stats, setStats] = useState(INITIAL_STATS);

  // Active user simulation reference (demo tracks student index 0 as target)
  const targetStudentId = 'stud-1';
  const targetStudent = students.find(s => s.id === targetStudentId);
  const [activeCampaign, setActiveCampaign] = useState(null);

  // Success toast alerts
  const [toast, setToast] = useState(null);

  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  // Reset Demo State
  const resetDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setStats(INITIAL_STATS);
    setActiveCampaign(null);
    setView('landing');
    setAdminTab('admin-dashboard');
    showToast("✓ Simulation memory database reset successfully.");
  };

  // Simulation Campaign Creator hook
  const addCampaign = (newCamp, selectedStudentIds) => {
    setCampaigns(prev => [newCamp, ...prev]);
    setActiveCampaign(newCamp);

    // Update global counters
    const targetCount = selectedStudentIds.length || students.length;
    setStats(prev => ({
      ...prev,
      simulationsSent: prev.simulationsSent + targetCount
    }));

    // Update target students opened campaigns in memory
    const updatedIds = selectedStudentIds.length ? selectedStudentIds : students.map(s => s.id);
    setStudents(prev => 
      prev.map(s => {
        if (updatedIds.includes(s.id)) {
          return {
            ...s,
            openedSimulations: [...s.openedSimulations, newCamp.name]
          };
        }
        return s;
      })
    );

    showToast(`✓ Campaign "${newCamp.name}" launched to ${targetCount} students!`);
  };

  // Trigger from Demo HUD: Deliver Phishing Email notification to student
  const triggerStudentEmail = () => {
    if (!activeCampaign) {
      // Auto-set a campaign if none exists
      setActiveCampaign(INITIAL_CAMPAIGNS[0]);
    }
    
    // Simulate target student receives email
    setStudents(prev => 
      prev.map(s => {
        if (s.id === targetStudentId) {
          const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
          if (!s.openedSimulations.includes(campName)) {
            return {
              ...s,
              openedSimulations: [...s.openedSimulations, campName]
            };
          }
        }
        return s;
      })
    );

    setStats(prev => ({
      ...prev,
      messagesOpened: prev.messagesOpened + 1
    }));

    showToast(`✉ Simulation alert delivered to student ${targetStudent.name}!`);
    setView('student-email-inbox');
  };

  // Force Phishing Link Clicks (Student fails the test)
  const triggerStudentClick = () => {
    if (!activeCampaign) {
      setActiveCampaign(INITIAL_CAMPAIGNS[0]);
    }

    setStudents(prev => 
      prev.map(s => {
        if (s.id === targetStudentId) {
          const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
          return {
            ...s,
            openedSimulations: s.openedSimulations.includes(campName) ? s.openedSimulations : [...s.openedSimulations, campName],
            clickedSimulations: s.clickedSimulations.includes(campName) ? s.clickedSimulations : [...s.clickedSimulations, campName],
            riskLevel: 'HIGH RISK'
          };
        }
        return s;
      })
    );

    // Update Click statistics
    setStats(prev => ({
      ...prev,
      messagesOpened: prev.messagesOpened + 1,
      linksClicked: prev.linksClicked + 1,
      highRiskUsers: prev.highRiskUsers + 1,
      awareUsers: Math.max(prev.awareUsers - 1, 0)
    }));

    showToast("⚠️ Alert: Link compromised! Redirection triggered.");
    setView('phishing-alert');
  };

  // Student registers link clicks themselves
  const registerClick = () => {
    const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
    
    setStudents(prev => 
      prev.map(s => {
        if (s.id === targetStudentId) {
          if (!s.clickedSimulations.includes(campName)) {
            return {
              ...s,
              clickedSimulations: [...s.clickedSimulations, campName],
              riskLevel: 'HIGH RISK'
            };
          }
        }
        return s;
      })
    );

    // Increment clicked count in active campaign
    setCampaigns(prev => 
      prev.map(c => {
        if (c.name === campName) {
          return {
            ...c,
            opened: c.opened + 1,
            clicked: c.clicked + 1
          };
        }
        return c;
      })
    );

    setStats(prev => ({
      ...prev,
      messagesOpened: prev.messagesOpened + 1,
      linksClicked: prev.linksClicked + 1,
      highRiskUsers: prev.highRiskUsers + 1,
      awareUsers: Math.max(prev.awareUsers - 1, 0)
    }));
  };

  // Complete Training Course slides
  const completeTraining = () => {
    setStudents(prev => 
      prev.map(s => {
        if (s.id === targetStudentId) {
          return {
            ...s,
            trainingCompleted: true
          };
        }
        return s;
      })
    );

    const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
    setCampaigns(prev => 
      prev.map(c => {
        if (c.name === campName) {
          return {
            ...c,
            completedTraining: c.completedTraining + 1
          };
        }
        return c;
      })
    );

    setStats(prev => ({
      ...prev,
      trainingCompleted: prev.trainingCompleted + 1
    }));

    showToast("✓ awareness module finished. Assessment unlocked.");
  };

  // Save student quiz assessment results
  const saveQuizResults = (score, timeTaken) => {
    setStudents(prev => 
      prev.map(s => {
        if (s.id === targetStudentId) {
          const finalRisk = score >= 80 ? 'AWARE' : 'LOW RISK';
          return {
            ...s,
            quizScore: score,
            quizTime: timeTaken,
            riskLevel: finalRisk
          };
        }
        return s;
      })
    );

    // Update organization stats dynamically
    setStats(prev => {
      const highChange = prev.highRiskUsers > 0 ? prev.highRiskUsers - 1 : 0;
      const awareChange = score >= 80 ? prev.awareUsers + 1 : prev.awareUsers;
      const lowChange = score < 80 ? prev.lowRiskUsers + 1 : prev.lowRiskUsers;
      
      return {
        ...prev,
        highRiskUsers: highChange,
        lowRiskUsers: lowChange,
        awareUsers: awareChange
      };
    });

    showToast(`✓ Quiz finished! Safety Rating: ${score >= 80 ? 'LOW RISK' : 'FAIL'}`);
  };

  // Target Single Student from dossier list
  const triggerSingleTest = (studentId) => {
    const targetStud = students.find(s => s.id === studentId);
    showToast(`✉ Simulation bait queue active for target: ${targetStud.name}`);
    
    // Switch target to this student
    setStudents(prev => 
      prev.map(s => {
        if (s.id === studentId) {
          const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
          return {
            ...s,
            openedSimulations: [...s.openedSimulations, campName]
          };
        }
        return s;
      })
    );

    setView('student-email-inbox');
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Dynamic Scrolling Cyber Grid & Canvas Particle Background */}
      <CyberGrid />

      {/* GLOBAL TOAST ALERTS */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-cyan-500/40 text-cyan-400 px-4 py-2.5 rounded-lg shadow-glow-primary font-mono text-xs font-bold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING DEMO CONTROLLER HUD PANEL */}
      <DemoController 
        currentView={view} 
        setView={setView} 
        resetDemoData={resetDemoData}
        triggerStudentEmail={triggerStudentEmail}
        triggerStudentClick={triggerStudentClick}
      />

      {/* APPLICATION VIEW CONTROLLER SWITCH */}
      <div className="relative min-h-screen w-full flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* 1. LANDING PAGE */}
          {view === 'landing' && (
            <motion.div key="landing" exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <LandingPage setView={setView} />
            </motion.div>
          )}

          {/* 2. ADMIN LOGIN */}
          {view === 'admin-login' && (
            <motion.div key="login" exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center">
              <AdminLogin setView={setView} />
            </motion.div>
          )}

          {/* 3. ADMIN PORTAL (Dashboard Sidebar Layout wrapper) */}
          {view === 'admin-dashboard' && (
            <motion.div key="admin-dashboard" exit={{ opacity: 0 }} className="w-full h-screen overflow-hidden">
              <AdminDashboard 
                stats={stats} 
                activeTab={adminTab} 
                setActiveTab={setAdminTab} 
                setView={setView}
              >
                {/* Nested Admin Screen tabs renderers */}
                {adminTab === 'create-simulation' && (
                  <CreateSimulation 
                    students={students} 
                    addCampaign={addCampaign} 
                    setView={setView}
                    setActiveTab={setAdminTab} 
                  />
                )}
                {adminTab === 'campaigns' && (
                  <CampaignPage 
                    campaigns={campaigns} 
                    students={students} 
                  />
                )}
                {adminTab === 'user-behaviour' && (
                  <UserBehaviour 
                    students={students} 
                    triggerSingleTest={triggerSingleTest} 
                  />
                )}
                {adminTab === 'risk-analysis' && (
                  <RiskAnalysis 
                    students={students} 
                    stats={stats} 
                  />
                )}
                {adminTab === 'reports' && (
                  <ReportsPage 
                    stats={stats} 
                    campaigns={campaigns} 
                  />
                )}
                {/* 4. Settings tab */}
                {adminTab === 'settings' && (
                  <div className="space-y-6 font-mono text-xs animate-fade-in">
                    <div>
                      <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Settings & Rules Configuration</h1>
                      <p className="text-xs text-slate-400 mt-1 uppercase">Aegis security administration properties</p>
                    </div>
                    <div className="glass-panel border-slate-800 p-6 rounded-xl space-y-4 max-w-xl">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                        <div>
                          <p className="font-bold text-slate-200">Force HTTPS Encryption</p>
                          <p className="text-[10px] text-slate-500">Secure link sandbox redirection requirements</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-cyan-500" />
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                        <div>
                          <p className="font-bold text-slate-200">Include Fake SSL Warnings</p>
                          <p className="text-[10px] text-slate-500">Attach warning padlocks in SMS templates</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-cyan-500" />
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                        <div>
                          <p className="font-bold text-slate-200">Remedial Enrollment Auto-trigger</p>
                          <p className="text-[10px] text-slate-500">Auto enroll clicked users to training slides</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-cyan-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-200">College Demo Heuristics</p>
                          <p className="text-[10px] text-slate-500">Maintain simulation records only in local memory state</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase text-[9px]">LOCAL_ACTIVE</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* 5. Training Admin Overview */}
                {adminTab === 'training' && (
                  <div className="space-y-6 font-mono text-xs animate-fade-in">
                    <div>
                      <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Training Courses Console</h1>
                      <p className="text-xs text-slate-400 mt-1 uppercase">Remedial course completion stats and assignments</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-panel border-slate-800 p-5 rounded-xl space-y-4">
                        <h3 className="text-sm font-bold text-cyan-400 uppercase">Available Courses</h3>
                        <div className="space-y-3">
                          {[
                            { name: "Phishing Fundamentals Course", modules: "6 units", completed: stats.trainingCompleted, enrolled: stats.linksClicked, icon: <BookOpen size={16} /> }
                          ].map((c, i) => (
                            <div key={i} className="p-3 bg-slate-900/40 border border-slate-850 rounded-lg flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-950 border border-slate-800 text-purple-400 rounded">{c.icon}</div>
                                <div>
                                  <p className="font-bold text-slate-200">{c.name}</p>
                                  <p className="text-[10px] text-slate-500">{c.modules} • {c.enrolled} enrolled</p>
                                </div>
                              </div>
                              <span className="font-bold text-cyan-400">{c.completed} passed</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* 6. Quiz Results Admin Overview */}
                {adminTab === 'quiz-results' && (
                  <div className="space-y-6 font-mono text-xs animate-fade-in">
                    <div>
                      <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Quiz Roster Results</h1>
                      <p className="text-xs text-slate-400 mt-1 uppercase">comprehensive overview of student quiz completions</p>
                    </div>
                    <div className="glass-panel border-slate-800 rounded-xl overflow-hidden shadow-cyber-inset">
                      <table className="w-full text-left">
                        <thead className="bg-slate-900 text-slate-500 uppercase text-[9px] border-b border-slate-900">
                          <tr>
                            <th className="p-3">Student</th>
                            <th className="p-3">Department</th>
                            <th className="p-3 text-center">Score</th>
                            <th className="p-3 text-center">Elapsed Time</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 bg-slate-950/20">
                          {students.filter(s => s.quizScore > 0).map((s, idx) => (
                            <tr key={idx} className="hover:bg-slate-900/10">
                              <td className="p-3 font-sans font-bold text-slate-200">{s.name}</td>
                              <td className="p-3 text-slate-400">{s.department}</td>
                              <td className="p-3 text-center font-bold text-emerald-400">{s.quizScore}%</td>
                              <td className="p-3 text-center text-slate-400">{s.quizTime}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                  PASSED
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </AdminDashboard>
            </motion.div>
          )}

          {/* =======================================================
               STUDENT PERSPECTIVE VIEWS
          ======================================================= */}
          
          {/* 7. USER DASHBOARD (Student Portal Cockpit) */}
          {view === 'student-dashboard' && (
            <motion.div key="student-dashboard" exit={{ opacity: 0 }} className="flex-1 w-full bg-slate-950/40 min-h-screen">
              <UserDashboard 
                student={targetStudent} 
                setView={setView} 
              />
            </motion.div>
          )}

          {/* 8. SIMULATED PHISHING INBOX */}
          {view === 'student-email-inbox' && (
            <motion.div key="inbox" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen">
              <SimulationExperience 
                currentCampaign={activeCampaign} 
                student={targetStudent}
                registerClick={registerClick} 
                setView={setView} 
              />
            </motion.div>
          )}

          {/* 9. PHISHING ALREADY CLICKED RED WARNING PAGE */}
          {view === 'phishing-alert' && (
            <motion.div key="alert" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen py-10">
              <SimulationExperience 
                currentCampaign={activeCampaign} 
                student={targetStudent}
                registerClick={registerClick} 
                setView={setView} 
              />
            </motion.div>
          )}

          {/* 10. AWARENESS TRAINING PLAYER */}
          {view === 'awareness-training' && (
            <motion.div key="training" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen">
              <AwarenessTraining 
                student={targetStudent} 
                setView={setView} 
                completeTraining={completeTraining} 
              />
            </motion.div>
          )}

          {/* 11. CYBER ASSESSMENT QUIZ */}
          {view === 'quiz' && (
            <motion.div key="quiz" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen">
              <QuizPage 
                setView={setView} 
                saveQuizResults={saveQuizResults} 
              />
            </motion.div>
          )}

          {/* 12. QUIZ RESULT SCREEN */}
          {view === 'quiz-result' && (
            <motion.div key="quiz-result" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen">
              <QuizResult 
                student={targetStudent} 
                setView={setView} 
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
