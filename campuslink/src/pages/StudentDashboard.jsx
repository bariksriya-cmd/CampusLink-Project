import React, { useState } from 'react';

export default function StudentDashboard({ user, notices = [], onLogout }) {
  const tpoAcademicRecord = {
    rollNumber: user?.email ? user.email.split('@')[0].toUpperCase() : 'CSE24018',
    branch: 'Computer Science & Engineering',
    semester: '6th Semester',
    verifiedCGPA: '8.64',
    activeBacklogs: 0,
    placementEligibility: 'Eligible & Verified',
    verifiedBy: 'Training & Placement Office (TPO Cell)',
    lastUpdated: 'Spring 2026'
  };

  const [skills, setSkills] = useState(['React', 'Node.js', 'Java', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');

  const [resumeName, setResumeName] = useState('Sriya_Barik_Resume_2026.pdf');
  const [resumeLink, setResumeLink] = useState('https://drive.google.com/your-resume-link');
  const [tempResumeLink, setTempResumeLink] = useState('');

  const [certificates, setCertificates] = useState([
    { title: 'Full Stack Development - Coursera', link: 'https://coursera.org/verify/demo1' },
    { title: 'Smart India Hackathon Finalist', link: 'https://sih.gov.in/certificate' }
  ]);
  const [certTitle, setCertTitle] = useState('');
  const [certLink, setCertLink] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleUpdateResumeLink = (e) => {
    e.preventDefault();
    if (tempResumeLink.trim()) {
      setResumeLink(tempResumeLink.trim());
      setTempResumeLink('');
      alert('Resume link updated successfully!');
    }
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (certTitle.trim()) {
      setCertificates([...certificates, { title: certTitle.trim(), link: certLink.trim() || '#' }]);
      setCertTitle('');
      setCertLink('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navbar with Notification Bell */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Student Placement Portal</h1>
            <p className="text-xs text-slate-500">ID: {user?.email || 'student@college.edu'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Counter Badge */}
          <div className="relative cursor-pointer flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-all">
            <span className="text-sm">🔔</span>
            <span className="text-xs font-semibold text-slate-700">Notices</span>
            <span className="bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {notices.length}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-1.5 text-xs font-semibold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
          >
            Exit / Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* SECTION 1: LIVE BROADCAST NOTICE BOARD (From TPO Admin) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📢</span>
              <h2 className="text-base font-bold text-slate-900">Official Placement Notices & Drives</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Broadcasted by TPO Cell</span>
          </div>

          {notices.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">No active notices broadcasted yet.</p>
          ) : (
            <div className="space-y-3">
              {notices.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.urgent
                      ? 'bg-rose-50/50 border-rose-200'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      {item.urgent && (
                        <span className="text-[10px] bg-rose-600 text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">
                          Urgent Alert
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-medium">
                        {item.category}
                      </span>
                      <span>• {item.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: LOCKED TPO ACADEMIC RECORD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Official Academic Clearance Record</h2>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  🔒 Locked & Verified by TPO
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Marks and backlogs are official college records synced with ERP.
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-bold">
              ✓ {tpoAcademicRecord.placementEligibility}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Roll Number</span>
              <span className="text-sm font-bold text-slate-800">{tpoAcademicRecord.rollNumber}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Verified CGPA</span>
              <span className="text-sm font-extrabold text-indigo-600">{tpoAcademicRecord.verifiedCGPA} / 10.0</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Active Backlogs</span>
              <span className="text-sm font-bold text-emerald-600">{tpoAcademicRecord.activeBacklogs} None</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Branch / Sem</span>
              <span className="text-sm font-semibold text-slate-800">CSE • 6th Sem</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: EDITABLE PROFILE (SKILLS, RESUME, CERTIFICATES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>⚡</span> Technical Skills & Stack
                </h3>
                <span className="text-xs text-slate-400">Editable by Student</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">Add skills you have mastered.</p>

              <div className="flex flex-wrap gap-2 mb-4 min-h-[48px]">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-lg font-medium border border-indigo-100"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-indigo-400 hover:text-indigo-900 font-bold ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Docker, Python"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                + Add
              </button>
            </form>
          </div>

          {/* Resume */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>📄</span> Official Resume PDF
                </h3>
                <span className="text-xs text-slate-400">Editable by Student</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">Upload your latest resume file or provide a public link.</p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📑</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{resumeName}</p>
                      <a href={resumeLink} target="_blank" rel="noreferrer" className="text-[11px] text-indigo-600 hover:underline">
                        Preview Active Resume ↗
                      </a>
                    </div>
                  </div>
                  <label className="text-xs bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded cursor-pointer">
                    Change PDF
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdateResumeLink} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="url"
                value={tempResumeLink}
                onChange={(e) => setTempResumeLink(e.target.value)}
                placeholder="Paste Drive resume URL"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg cursor-pointer"
              >
                Save URL
              </button>
            </form>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>🏆</span> Certifications & Credentials
              </h3>
              <span className="text-xs text-slate-400">Editable by Student</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Add verified certificates from Coursera, NPTEL or Hackathons.</p>

            <div className="space-y-2 mb-4">
              {certificates.map((cert, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-xs font-semibold text-slate-800">{cert.title}</span>
                  <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs font-medium text-indigo-600 hover:underline">
                    View Credential ↗
                  </a>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCertificate} className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100">
              <input
                type="text"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                placeholder="Certificate title"
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="url"
                value={certLink}
                onChange={(e) => setCertLink(e.target.value)}
                placeholder="Verification link"
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                + Add Certificate
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}