import React, { useState } from 'react';

export default function LoginPage({ selectedRole, onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Role ke mutabiq details
  const roleConfig = {
    student: {
      title: 'Student Portal Access',
      badge: 'Official College ID Required',
      placeholder: 'your.roll@college.edu',
      domainHint: 'Must end with @college.edu',
      accentColor: 'border-emerald-500 text-emerald-600'
    },
    recruiter: {
      title: 'Enterprise Recruiter Login',
      badge: 'Company / Corporate Verification',
      placeholder: 'hr@company.com',
      domainHint: 'Official corporate work email',
      accentColor: 'border-sky-500 text-sky-600'
    },
    admin: {
      title: 'Placement Cell (TPO) Admin',
      badge: 'Restricted Administration Only',
      placeholder: 'tpo.admin@college.edu',
      domainHint: 'Authorised administrative credentials',
      accentColor: 'border-rose-500 text-rose-600'
    }
  };

  const current = roleConfig[selectedRole] || roleConfig.student;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both Email and Password.');
      return;
    }

    // Role-specific strict domain validation
    if (selectedRole === 'student') {
      if (!email.toLowerCase().endsWith('@college.edu')) {
        setError('Access Denied: Only official college issued emails (@college.edu) allowed.');
        return;
      }
    } else if (selectedRole === 'admin') {
      if (!email.toLowerCase().includes('admin') && !email.toLowerCase().includes('tpo')) {
        setError('Access Denied: Unauthorized admin ID.');
        return;
      }
    } else if (selectedRole === 'recruiter') {
      if (email.toLowerCase().endsWith('@college.edu')) {
        setError('Access Denied: College student IDs cannot access recruiter dashboard.');
        return;
      }
    }

    // Demo password check (Baad mein Supabase Auth se bind kar sakti ho)
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Login successful: pass entered user data
    onLoginSuccess({
      email: email,
      role: selectedRole
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 flex items-center gap-1"
        >
          ← Back to All Portals
        </button>

        {/* Portal Header */}
        <div className="mb-6">
          <span className={`text-xs uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-100 ${current.accentColor}`}>
            {current.badge}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-3">{current.title}</h2>
          <p className="text-xs text-slate-500 mt-1">{current.domainHint}</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
            ⚠️ {error}
          </div>
        )}

        {/* Dynamic Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Official Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={current.placeholder}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Secret Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm shadow transition-all mt-2"
          >
            Authenticate & Enter
          </button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <p className="text-xs text-slate-400">
            End-to-end encrypted session • RBAC Guard Active
          </p>
        </div>
      </div>
    </div>
  );
}