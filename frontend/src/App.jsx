import React, { useState } from 'react';
import AdminManagement from './components/AdminManagement';
import Attendance from './components/Attendance';
import Reports from './components/Reports';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('admin');

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <h2>DAY-FLOW</h2>
        </div>
        <nav className="nav-menu">
          <button
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeView === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveView('employees')}
          >
            👥 Employees
          </button>
          <button
            className={`nav-item ${activeView === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveView('attendance')}
          >
            📅 Attendance
          </button>
          <button
            className={`nav-item ${activeView === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveView('reports')}
          >
            📊 Reports
          </button>
          <button
            className={`nav-item ${activeView === 'leave' ? 'active' : ''}`}
            onClick={() => setActiveView('leave')}
          >
            📝 Leave Requests
          </button>
          <button
            className={`nav-item ${activeView === 'payroll' ? 'active' : ''}`}
            onClick={() => setActiveView('payroll')}
          >
            💳 Payroll
          </button>
          <button
            className={`nav-item ${activeView === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveView('admin')}
          >
            ⚙️ Admin Management
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header / Search Bar */}
        <header className="top-header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <span className="user-avatar">AD</span>
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">System Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route/View Viewport */}
        <main className="view-content">
          {activeView === 'admin' ? (
            <AdminManagement />
          ) : activeView === 'attendance' ? (
            <Attendance />
          ) : activeView === 'reports' ? (
            <Reports />
          ) : (
            <div className="placeholder-view">
              <h2>{activeView.toUpperCase()} Section</h2>
              <p>This module remains intact and unchanged.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}