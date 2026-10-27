import React from 'react';

export default function HomePortal({ onSelectRole }) {
  const portals = [
    {
      title: 'Student Portal',
      icon: '🎓',
      desc: 'Access mentorship, explore college clubs, build student profile, and apply for campus drives.',
      btnText: 'Enter Student Portal →',
      borderColor: 'border-t-emerald-500',
      role: 'student'
    },
    {
      title: 'Recruiter Hub',
      icon: '💼',
      desc: 'Filter verified candidate profiles, post job/internship opportunities, and manage campus hiring.',
      btnText: 'Enter Recruiter Center →',
      borderColor: 'border-t-sky-500',
      role: 'recruiter'
    },
    {
      title: 'Admin / Placement Cell',
      icon: '🏛️',
      desc: 'Track placement analytics, approve company drives, manage batch records, and oversee mentorship.',
      btnText: 'Enter Admin View →',
      borderColor: 'border-t-rose-500',
      role: 'admin'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl text-indigo-600">⚡</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Campus Link</h1>
        </div>
        <p className="text-sm font-medium text-slate-500">
          Smart Campus Community, Mentorship & Placement Platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {portals.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-slate-200 border-t-4 ${item.borderColor} flex flex-col justify-between`}
          >
            <div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>
            <button
              onClick={() => onSelectRole(item.role)}
              className="text-sm font-semibold text-slate-900 hover:text-indigo-600 flex items-center gap-1 transition-colors self-start cursor-pointer"
            >
              {item.btnText}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-12 text-xs text-slate-400">
        Campus Link System • Live Cloud Realtime Integration (Supabase)
      </p>
    </div>
  );
}