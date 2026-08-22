import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import * as AuthModule from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('alex.johnson@dayflow.com');
  const [password, setPassword] = useState('user123');
  
  const AuthContext = AuthModule.AuthContext || AuthModule.default;
  const auth = useContext(AuthContext) || {};
  const login = auth?.login;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Execute login logic
    const loggedUser = login ? login(email, password) : null;

    // Direct explicit role redirection
    if (loggedUser?.role === 'admin' || email.toLowerCase().includes('admin')) {
      navigate('/admin/dashboard');
    } else {
      navigate('/employee/dashboard');
    }
  };

  const fillCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@dayflow.com');
      setPassword('admin123');
    } else {
      setEmail('alex.johnson@dayflow.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950">
      {/* Visual Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 justify-between flex-col p-12">
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-base shadow-lg">
            DF
          </div>
          <span className="text-xl font-bold text-white tracking-wide">Dayflow HRMS</span>
        </div>

        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/30">
            <ShieldCheck size={14} /> Enterprise HR Operations
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Manage your workforce with efficiency.
          </h1>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © 2026 Dayflow HRMS.
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500">Select test credentials or enter details below.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
            <span className="font-semibold text-slate-600">Quick Test:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('employee')}
                className="px-3 py-1 bg-white border border-slate-200 rounded font-bold hover:border-blue-500 text-slate-700 shadow-sm"
              >
                Employee
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                className="px-3 py-1 bg-white border border-slate-200 rounded font-bold hover:border-blue-500 text-slate-700 shadow-sm"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors mt-2"
            >
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-xs text-center text-slate-500 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}