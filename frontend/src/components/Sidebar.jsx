import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BusFront, Clock, MapPin, LogOut, User, Activity } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To know which tab is active

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('student_data');
    navigate('/login');
  };

  // Helper to style active vs inactive tabs
  const getTabClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-4 w-full text-left transition-colors ${
      isActive ? 'text-orange-300 font-bold' : 'text-gray-400 hover:text-white'
    }`;
  };

  return (
    <div className="w-64 border-r border-white/10 p-8 flex flex-col justify-between bg-black/10">
      <div>
        <div className="flex items-center space-x-2 mb-16">
           <BusFront className="w-8 h-8 text-orange-300" />
           <span className="font-bold text-xl tracking-wider">TRANSIT</span>
        </div>
        <nav className="space-y-6">
          <button onClick={() => navigate('/dashboard')} className={getTabClass('/dashboard')}>
            <Activity className="w-5 h-5" /><span>Overview</span>
          </button>
          <button onClick={() => navigate('/book')} className={getTabClass('/book')}>
            <MapPin className="w-5 h-5" /><span>Book Ride</span>
          </button>
          <button className={getTabClass('/history')}>
            <Clock className="w-5 h-5" /><span>History</span>
          </button>
          <button className={getTabClass('/profile')}>
            <User className="w-5 h-5" /><span>Profile</span>
          </button>
        </nav>
      </div>
      <button onClick={handleLogout} className="flex items-center space-x-4 text-red-400 hover:text-red-300 transition-colors w-full text-left">
        <LogOut className="w-5 h-5" /><span>Sign out</span>
      </button>
    </div>
  );
};

export default Sidebar;