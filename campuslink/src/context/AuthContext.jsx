import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Predefined demo profiles for instant login
  const demoProfiles = {
    student: {
      id: 'st_101',
      name: 'Rahul Sharma',
      role: 'student',
      branch: 'Computer Science',
      year: '4th Year',
      cgpa: 8.8,
      isClubLead: true,
      clubName: 'Tech Innovators Club',
      skills: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      hiddenSkills: ['System Design', 'API Performance Tuning'],
    },
    admin: {
      id: 'adm_01',
      name: 'Dr. R. K. Verma',
      role: 'admin',
      department: 'Training & Placement Cell',
    },
    recruiter: {
      id: 'rec_01',
      name: 'Neha Kapoor',
      role: 'recruiter',
      company: 'CloudTech Solutions',
      activeDrives: 2,
    },
  };

  const [user, setUser] = useState(null);
  const [activeRoleMode, setActiveRoleMode] = useState('student');
  const [isHighContrast, setIsHighContrast] = useState(false);

  const login = (role, email) => {
    const profile = demoProfiles[role] || { id: 'u_custom', role, name: email.split('@')[0] };
    setUser(profile);
    setActiveRoleMode(role);
  };

  const quickDemoLogin = (roleKey) => {
    setUser(demoProfiles[roleKey]);
    setActiveRoleMode(roleKey);
  };

  const toggleClubLeadMode = () => {
    if (user?.isClubLead) {
      setActiveRoleMode((prev) => (prev === 'student' ? 'club_lead' : 'student'));
    }
  };

  const logout = () => {
    setUser(null);
    setActiveRoleMode('student');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeRoleMode,
        isHighContrast,
        setIsHighContrast,
        login,
        quickDemoLogin,
        toggleClubLeadMode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);