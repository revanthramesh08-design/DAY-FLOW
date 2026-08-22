import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import * as AuthModule from '../context/AuthContext';

export default function Header() {
  // Gracefully handles named exports, default exports, or missing contexts
  const AuthContext = AuthModule.AuthContext || AuthModule.default;
  const contextValue = useContext(AuthContext) || {};
  
  const user = contextValue?.user || { name: 'Employee' };
  const logout = contextValue?.logout || (() => {});

  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs">DF</span>
            Dayflow
          </div>

          <nav className="hidden md:flex gap-1">
            <NavLink
              to="/employee/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              Employees
            </NavLink>
            <NavLink
              to="/employee/attendance"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              Attendance
            </NavLink>
            <NavLink
              to="/employee/leave"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              Time Off
            </NavLink>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                }`}
              ></span>
              <span className="text-xs text-slate-300 font-medium">
                {isCheckedIn ? 'Present' : 'Checked Out'}
              </span>
            </div>
            <button
              onClick={() => setIsCheckedIn(!isCheckedIn)}
              className={`text-xs px-2.5 py-1 rounded font-semibold transition-colors ${
                isCheckedIn
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isCheckedIn ? 'Check Out' : 'Check IN'}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm border-2 border-slate-700 hover:border-blue-400 transition-all"
            >
              {user?.name ? user.name.charAt(0) : 'E'}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-slate-800 z-50">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/employee/profile');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 flex items-center gap-2"
                >
                  <User size={14} /> My Profile
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100"
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}