import React, { useContext, useState } from 'react';
import { Shield, User, Mail, Briefcase, DollarSign } from 'lucide-react';
import * as AuthModule from '../../context/AuthContext';

export default function Profile() {
  const AuthContext = AuthModule.AuthContext || AuthModule.default;
  const auth = useContext(AuthContext) || {};
  
  const currentUser = auth?.user || {
    name: 'New User',
    email: 'user@dayflow.com',
    role: 'employee',
    id: 'EMP_1001',
    status: 'Active'
  };

  // Local state to change account status dynamically
  const [accountStatus, setAccountStatus] = useState(currentUser.status || 'Active');
  const [activeTab, setActiveTab] = useState('personal');

  const [basicPay, setBasicPay] = useState(45000);
  const hra = Math.round(basicPay * 0.4);
  const allowance = 4000;
  const totalMonthly = Number(basicPay) + hra + allowance;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">{currentUser.name}</h1>
          <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 capitalize mt-1">
            <Shield size={12} /> {currentUser.role} Account
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('personal')}
          className={`pb-3 transition-colors ${activeTab === 'personal' ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-slate-900'}`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveTab('salary')}
          className={`pb-3 transition-colors ${activeTab === 'salary' ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-slate-900'}`}
        >
          Salary & Compensation
        </button>
      </div>

      {/* Tab 1: Personal Details */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b pb-3">
              <User size={16} className="text-blue-600" />
              <span className="font-bold text-slate-900 text-sm">Account Information</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Employee ID</span>
              <span className="font-semibold text-slate-800">{currentUser.id || 'EMP_001'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Full Name</span>
              <span className="font-semibold text-slate-800">{currentUser.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Email Address</span>
              <span className="font-semibold text-slate-800">{currentUser.email}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b pb-3">
              <Briefcase size={16} className="text-blue-600" />
              <span className="font-bold text-slate-900 text-sm">Work Settings</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Role</span>
              <span className="font-semibold text-slate-800 capitalize">{currentUser.role}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Department</span>
              <span className="font-semibold text-slate-800">Engineering</span>
            </div>

            {/* Dynamic Interactive Account Status Selector */}
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Account Status</span>
              <select
                value={accountStatus}
                onChange={(e) => setAccountStatus(e.target.value)}
                className={`font-semibold rounded px-2 py-0.5 border text-xs ${
                  accountStatus === 'Active'
                    ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                    : accountStatus === 'On Leave'
                    ? 'text-amber-600 bg-amber-50 border-amber-200'
                    : 'text-rose-600 bg-rose-50 border-rose-200'
                }`}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Salary Calculator */}
      {activeTab === 'salary' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Salary Breakdown</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-slate-500 mb-1 font-semibold">Basic Pay ($)</label>
              <input
                type="number"
                value={basicPay}
                onChange={(e) => setBasicPay(Number(e.target.value))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900 bg-white"
              />
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="block text-slate-500 mb-1 font-semibold">HRA (40%)</span>
              <span className="text-base font-bold text-slate-900">${hra.toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="block text-slate-500 mb-1 font-semibold">Allowance</span>
              <span className="text-base font-bold text-slate-900">${allowance.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex justify-between items-center text-xs">
            <span className="font-bold text-blue-900">Estimated Monthly Earnings:</span>
            <span className="text-lg font-extrabold text-blue-600">${totalMonthly.toLocaleString()} / mo</span>
          </div>
        </div>
      )}

    </div>
  );
}