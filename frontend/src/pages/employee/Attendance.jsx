import React, { useState, useContext } from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import * as AuthModule from '../../context/AuthContext';

export default function Attendance() {
  const AuthContext = AuthModule.AuthContext || AuthModule.default;
  const auth = useContext(AuthContext) || {};
  const { user, updateStatus } = auth;

  const [isCheckedIn, setIsCheckedIn] = useState(user?.status === 'Active');

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    if (updateStatus) updateStatus('Active'); // Automatically changes status to Active
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    if (updateStatus) updateStatus('Inactive'); // Automatically changes status to Inactive
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Attendance Clock</h2>
        <p className="text-xs text-slate-500">Current Status: 
          <span className={`ml-2 font-bold ${user?.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
            {user?.status || 'Inactive'}
          </span>
        </p>

        <div className="flex gap-4 justify-center">
          {!isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <LogIn size={16} /> Check In (Go Active)
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <LogOut size={16} /> Check Out (Go Inactive)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}