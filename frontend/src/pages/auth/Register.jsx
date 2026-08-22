import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Dayflow</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Create your HRMS account</p>
        <p className="text-sm text-slate-600 mb-6">Registration is currently managed by HR admin.</p>
        <Link to="/login" className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700">
          Back to Login
        </Link>
      </div>
    </div>
  );
}