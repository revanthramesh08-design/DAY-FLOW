import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Clock, 
  Calendar, 
  DollarSign, 
  LogOut 
} from 'lucide-react';

export default function Sidebar({ isOpen }) {
  const employeeLinks = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/employee/profile', icon: User },
    { name: 'Attendance', path: '/employee/attendance', icon: Clock },
    { name: 'Leave', path: '/employee/leave', icon: Calendar },
    { name: 'Payroll', path: '/employee/payroll', icon: DollarSign },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col justify-between shrink-0 h-full`}>
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          {isOpen ? (
            <div>
              <h1 className="text-lg font-bold tracking-wide text-white leading-none">Dayflow</h1>
              <p className="text-[11px] text-slate-400 mt-1 leading-none">Every workday, perfectly aligned.</p>
            </div>
          ) : (
            <span className="text-lg font-bold text-slate-200 mx-auto">DF</span>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {employeeLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={18} className="shrink-0" />
                {isOpen && <span className="truncate">{link.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut size={18} className="shrink-0" />
          {isOpen && <span>Logout</span>}
        </NavLink>
      </div>
    </aside>
  );
}