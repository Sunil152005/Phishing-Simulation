import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Download, Award, Clock, Users, CheckCircle, AlertTriangle } from 'lucide-react';

/**
 * QuizResultsAdmin Component
 * --------------------------
 * Admin perspective to inspect student cybersecurity assessment quiz results,
 * test times, scores, passing rates, and department performance rankings.
 */
export default function QuizResultsAdmin({ students = [] }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    let matchesScore = true;
    if (scoreFilter === 'Passed') matchesScore = s.quizScore >= 80;
    else if (scoreFilter === 'Failed') matchesScore = s.quizScore > 0 && s.quizScore < 80;
    else if (scoreFilter === 'Unattended') matchesScore = s.quizScore === 0;
    return matchesSearch && matchesDept && matchesScore;
  });

  const studentsWithQuiz = students.filter((s) => s.quizScore > 0);
  const avgScore = studentsWithQuiz.length
    ? Math.round(studentsWithQuiz.reduce((acc, s) => acc + s.quizScore, 0) / studentsWithQuiz.length)
    : 0;
  const passedCount = students.filter((s) => s.quizScore >= 80).length;

  // Export CSV generator
  const exportCsv = () => {
    const headers = ['Student ID,Name,Email,Department,Score,Time Taken,Status,Risk Level\n'];
    const rows = students.map((s) => 
      `"${s.id}","${s.name}","${s.email}","${s.department}",${s.quizScore},"${s.quizTime || 'N/A'}","${s.quizScore >= 80 ? 'PASSED' : s.quizScore > 0 ? 'FAILED' : 'UNATTENDED'}","${s.riskLevel}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AEGIS_QUIZ_ROSTER_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-mono text-xs animate-fade-in pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Quiz Roster & Evaluation Results
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">
            Comprehensive Overview of Student Knowledge Assessment Scores
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase rounded-lg shadow-glow-primary flex items-center gap-1.5 cursor-pointer transition-all text-[11px]"
        >
          <Download size={14} /> Export CSV Roster
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel border-cyan-500/15 p-4 rounded-xl flex items-center justify-between shadow-cyber-inset">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Average Quiz Grade</span>
            <span className="text-2xl font-extrabold text-white">{avgScore}%</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400">
            <Award size={20} />
          </div>
        </div>

        <div className="glass-panel border-emerald-500/15 p-4 rounded-xl flex items-center justify-between shadow-cyber-inset">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Certified Aware (Passed)</span>
            <span className="text-2xl font-extrabold text-emerald-400">{passedCount} students</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="glass-panel border-purple-500/15 p-4 rounded-xl flex items-center justify-between shadow-cyber-inset">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Total Roster Pool</span>
            <span className="text-2xl font-extrabold text-purple-300">{students.length} targets</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-purple-400">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-panel border-slate-850 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student name or email..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] uppercase">Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 text-xs focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] uppercase">Status:</span>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 text-xs focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Passed">Passed (≥80%)</option>
              <option value="Failed">Failed (&lt;80%)</option>
              <option value="Unattended">Unattended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="glass-panel border-slate-800 rounded-xl overflow-hidden shadow-cyber-inset">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-850 sticky top-0">
              <tr>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5 text-center">Score</th>
                <th className="p-3.5 text-center">Elapsed Time</th>
                <th className="p-3.5 text-center">Evaluation Status</th>
                <th className="p-3.5">Risk Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-950/40">
              {filteredStudents.map((s, idx) => {
                const isPassed = s.quizScore >= 80;
                const isFailed = s.quizScore > 0 && s.quizScore < 80;

                return (
                  <tr key={s.id || idx} className="hover:bg-slate-900/30 transition-all">
                    <td className="p-3.5 font-sans font-bold text-slate-200">
                      <div>{s.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 font-normal">{s.email}</div>
                    </td>
                    <td className="p-3.5 text-slate-400">{s.department}</td>
                    <td className={`p-3.5 text-center font-bold ${
                      isPassed ? 'text-emerald-400' : isFailed ? 'text-yellow-400' : 'text-slate-600'
                    }`}>
                      {s.quizScore > 0 ? `${s.quizScore}%` : 'N/A'}
                    </td>
                    <td className="p-3.5 text-center text-slate-400">{s.quizTime || 'N/A'}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        isPassed 
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                          : isFailed 
                          ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' 
                          : 'bg-slate-900 border border-slate-800 text-slate-600'
                      }`}>
                        {isPassed ? 'PASSED (AWARE)' : isFailed ? 'RE-TAKE NEEDED' : 'NOT STARTED'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        s.riskLevel === 'HIGH RISK'
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                          : s.riskLevel === 'LOW RISK'
                          ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                          : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      }`}>
                        {s.riskLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No matching student evaluation records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
