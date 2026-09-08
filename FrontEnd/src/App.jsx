import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Base Interactive Components
import CyberGrid from './components/CyberGrid';
import DemoController from './components/DemoController';

// Standalone View Pages
import LandingPage from './views/LandingPage';
import AdminLogin from './views/AdminLogin';
import UserAuth from './views/UserAuth';
import AdminDashboard from './views/AdminDashboard';
import CreateSimulation from './views/CreateSimulation';
import CampaignPage from './views/CampaignPage';
import UserBehaviour from './views/UserBehaviour';
import TrainingConsole from './views/TrainingConsole';
import QuizResultsAdmin from './views/QuizResultsAdmin';
import RiskAnalysis from './views/RiskAnalysis';
import ReportsPage from './views/ReportsPage';
import SettingsPage from './views/SettingsPage';
import SimulationExperience from './views/SimulationExperience';
import AwarenessTraining from './views/AwarenessTraining';
import QuizPage from './views/QuizPage';
import QuizResult from './views/QuizResult';
import UserDashboard from './views/UserDashboard';

// Mock Initial Data Roster
const INITIAL_STUDENTS = [
  { 
    id: 'stud-1', 
    name: 'Vishal Sharma', 
    email: 'vishal.sharma.cs22@university.edu', 
    department: 'Computer Science', 
    riskLevel: 'HIGH RISK', 
    quizScore: 0, 
    quizTime: '', 
    trainingCompleted: false, 
    openedSimulations: [], 
    clickedSimulations: [] 
  },
  { 
    id: 'stud-2', 
    name: 'Emily Watson', 
    email: 'emily.watson.it23@university.edu', 
    department: 'Information Technology', 
    riskLevel: 'LOW RISK', 
    quizScore: 70, 
    quizTime: '4m 12s', 
    trainingCompleted: true, 
    openedSimulations: ['Library Overdue Fine Alert'], 
    clickedSimulations: ['Library Overdue Fine Alert'] 
  },
  { 
    id: 'stud-3', 
    name: 'James Smith', 
    email: 'james.smith.ee22@university.edu', 
    department: 'Electronics', 
    riskLevel: 'AWARE', 
    quizScore: 90, 
    quizTime: '2m 45s', 
    trainingCompleted: true, 
    openedSimulations: ['Office 365 Account Expiry'], 
    clickedSimulations: [] 
  },
  { 
    id: 'stud-4', 
    name: 'Sofia Rodriguez', 
    email: 'sofia.rod.cs23@university.edu', 
    department: 'Computer Science', 
    riskLevel: 'HIGH RISK', 
    quizScore: 0, 
    quizTime: '', 
    trainingCompleted: false, 
    openedSimulations: ['Office 365 Account Expiry'], 
    clickedSimulations: ['Office 365 Account Expiry'] 
  },
  { 
    id: 'stud-5', 
    name: 'Arthur Dent', 
    email: 'arthur.dent.me22@university.edu', 
    department: 'Mechanical', 
    riskLevel: 'LOW RISK', 
    quizScore: 80, 
    quizTime: '3m 50s', 
    trainingCompleted: true, 
    openedSimulations: ['Exam Schedule Change urgent'], 
    clickedSimulations: ['Exam Schedule Change urgent'] 
  },
  { 
    id: 'stud-6', 
    name: 'Keanu Reeves', 
    email: 'keanu.r.cs22@university.edu', 
    department: 'Computer Science', 
    riskLevel: 'AWARE', 
    quizScore: 100, 
    quizTime: '1m 55s', 
    trainingCompleted: true, 
    openedSimulations: [], 
    clickedSimulations: [] 
  }
];

const INITIAL_CAMPAIGNS = [
  { 
    name: 'Office 365 Account Expiry', 
    channel: 'Email', 
    sent: 12, 
    opened: 9, 
    clicked: 4, 
    completedTraining: 2, 
    status: 'Active', 
    studentTargets: ['stud-3', 'stud-4'] 
  },
  { 
    name: 'Library Overdue Fine Alert', 
    channel: 'SMS', 
    sent: 8, 
    opened: 7, 
    clicked: 2, 
    completedTraining: 2, 
    status: 'Completed', 
    studentTargets: ['stud-2'] 
  },
  { 
    name: 'Exam Schedule Change urgent', 
    channel: 'WhatsApp', 
    sent: 15, 
    opened: 14, 
    clicked: 3, 
    completedTraining: 3, 
    status: 'Completed', 
    studentTargets: ['stud-5'] 
  }
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

  // Core Simulation Database States
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [stats, setStats] = useState(INITIAL_STATS);

  // Active student logged-in state (defaults to index 0)
  const [currentStudentId, setCurrentStudentId] = useState('stud-1');
  const targetStudent = students.find((s) => s.id === currentStudentId) || students[0];
  const [activeCampaign, setActiveCampaign] = useState(null);

  // Global Toast Alert State
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
    setCurrentStudentId('stud-1');
    setActiveCampaign(null);
    setView('landing');
    setAdminTab('admin-dashboard');
    showToast("✓ Simulation memory database reset successfully.");
  };

  // User Login Handler (Student Profile)
  const handleUserLogin = (user) => {
    if (!students.some((s) => s.id === user.id)) {
      setStudents((prev) => [user, ...prev]);
    }
    setCurrentStudentId(user.id);
    showToast(`✓ Welcome back, ${user.name}!`);
  };

  // User Registration Handler (New Student)
  const handleUserRegister = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    setCurrentStudentId(newStudent.id);
    setStats((prev) => ({
      ...prev,
      totalUsers: prev.totalUsers + 1,
      awareUsers: prev.awareUsers + 1
    }));
    showToast(`✓ Registration successful! Welcome, ${newStudent.name}!`);
  };

  // Simulation Campaign Creator hook
  const addCampaign = (newCamp, selectedStudentIds) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    setActiveCampaign(newCamp);

    // Update global counters
    const targetCount = selectedStudentIds.length || students.length;
    setStats((prev) => ({
      ...prev,
      simulationsSent: prev.simulationsSent + targetCount
    }));

    // Update target students opened campaigns in memory
    const updatedIds = selectedStudentIds.length ? selectedStudentIds : students.map((s) => s.id);
    setStudents((prev) => 
      prev.map((s) => {
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
    const campToUse = activeCampaign || INITIAL_CAMPAIGNS[0];
    if (!activeCampaign) {
      setActiveCampaign(campToUse);
    }
    
    // Simulate target student receives email
    setStudents((prev) => 
      prev.map((s) => {
        if (s.id === targetStudent.id) {
          if (!s.openedSimulations.includes(campToUse.name)) {
            return {
              ...s,
              openedSimulations: [...s.openedSimulations, campToUse.name]
            };
          }
        }
        return s;
      })
    );

    setStats((prev) => ({
      ...prev,
      messagesOpened: prev.messagesOpened + 1
    }));

    showToast(`✉ Simulation alert delivered to student ${targetStudent.name}!`);
    setView('student-email-inbox');
  };

  // Force Phishing Link Clicks (Student fails the test)
  const triggerStudentClick = () => {
    const campToUse = activeCampaign || INITIAL_CAMPAIGNS[0];
    if (!activeCampaign) {
      setActiveCampaign(campToUse);
    }

    setStudents((prev) => 
      prev.map((s) => {
        if (s.id === targetStudent.id) {
          return {
            ...s,
            openedSimulations: s.openedSimulations.includes(campToUse.name) ? s.openedSimulations : [...s.openedSimulations, campToUse.name],
            clickedSimulations: s.clickedSimulations.includes(campToUse.name) ? s.clickedSimulations : [...s.clickedSimulations, campToUse.name],
            riskLevel: 'HIGH RISK'
          };
        }
        return s;
      })
    );

    // Update Click statistics
    setStats((prev) => ({
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
    
    setStudents((prev) => 
      prev.map((s) => {
        if (s.id === targetStudent.id) {
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
    setCampaigns((prev) => 
      prev.map((c) => {
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

    setStats((prev) => ({
      ...prev,
      messagesOpened: prev.messagesOpened + 1,
      linksClicked: prev.linksClicked + 1,
      highRiskUsers: prev.highRiskUsers + 1,
      awareUsers: Math.max(prev.awareUsers - 1, 0)
    }));
  };

  // Complete Training Course slides
  const completeTraining = () => {
    setStudents((prev) => 
      prev.map((s) => {
        if (s.id === targetStudent.id) {
          return {
            ...s,
            trainingCompleted: true
          };
        }
        return s;
      })
    );

    const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
    setCampaigns((prev) => 
      prev.map((c) => {
        if (c.name === campName) {
          return {
            ...c,
            completedTraining: c.completedTraining + 1
          };
        }
        return c;
      })
    );

    setStats((prev) => ({
      ...prev,
      trainingCompleted: prev.trainingCompleted + 1
    }));

    showToast("✓ Awareness module finished. Assessment unlocked.");
  };

  // Save student quiz assessment results
  const saveQuizResults = (score, timeTaken) => {
    setStudents((prev) => 
      prev.map((s) => {
        if (s.id === targetStudent.id) {
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
    setStats((prev) => {
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
    const targetStud = students.find((s) => s.id === studentId);
    if (!targetStud) return;
    
    setCurrentStudentId(studentId);
    showToast(`✉ Simulation bait queue active for target: ${targetStud.name}`);
    
    const campName = activeCampaign?.name || INITIAL_CAMPAIGNS[0].name;
    setStudents((prev) => 
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            openedSimulations: s.openedSimulations.includes(campName) ? s.openedSimulations : [...s.openedSimulations, campName]
          };
        }
        return s;
      })
    );

    setView('student-email-inbox');
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Dynamic Background */}
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
        adminTab={adminTab}
        setAdminTab={setAdminTab}
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
            <motion.div key="admin-login" exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center">
              <AdminLogin setView={setView} />
            </motion.div>
          )}

          {/* 3. USER AUTH (Login & Registration & Google/LinkedIn) */}
          {view === 'user-auth' && (
            <motion.div key="user-auth" exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center">
              <UserAuth 
                setView={setView} 
                students={students}
                onLogin={handleUserLogin}
                onRegister={handleUserRegister}
              />
            </motion.div>
          )}

          {/* 4. ADMIN PORTAL (Dashboard Sidebar Layout wrapper) */}
          {view === 'admin-dashboard' && (
            <motion.div key="admin-dashboard" exit={{ opacity: 0 }} className="w-full h-screen overflow-hidden">
              <AdminDashboard 
                stats={stats} 
                activeTab={adminTab} 
                setActiveTab={setAdminTab} 
                setView={setView}
              >
                {/* Nested Admin Screen Tabs */}
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
                {adminTab === 'training' && (
                  <TrainingConsole 
                    stats={stats} 
                    setView={setView} 
                  />
                )}
                {adminTab === 'quiz-results' && (
                  <QuizResultsAdmin 
                    students={students} 
                  />
                )}
                {adminTab === 'risk-analysis' && (
                  <RiskAnalysis 
                    students={students} 
                    stats={stats} 
                    triggerSingleTest={triggerSingleTest}
                  />
                )}
                {adminTab === 'reports' && (
                  <ReportsPage 
                    stats={stats} 
                    campaigns={campaigns} 
                  />
                )}
                {adminTab === 'settings' && (
                  <SettingsPage 
                    resetDemoData={resetDemoData} 
                  />
                )}
              </AdminDashboard>
            </motion.div>
          )}

          {/* =======================================================
               STUDENT PERSPECTIVE VIEWS
          ======================================================= */}
          
          {/* 5. USER DASHBOARD (Student Portal Cockpit) */}
          {view === 'student-dashboard' && (
            <motion.div key="student-dashboard" exit={{ opacity: 0 }} className="flex-1 w-full bg-slate-950/40 min-h-screen">
              <UserDashboard 
                student={targetStudent} 
                setView={setView} 
              />
            </motion.div>
          )}

          {/* 6. SIMULATED PHISHING INBOX */}
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

          {/* 7. PHISHING ALREADY CLICKED RED WARNING PAGE */}
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

          {/* 8. AWARENESS TRAINING PLAYER */}
          {view === 'awareness-training' && (
            <motion.div key="training" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen">
              <AwarenessTraining 
                student={targetStudent} 
                setView={setView} 
                completeTraining={completeTraining} 
              />
            </motion.div>
          )}

          {/* 9. CYBER ASSESSMENT QUIZ */}
          {view === 'quiz' && (
            <motion.div key="quiz" exit={{ opacity: 0 }} className="flex-1 w-full flex items-center justify-center min-h-screen">
              <QuizPage 
                setView={setView} 
                saveQuizResults={saveQuizResults} 
              />
            </motion.div>
          )}

          {/* 10. QUIZ RESULT SCREEN */}
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
