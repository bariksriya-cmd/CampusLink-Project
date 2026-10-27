import React, { useState } from 'react';

export default function RecruiterDashboard({ user, onLogout }) {
  const [candidates] = useState([
    {
      id: 1,
      name: 'Sriya Barik',
      rollNo: '23CSE018',
      branch: 'CSE',
      cgpa: 8.64,
      backlogs: 0,
      skills: ['React', 'Node.js', 'Java', 'Tailwind CSS'],
      resumeLink: 'https://drive.google.com/your-resume-link',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Aman Sharma',
      rollNo: '23CSE045',
      branch: 'CSE',
      cgpa: 7.82,
      backlogs: 0,
      skills: ['Python', 'SQL', 'Django', 'AWS'],
      resumeLink: '#',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Rohit Dash',
      rollNo: '23CSE072',
      branch: 'CSE',
      cgpa: 9.15,
      backlogs: 0,
      skills: ['C++', 'System Design', 'React', 'Docker'],
      resumeLink: '#',
      status: 'Interviewed'
    },
    {
      id: 4,
      name: 'Pooja Verma',
      rollNo: '23ECE012',
      branch: 'ECE',
      cgpa: 6.40,
      backlogs: 1,
      skills: ['Embedded Systems', 'C++', 'IoT'],
      resumeLink: '#',
      status: 'On Hold'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [minCgpa, setMinCgpa] = useState('0');
  const [excludeBacklogs, setExcludeBacklogs] = useState(true);
  const [shortlistedIds, setShortlistedIds] = useState([3]);

  const availableSkills = ['All', 'React', 'Java', 'Python', 'C++', 'Node.js', 'AWS'];

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.rollNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSkill =
      selectedSkill === 'All' || cand.skills.includes(selectedSkill);

    const matchesCgpa = cand.cgpa >= parseFloat(minCgpa || 0);
    const matchesBacklogs = !excludeBacklogs || cand.backlogs === 0;

    return matchesSearch && matchesSkill && matchesCgpa && matchesBacklogs;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💼</span>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              Enterprise Talent & Recruiter Hub
            </h1>
            <p className="text-xs text-slate-500">
              Corporate Portal: {user?.email || 'talent@enterprise.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 font-semibold">
            Shortlisted Candidates: {shortlistedIds.length}
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-1.5 text-xs font-semibold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
          >
            Exit Recruiter Mode
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Verified Candidate Pool
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">{candidates.length}</p>
            <span className="text-[11px] text-slate-500">Official TPO Records Cleared</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Matching Active Criteria
            </span>
            <p className="text-2xl font-black text-indigo-600 mt-1">{filteredCandidates.length}</p>
            <span className="text-[11px] text-indigo-600 font-medium">Ready for Screening</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Direct Shortlists
            </span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{shortlistedIds.length}</p>
            <span className="text-[11px] text-emerald-600 font-medium">Flagged for Technical Round</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search candidate by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Min CGPA:</span>
                <select
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="0">All</option>
                  <option value="7.0">7.0+</option>
                  <option value="7.5">7.5+</option>
                  <option value="8.0">8.0+</option>
                  <option value="8.5">8.5+</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeBacklogs}
                  onChange={(e) => setExcludeBacklogs(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                0 Active Backlogs Only
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 mr-2">Filter Tech Stack:</span>
            {availableSkills.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedSkill(tech)}
                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  selectedSkill === tech
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Verified Placement Profiles</h3>
            <span className="text-xs text-slate-400">
              Showing {filteredCandidates.length} eligible students
            </span>
          </div>

          {filteredCandidates.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No candidates meet the selected filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                    <th className="py-3 px-4">Student Profile</th>
                    <th className="py-3 px-4">Branch</th>
                    <th className="py-3 px-4">Verified CGPA</th>
                    <th className="py-3 px-4">Backlogs</th>
                    <th className="py-3 px-4">Skills / Tech Stack</th>
                    <th className="py-3 px-4 text-center">Resume</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map((cand) => {
                    const isShortlisted = shortlistedIds.includes(cand.id);
                    return (
                      <tr key={cand.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{cand.name}</p>
                          <p className="text-[11px] text-slate-400">{cand.rollNo}</p>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">{cand.branch}</td>
                        <td className="py-3 px-4 font-black text-indigo-600 text-sm">
                          {cand.cgpa}
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          {cand.backlogs === 0 ? (
                            <span className="text-emerald-600">0</span>
                          ) : (
                            <span className="text-rose-600">{cand.backlogs}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {cand.skills.map((s, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium border border-slate-200"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <a
                            href={cand.resumeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                          >
                            <span>📄</span> View PDF
                          </a>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleShortlist(cand.id)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                              isShortlisted
                                ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isShortlisted ? '✓ Shortlisted' : '+ Shortlist'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}