import { useState } from 'react';
import HomePortal from './pages/HomePortal';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

export default function App() {
  const [selectedPortal, setSelectedPortal] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // Central Notification State jo Admin aur Student dono mein share hogi
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Google Placement Drive 2026 Registration Open',
      category: 'Placement Drive',
      date: 'Today, 10:30 AM',
      description: 'Google is hiring Software Development Engineers. Minimum CGPA required is 8.0 with 0 active backlogs.',
      urgent: true
    },
    {
      id: 2,
      title: 'Resume & GitHub Verification Deadline',
      category: 'TPO Notice',
      date: 'Yesterday',
      description: 'All CSE students must update their verified project links before company shortlisting begins.',
      urgent: false
    }
  ]);

  // Admin se naya notice create karne ka handler
  const handleAddNotice = (newNotice) => {
    setNotices((prev) => [newNotice, ...prev]);
  };

  const handleSelectPortal = (role) => {
    setSelectedPortal(role);
  };

  const handleLoginSuccess = (userData) => {
    setAuthenticatedUser(userData);
  };

  const handleBackToPortals = () => {
    setSelectedPortal(null);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setSelectedPortal(null);
  };

  if (!selectedPortal) {
    return <HomePortal onSelectRole={handleSelectPortal} />;
  }

  if (!authenticatedUser) {
    return (
      <LoginPage 
        selectedRole={selectedPortal} 
        onLoginSuccess={handleLoginSuccess}
        onBack={handleBackToPortals}
      />
    );
  }

  // Student dashboard ko notices array pass ho raha hai
  if (authenticatedUser.role === 'student') {
    return <StudentDashboard user={authenticatedUser} notices={notices} onLogout={handleLogout} />;
  }

  // Admin dashboard ko notices array aur onAddNotice function pass ho raha hai
  if (authenticatedUser.role === 'admin') {
    return (
      <AdminDashboard 
        user={authenticatedUser} 
        notices={notices} 
        onAddNotice={handleAddNotice} 
        onLogout={handleLogout} 
      />
    );
  }

  if (authenticatedUser.role === 'recruiter') {
    return <RecruiterDashboard user={authenticatedUser} onLogout={handleLogout} />;
  }

  return <HomePortal onSelectRole={handleSelectPortal} />;
}