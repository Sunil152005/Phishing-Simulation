import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, PhoneCall, Check, ArrowRight, ArrowLeft, Send, Sparkles, User, Info, FileText } from 'lucide-react';

export default function CreateSimulation({ students, addCampaign, setView, setActiveTab }) {
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState('Email'); // 'Email' | 'SMS' | 'WhatsApp'
  const [campaignName, setCampaignName] = useState('Office 365 Account Expiry');
  const [subject, setSubject] = useState('CRITICAL: Password Security Sync Required Immediately');
  const [message, setMessage] = useState(
    'A security review of your Office 365 student account indicates suspicious login attempts. To prevent suspension, you must synchronize your password profile immediately using the secure gateway link below.'
  );
  const [attachmentName, setAttachmentName] = useState('security_verification.pdf');
  const [simulationLink, setSimulationLink] = useState('https://security-verify.student-aegis.org/login');
  
  // Selected student ids
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  // Search state in student table
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Trigger Launch
  const [launching, setLaunching] = useState(false);

  // Channels definitions
  const channels = [
    { id: 'Email', name: 'Email Simulation', icon: <Mail size={24} />, desc: 'Simulate official organizational phishing emails with fake attachments.', color: 'border-cyan-500/20 text-cyan-400' },
    { id: 'SMS', name: 'SMS Phishing (Smishing)', icon: <PhoneCall size={24} />, desc: 'Test text message spoofing featuring urgent link triggers.', color: 'border-purple-500/20 text-purple-400' },
    { id: 'WhatsApp', name: 'WhatsApp Phishing', icon: <MessageSquare size={24} />, desc: 'Deliver realistic high-urgency notifications directly in web-chat styles.', color: 'border-emerald-500/20 text-emerald-400' }
  ];

  // Mock template options based on channel
  const handleSelectChannel = (ch) => {
    setChannel(ch);
    if (ch === 'Email') {
      setCampaignName('Office 365 Account Expiry');
      setSubject('CRITICAL: Password Security Sync Required Immediately');
      setMessage('A security review of your Office 365 student account indicates suspicious login attempts. To prevent suspension, you must synchronize your password profile immediately using the secure gateway link below.');
    } else if (ch === 'SMS') {
      setCampaignName('Library Overdue Fine Alert');
      setSubject('Aegis SMS Alert');
      setMessage('AEGIS-ALERT: You have an outstanding college library fine of $45.50. Pay by 5 PM to prevent academic hold:');
    } else {
      setCampaignName('Exam Schedule Change urgent');
      setSubject('WhatsApp Urgent Announcement');
      setMessage('🔴 URGENT ACADEMIC CORRECTION: The final-year engineering project examination dates have been shifted due to state directives. Click here to download the revised timetable:');
    }
  };

  // Toggle single student
  const toggleStudent = (id) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  // Select all students matching filters
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const selectAllFiltered = () => {
    const filteredIds = filteredStudents.map(s => s.id);
    const allSelected = filteredIds.every(id => selectedStudents.includes(id));
    if (allSelected) {
      setSelectedStudents(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      setSelectedStudents(prev => [...new Set([...prev, ...filteredIds])]);
    }
  };

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => {
      // Create campaign object
      const newCampaign = {
        name: campaignName,
        channel,
        targetCount: selectedStudents.length || 12,
        subject,
        message,
        link: simulationLink,
        status: 'Active',
        sent: selectedStudents.length || 12,
        opened: 0,
        clicked: 0,
        completedTraining: 0,
        studentTargets: selectedStudents.length ? selectedStudents : students.map(s => s.id)
      };
      
      addCampaign(newCampaign, selectedStudents);
      setLaunching(false);
      setStep(1);
      // Send to Campaigns Tab
      setActiveTab('campaigns');
    }, 2500);
  };

  // Departments List
  const departments = ['All', 'Computer Science', 'Information Technology', 'Electronics', 'Mechanical'];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Create Phishing Simulation
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">STEP {step} OF 4 — WIZARD MODULE</p>
        </div>

        {/* Wizard Progress Nodes */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-1">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${
                step === s 
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40 shadow-glow-primary' 
                  : step > s 
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
                  : 'border-slate-800 text-slate-600'
              }`}>
                {step > s ? <Check size={10} /> : s}
              </span>
              {s < 4 && <span className={`w-6 h-0.5 ${step > s ? 'bg-emerald-500' : 'bg-slate-800'}`}></span>}
            </div>
          ))}
        </div>
      </div>

      {/* STEP CONTENT SWITCHER */}
      <div className="glass-panel border-cyan-500/10 rounded-2xl p-6 relative overflow-hidden">
        
        {launching && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-30 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin flex items-center justify-center">
              <Sparkles className="text-cyan-400 animate-pulse" size={24} />
            </div>
            <div className="text-center font-mono space-y-1">
              <p className="text-cyan-400 font-bold text-sm tracking-wider uppercase animate-pulse">DEPLOYING SECURITY VECTOR...</p>
              <p className="text-[10px] text-slate-500">SIGNING CERTIFICATES & QUEUING SIMULATED COMMUNICATIONS</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: CHANNEL SELECT */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Select Phishing Channel</h3>
                <p className="text-xs text-slate-400">Choose the vector you wish to test targeted students with.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChannel(ch.id)}
                    className={`glass-panel border p-6 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-48 cursor-pointer ${
                      channel === ch.id 
                        ? `${ch.color} bg-slate-900/40 border-2`
                        : 'border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg w-fit">
                      {ch.icon}
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-200">{ch.name}</h4>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{ch.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: BUILD CONTENT & LIVE PREVIEW */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Form Input fields */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-1">Create Simulated Phishing Template</h3>
                  <p className="text-[10px] text-slate-400">Draft realistic bait content with educational simulation markings.</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">Campaign Title (Admin Reference)</label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {channel === 'Email' && (
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">Subject Header</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">Message Body</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {channel === 'Email' ? (
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase block mb-1">Attachment PDF Name</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500">
                            <FileText size={14} />
                          </span>
                          <input
                            type="text"
                            value={attachmentName}
                            onChange={(e) => setAttachmentName(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 uppercase">Sender ID Spoof</label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">Simulation Link URL</label>
                      <input
                        type="text"
                        value={simulationLink}
                        onChange={(e) => setSimulationLink(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded flex gap-2.5 text-cyan-400 font-sans text-xs">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    <p><strong>Educational Simulation Safe mode</strong>: All links generated automatically redirect to our sandbox warning page. Zero vulnerability data will be processed.</p>
                  </div>
                </div>
              </div>

              {/* LIVE PREVIEW CONTAINER */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Live Simulation Device Preview</span>
                  <span className="text-[10px] font-mono text-slate-500">MODE: {channel.toUpperCase()}</span>
                </div>

                {channel === 'Email' ? (
                  /* Email Preview Box */
                  <div className="glass-panel border-slate-800 rounded-xl overflow-hidden font-sans shadow-2xl flex flex-col h-[350px]">
                    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                      </div>
                      <span>Secure Mail Client Gateway</span>
                    </div>

                    <div className="p-4 bg-slate-950 border-b border-slate-900 text-xs space-y-1">
                      <div><span className="text-slate-500 font-mono">From:</span> Admin Desk &lt;<span className="text-rose-400">admin-sync@aegis-portal.net</span>&gt;</div>
                      <div><span className="text-slate-500 font-mono">To:</span> Selected Student &lt;target@university.edu&gt;</div>
                      <div className="font-bold text-slate-200 pt-1"><span className="text-slate-500 font-mono font-normal">Subject:</span> {subject}</div>
                    </div>

                    <div className="p-4 flex-1 bg-white text-slate-800 text-xs space-y-4 overflow-y-auto font-sans leading-relaxed">
                      <p>{message}</p>
                      
                      <div className="p-2 border border-slate-200 bg-slate-50 rounded flex items-center justify-between text-[11px] text-slate-600 font-mono">
                        <div className="flex items-center gap-1.5">
                          <FileText size={16} className="text-red-500" />
                          <span className="underline cursor-pointer">{attachmentName}</span>
                        </div>
                        <span>(1.2 MB)</span>
                      </div>

                      <div className="py-2.5">
                        <a href="#link" className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all text-center inline-block cursor-pointer">
                          Synchronize Account Credentials
                        </a>
                        <div className="text-[10px] text-slate-400 mt-1.5 font-mono">Link redirects to: {simulationLink}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Phone Device mock layout for SMS & WhatsApp */
                  <div className="flex justify-center">
                    <div className="w-[280px] h-[370px] border-[6px] border-slate-800 rounded-[30px] bg-slate-950 relative overflow-hidden flex flex-col font-sans">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-xl z-20"></div>
                      
                      {/* Screen Header */}
                      <div className="bg-slate-900 border-b border-slate-800 px-4 pt-5 pb-2 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                        <span>AegisMobile</span>
                        <span>10:33 AM</span>
                      </div>

                      <div className="p-4 flex-1 overflow-y-auto space-y-4 flex flex-col justify-end">
                        {channel === 'SMS' ? (
                          /* SMS Bubble */
                          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-bl-none text-[11px] text-slate-200 max-w-[90%] space-y-2 leading-relaxed">
                            <div className="font-bold text-purple-400 text-[10px] font-mono">{subject}</div>
                            <p>{message}</p>
                            <a href="#link" className="text-cyan-400 underline block font-mono break-all">{simulationLink}</a>
                          </div>
                        ) : (
                          /* WhatsApp bubble */
                          <div className="bg-emerald-950/40 border border-emerald-500/25 p-3 rounded-2xl rounded-bl-none text-[11px] text-slate-200 max-w-[95%] space-y-2 relative shadow-glow-accent">
                            <div className="text-[9px] text-emerald-400 font-bold font-mono uppercase tracking-wider">Aegis WhatsApp Admin</div>
                            <p>{message}</p>
                            <div className="p-1.5 bg-slate-950 border border-slate-800 rounded flex items-center justify-between text-[9px] text-slate-400 font-mono">
                              <span>🔗 Verification Gateway</span>
                              <span className="text-emerald-400 font-bold">OPEN LINK</span>
                            </div>
                            <div className="text-right text-[8px] text-slate-500 mt-1">10:33 AM ✓✓</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: TARGET STUDENTS SELECTOR */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-1">Select Target Directory</h3>
                  <p className="text-[10px] text-slate-400 font-sans">Check the boxes of target students. Selected ({selectedStudents.length} / {students.length}).</p>
                </div>

                {/* Filter and search controls */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs w-full sm:w-auto">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name..."
                    className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200"
                  >
                    {departments.map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Students Grid List */}
              <div className="max-h-[220px] overflow-y-auto border border-slate-850 rounded-lg">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-900 text-slate-400 sticky top-0 uppercase text-[10px]">
                    <tr>
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={filteredStudents.length > 0 && filteredStudents.every(s => selectedStudents.includes(s.id))}
                          onChange={selectAllFiltered}
                          className="cursor-pointer"
                        />
                      </th>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Calculated Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 bg-slate-950/40">
                    {filteredStudents.map((s) => {
                      const isSelected = selectedStudents.includes(s.id);
                      return (
                        <tr 
                          key={s.id}
                          className={`hover:bg-slate-900/30 transition-all ${isSelected ? 'bg-cyan-500/5' : ''}`}
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleStudent(s.id)}
                              className="cursor-pointer"
                            />
                          </td>
                          <td className="p-3 text-slate-200 font-bold">{s.name}</td>
                          <td className="p-3 text-slate-400">{s.email}</td>
                          <td className="p-3 text-slate-400">{s.department}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.riskLevel === 'HIGH RISK' 
                                ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
                                : s.riskLevel === 'LOW RISK' 
                                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' 
                                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            }`}>
                              {s.riskLevel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW & LAUNCH */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Review Simulation Campaign</h3>
                <p className="text-xs text-slate-400">Please review final telemetry settings prior to launching vector deployment.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                {/* Details list */}
                <div className="glass-panel border-slate-800 p-4 rounded-xl space-y-3 md:col-span-1">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Campaign Name</span>
                    <span className="text-slate-200 font-bold">{campaignName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Channel Vector</span>
                    <span className="text-slate-200 font-bold">{channel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Total Targets</span>
                    <span className="text-cyan-400 font-bold">{selectedStudents.length || students.length} target student(s) selected</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Redirect URL Target</span>
                    <span className="text-purple-400 block truncate">{simulationLink}</span>
                  </div>
                </div>

                {/* Content preview rendering */}
                <div className="glass-panel border-slate-800 p-4 rounded-xl md:col-span-2 space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase">Message Content Review</div>
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded font-sans text-slate-300 leading-relaxed text-xs">
                    {channel === 'Email' && <div className="font-bold text-slate-200 mb-2 border-b border-slate-900 pb-1.5">Subject: {subject}</div>}
                    <p>{message}</p>
                    <p className="text-cyan-400 underline mt-2 font-mono text-[10px]">{simulationLink}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* CONTROLLER NAVIGATION BAR */}
        <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-6">
          <button
            onClick={() => setStep(prev => Math.max(prev - 1, 1))}
            disabled={step === 1}
            className={`px-4 py-2 rounded text-xs font-mono border flex items-center gap-1.5 transition-all ${
              step === 1 
                ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
                : 'border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-900/60 cursor-pointer'
            }`}
          >
            <ArrowLeft size={12} /> PREVIOUS
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(prev => Math.min(prev + 1, 4))}
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded shadow-glow-primary hover:scale-[1.02] transform active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              NEXT STEP <ArrowRight size={12} />
            </button>
          ) : (
            <button
              onClick={handleLaunch}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-mono font-bold text-xs rounded shadow-glow-primary hover:scale-[1.02] transform active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              LAUNCH SIMULATION <Send size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
