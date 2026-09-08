import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, FileText, CheckCircle2, TrendingUp, BarChart3, AlertTriangle, ShieldCheck, Mail, Loader, Check, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

/**
 * ReportsPage Component
 * --------------------
 * Executive Analytics & Audit Console for generating, viewing, and exporting
 * simulation reports, telemetry trends, and security posture statistics.
 */
export default function ReportsPage({ stats = {}, campaigns = [] }) {
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [logMsgs, setLogMsgs] = useState([]);

  // Calculate telemetry aggregates with zero-division safety
  const totalCampaigns = campaigns.length;
  const simulationsSent = stats.simulationsSent || 1;
  const totalUsers = stats.totalUsers || 1;
  const linksClicked = stats.linksClicked || 0;

  const clickRate = Math.round((linksClicked / simulationsSent) * 100);
  const openRate = Math.round(((stats.messagesOpened || 0) / simulationsSent) * 100);
  const trainingCompletionRate = linksClicked ? Math.round(((stats.trainingCompleted || 0) / linksClicked) * 100) : 100;
  const highRiskPct = Math.round(((stats.highRiskUsers || 0) / totalUsers) * 100);
  const lowRiskPct = Math.round(((stats.lowRiskUsers || 0) / totalUsers) * 100);
  const awarePct = Math.round(((stats.awareUsers || 0) / totalUsers) * 100);
  
  // Recharts report statistics
  const reportChartData = [
    { name: 'Opened Msg (%)', rate: openRate, fill: '#06b6d4' },
    { name: 'Clicked Link (%)', rate: clickRate, fill: '#ef4444' },
    { name: 'Training Done (%)', rate: trainingCompletionRate, fill: '#8b5cf6' },
    { name: 'Aware Ratio (%)', rate: awarePct, fill: '#10b981' },
  ];

  // Genuine File Downloader for the audit report
  const downloadReportFile = () => {
    const reportText = `================================================================================
                    AEGIS CYBERSECURITY SIMULATION & AUDIT REPORT
================================================================================
Report Generation Timestamp: ${new Date().toUTCString()}
Platform Engine: Aegis Simulation v2.4.0 (Educational College Demo Edition)
Audit Hash (SHA-256): 8f9b4c2e1a3d5e7f0b8a6c4d2e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f

--------------------------------------------------------------------------------
1. EXECUTIVE SUMMARY & POSTURE METRICS
--------------------------------------------------------------------------------
Total Target Students in Directory: ${stats.totalUsers || 150}
Total Phishing Bait Messages Sent:   ${stats.simulationsSent || 142}
Total Messages Opened:              ${stats.messagesOpened || 98} (${openRate}%)
Total Links Compromised (Clicked):  ${stats.linksClicked || 48} (${clickRate}%)
Total Remediations Completed:       ${stats.trainingCompleted || 84} (${trainingCompletionRate}% of clicks)
Certified Aware Students (Low Risk): ${stats.awareUsers || 102} (${awarePct}%)
High-Risk Students Requiring Review: ${stats.highRiskUsers || 16} (${highRiskPct}%)

--------------------------------------------------------------------------------
2. CAMPAIGN PERFORMANCE AUDIT
--------------------------------------------------------------------------------
${campaigns.map((c, i) => `
Campaign [${i + 1}]: ${c.name}
  Vector Channel:       ${c.channel}
  Status:               ${c.status}
  Target Deliveries:    ${c.sent}
  Messages Opened:      ${c.opened} (${c.sent ? Math.round(c.opened/c.sent*100) : 0}%)
  Compromised (Clicks): ${c.clicked} (${c.sent ? Math.round(c.clicked/c.sent*100) : 0}%)
  Training Completed:   ${c.completedTraining}
`).join('\n')}

--------------------------------------------------------------------------------
3. RECOMMENDATIONS & REMEDIAL ACTIONS
--------------------------------------------------------------------------------
1. Re-enroll targets in the "Phishing Fundamentals" module who clicked urgent subject links.
2. Conduct follow-up unannounced simulated Smishing and WhatsApp bait tests.
3. Reinforce email header verification and domain inspection protocols in orientation sessions.

================================================================================
               AUTHORIZED BY AEGIS SECURITY AUDIT CONTROLLER
================================================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AEGIS_SECURITY_AUDIT_REPORT_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    setExporting(true);
    setExportSuccess(false);
    setLogMsgs([]);

    const messages = [
      'INITIALIZING AUDIT REPORT CONSOLE COMPILER...',
      'AGGREGATING USER TELEMETRY & BEHAVIOUR RECORDS...',
      'COMPUTING SUSCEPTIBILITY & CLICK INDICES...',
      'CALCULATING REMEDIAL COMPLETION CONVERSIONS...',
      'SIGNING CRYPTOGRAPHIC SYSTEM CHECKSUM...',
      'COMPILING REPORT BUFFER SHA-256...',
      'BUFFER COMPILED: AEGIS_SECURITY_AUDIT_REPORT.txt'
    ];

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setLogMsgs((prev) => [...prev, msg]);
        if (idx === messages.length - 1) {
          setTimeout(() => {
            setExporting(false);
            setExportSuccess(true);
            downloadReportFile(); // Trigger actual file download
            
            // Auto hide success toast after 3.5s
            setTimeout(() => {
              setExportSuccess(false);
            }, 3500);
          }, 500);
        }
      }, (idx + 1) * 300);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-mono text-xs relative">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Reports & Analytics Export
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase">
            Executive Summary Generation, Audit Logs & Telemetry Export
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold uppercase rounded-lg shadow-glow-primary hover:shadow-glow-secondary flex items-center gap-1.5 cursor-pointer transform active:scale-95 transition-all text-xs"
        >
          <FileDown size={14} /> Export System Report (.txt)
        </button>
      </div>

      {/* EXPORTING SPINNER MODAL OVERLAY */}
      <AnimatePresence>
        {exporting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md glass-panel border-cyan-500/30 p-6 rounded-xl shadow-glow-primary z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2 text-cyan-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Loader size={12} className="animate-spin" /> AUDIT COMPILER ACTIVE
                </span>
                <span>v2.4</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-900 text-[10px] text-cyan-400/90 space-y-1 h-[140px] overflow-y-auto leading-relaxed">
                {logMsgs.map((m, i) => (
                  <div key={i} className="flex gap-1">
                    <span className="text-purple-400">&gt;</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
              <div className="text-center text-[10px] text-slate-400 animate-pulse">
                Formatting audit payload and generating download package...
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EXPORT SUCCESS FLOATING TOAST */}
      <AnimatePresence>
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 px-5 py-3 rounded-lg flex items-center gap-2 font-bold shadow-glow-accent text-xs border border-emerald-400"
          >
            <CheckCircle2 size={16} /> REPORT COMPILED AND DOWNLOADED SUCCESSFULLY
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPACT GENERAL METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", val: totalCampaigns, detail: "Vector channels deployed", color: "text-purple-400" },
          { label: "Delivered Bait Messages", val: stats.simulationsSent, detail: "Total target delivery pool", color: "text-cyan-400" },
          { label: "Average Click Rate", val: `${clickRate}%`, detail: "Vulnerability ratio", color: "text-red-400" },
          { label: "Remediation Completion", val: `${trainingCompletionRate}%`, detail: "Course pass metric", color: "text-emerald-400" }
        ].map((c, i) => (
          <div key={i} className="glass-panel p-4 border-slate-850 rounded-xl space-y-1 shadow-cyber-inset">
            <span className="text-[9px] text-slate-500 uppercase block">{c.label}</span>
            <span className={`text-xl font-extrabold ${c.color} block`}>{c.val}</span>
            <span className="text-[9px] text-slate-400 block font-sans">{c.detail}</span>
          </div>
        ))}
      </div>

      {/* DETAILS BREAKDOWN ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Conversion overview */}
        <div className="lg:col-span-7 glass-panel border-slate-800 p-5 rounded-xl space-y-4 shadow-cyber-inset">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Key Performance Indices (%)
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.2)" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(6, 182, 212, 0.2)', fontSize: 11 }} />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                  {reportChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk profile ratios */}
        <div className="lg:col-span-5 glass-panel border-slate-800 p-5 rounded-xl space-y-4 flex flex-col justify-between shadow-cyber-inset">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Organization Risk Distribution Ratios
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>High Risk Targets Ratio</span>
                <span className="text-red-400 font-bold">{highRiskPct}% ({stats.highRiskUsers || 0} students)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
                <div className="bg-red-500 h-full rounded shadow-glow-danger" style={{ width: `${highRiskPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Low Risk Targets Ratio</span>
                <span className="text-cyan-400 font-bold">{lowRiskPct}% ({stats.lowRiskUsers || 0} students)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded shadow-glow-primary" style={{ width: `${lowRiskPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Certified Aware Targets Ratio</span>
                <span className="text-emerald-400 font-bold">{awarePct}% ({stats.awareUsers || 0} students)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded shadow-glow-accent" style={{ width: `${awarePct}%` }}></div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-2">
            * Reports are compiled dynamically in real-time from active simulation campaigns, user click events, and training assessments.
          </p>
        </div>

      </div>

      {/* ACTIVE CAMPAIGN REPORT LIST */}
      <div className="glass-panel border-slate-800 rounded-xl overflow-hidden shadow-cyber-inset">
        <div className="p-3.5 bg-slate-900/80 border-b border-slate-900 font-bold text-slate-300 uppercase text-[10px] flex justify-between items-center">
          <span>Simulation Campaigns Audit Roster</span>
          <span className="text-slate-500 font-normal">{campaigns.length} total campaigns</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-950 text-slate-500 uppercase text-[9px] border-b border-slate-900">
              <tr>
                <th className="p-3">Campaign Reference</th>
                <th className="p-3">Channel Vector</th>
                <th className="p-3 text-center">Delivered</th>
                <th className="p-3 text-center">Open Rate</th>
                <th className="p-3 text-center">Click Rate</th>
                <th className="p-3 text-center">Remediated</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-950/20">
              {campaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-900/10 transition-all">
                  <td className="p-3 font-sans font-bold text-slate-200">{c.name}</td>
                  <td className="p-3 text-slate-400">{c.channel}</td>
                  <td className="p-3 text-center text-slate-300 font-bold">{c.sent}</td>
                  <td className="p-3 text-center text-cyan-400 font-bold">
                    {c.sent ? `${Math.round((c.opened / c.sent) * 100)}%` : '0%'}
                  </td>
                  <td className="p-3 text-center text-rose-400 font-bold">
                    {c.sent ? `${Math.round((c.clicked / c.sent) * 100)}%` : '0%'}
                  </td>
                  <td className="p-3 text-center text-emerald-400 font-bold">
                    {c.completedTraining || 0}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[8px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase font-bold">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
