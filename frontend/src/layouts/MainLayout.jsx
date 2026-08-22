import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Clock, Calendar, DollarSign, Users, LogOut, Shield } from 'lucide-react';
import AuthContext from '../context/AuthContext';

export default function MainLayout({ role }) {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const logout = auth?.logout;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const employeeLinks = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/employee/profile', icon: User },
    { name: 'Attendance', path: '/employee/attendance', icon: Clock },
    { name: 'Leave', path: '/employee/leave', icon: Calendar },
    { name: 'Payroll', path: '/employee/payroll', icon: DollarSign },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/admin/employees', icon: Users },
    { name: 'Attendance', path: '/admin/attendance', icon: Clock },
    { name: 'Leaves', path: '/admin/leaves', icon: Calendar },
    { name: 'Payroll', path: '/admin/payroll', icon: DollarSign },
  ];

  const navLinks = role === 'admin' ? adminLinks : employeeLinks;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Role Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
              DF
            </div>
            <span className="font-bold text-lg tracking-wide hidden sm:inline">Dayflow HRMS</span>
            <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${
              role === 'admin' 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
              {role} View
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section & Logout */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{user?.name || 'User'}</div>
              <div className="text-[10px] text-slate-400">{user?.email || 'user@dayflow.com'}</div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="md:hidden flex overflow-x-auto bg-slate-950 px-2 py-1.5 border-t border-slate-800 gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                <Icon size={12} />
                {link.name}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}