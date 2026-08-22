import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <Menu size={18} />
        </button>
        <span className="text-sm font-semibold text-slate-700">Dayflow HRMS Platform</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-slate-700">User Account</span>
        </div>
      </div>
    </header>
  );
}