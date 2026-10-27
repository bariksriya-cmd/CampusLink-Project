import React, { useState } from 'react';

export default function AdminDashboard({ user, notices = [], onAddNotice, onLogout }) {
  const [students, setStudents] = useState([
    { id: 1, rollNo: '23CSE018', name: 'Sriya Barik', branch: 'CSE', cgpa: '8.64', backlogs: 0, status: 'Verified' },
    { id: 2, rollNo: '23CSE045', name: 'Aman Sharma', branch: 'CSE', cgpa: '7.82', backlogs: 0, status: 'Verified' },
    { id: 3, rollNo: '23ECE012', name: 'Pooja Verma', branch: 'ECE', cgpa: '6.40', backlogs: 1, status: 'On Hold' }
  ]);

  // Form states for Student Marks
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [cgpa, setCgpa] = useState('');
  const [backlogs, setBacklogs] = useState('0');

  // Form states for Broadcast Notice
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Placement Drive');
  const [noticeDesc, setNoticeDesc] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  // Notice submit handler
  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeDesc.trim()) return;

    const newNotice = {
      id: Date.now(),
      title: noticeTitle.trim(),
      category: noticeCategory,
      date: 'Just now',
      description: noticeDesc.trim(),
      urgent: isUrgent
    };

    onAddNotice(newNotice);
    alert('Notice broadcasted directly to all Student Portals!');
    setNoticeTitle('');
    setNoticeDesc('');
    setIsUrgent(false);
  };

  const handleToggleStatus = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, status: s.status === 'Verified' ? 'On Hold' : 'Verified' } : s
      )
    );
  };

  const handleAddClearance = (e) => {
    e.preventDefault();
    if (!rollNo.trim() || !cgpa) return;

    const existingIndex = students.findIndex((s) => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase());
    if (existingIndex !== -1) {
      const updated = [...students];
      updated[existingIndex] = {
        ...updated[existingIndex],
        cgpa: parseFloat(cgpa).toFixed(2),
        backlogs: parseInt(backlogs, 10)
      };
      setStudents(updated);
      alert(`Updated official clearance for ${rollNo}!`);
    } else {
      setStudents([
        ...students,
        {
          id: Date.now(),
          rollNo: rollNo.trim().toUpperCase(),
          name: name.trim() || 'Student Candidate',
          branch: branch,
          cgpa: parseFloat(cgpa).toFixed(2),
          backlogs: parseInt(backlogs, 10),
          status: 'Verified'
        }
      ]);
      alert(`Clearance record created for ${rollNo}!`);
    }
    setRollNo('');
    setName('');
    setCgpa('');
    setBacklogs('0');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏛️</span>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              TPO / Administrative Clearance Console
            </h1>
            <p className="text-xs text-slate-500">Admin Session: {user?.email || 'tpo.admin@college.edu'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-1.5 text-xs font-semibold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
        >
          Exit Admin Mode
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Students</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{students.length}</p>
            <span className="text-[11px] text-slate-500">Synced ERP Database</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Verified Profiles</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {students.filter((s) => s.status === 'Verified').length}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">Eligible Candidates</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Live Broadcast Notices</span>
            <p className="text-2xl font-black text-indigo-600 mt-1">{notices.length}</p>
            <span className="text-[11px] text-indigo-600 font-medium">Active on Student Hub</span>
          </div>
        </div>

        {/* SECTION A: BROADCAST NOTICE TO STUDENTS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>📢</span> Broadcast Placement Notice / Urgent Alert
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Publish placement drives, interview rounds, or deadline notices directly to students' screens.
            </p>
          </div>

          <form onSubmit={handlePostNotice} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Notice Title (e.g. Microsoft Internship Drive 2026)"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Placement Drive">Placement Drive</option>
                  <option value="TPO Notice">TPO Notice</option>
                  <option value="Workshop / Webinar">Workshop / Webinar</option>
                  <option value="Urgent Alert">Urgent Alert</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                rows="2"
                placeholder="Detailed description, eligibility criteria, CTC, or test links..."
                value={noticeDesc}
                onChange={(e) => setNoticeDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <span className="font-medium text-rose-600">Mark as High-Priority / Urgent Alert</span>
              </label>

              <button
                type="submit"
                className="px-5 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Broadcast to Students ⚡
              </button>
            </div>
          </form>
        </div>

        {/* SECTION B: ASSIGN MARKS FORM */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>✍️</span> Assign Official Academic Marks & Clearance
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Assign verified CGPA and active backlogs. This locks into the Student Dashboard automatically.
            </p>
          </div>

          <form onSubmit={handleAddClearance} className="grid grid-cols-1 sm:grid-cols-6 gap-3">
            <div className="sm:col-span-1">
              <input
                type="text"
                placeholder="Roll (23CSE018)"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-1">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <input
                type="number"
                step="0.01"
                placeholder="CGPA (8.5)"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <input
                type="number"
                min="0"
                placeholder="Backlogs (0)"
                value={backlogs}
                onChange={(e) => setBacklogs(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-1">
              <button
                type="submit"
                className="w-full py-1.5 text-xs bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Lock Record
              </button>
            </div>
          </form>
        </div>

        {/* SECTION C: STUDENT BATCH TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Registered Batch Candidates</h3>
            <span className="text-xs text-slate-400">Click badge to toggle eligibility</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Branch</th>
                  <th className="py-3 px-4">Verified CGPA</th>
                  <th className="py-3 px-4">Backlogs</th>
                  <th className="py-3 px-4">Clearance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{std.rollNo}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{std.name}</td>
                    <td className="py-3 px-4 text-slate-600">{std.branch}</td>
                    <td className="py-3 px-4 font-extrabold text-indigo-600">{std.cgpa}</td>
                    <td className="py-3 px-4 font-semibold">
                      {std.backlogs === 0 ? (
                        <span className="text-emerald-600">0 (Clean)</span>
                      ) : (
                        <span className="text-rose-600">{std.backlogs} Backlog</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(std.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold border cursor-pointer transition-all ${
                          std.status === 'Verified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {std.status === 'Verified' ? '✓ Verified' : '⏸ On Hold'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}