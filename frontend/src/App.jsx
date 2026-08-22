import React, { useState } from 'react';

import AdminManagement from './components/AdminManagement';
import Attendance from './components/Attendance';
import Reports from './components/Reports';

import './App.css';

export default function App() {

  // =========================
  // LOGIN STATE
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userType, setUserType] = useState('');

  // admin / employee tab
  const [loginMode, setLoginMode] = useState('admin');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');

  // =========================
  // ADMIN DASHBOARD
  // =========================

  const [activeView, setActiveView] = useState('admin');

  // =========================
  // LOGIN FUNCTION
  // =========================

  const handleLogin = (e) => {

    e.preventDefault();

    // -------------------------
    // ADMIN LOGIN
    // -------------------------

    if (
      loginMode === 'admin' &&
      username === 'admin' &&
      password === 'admin123'
    ) {

      setIsLoggedIn(true);
      setUserType('admin');
      setLoginError('');

      setActiveView('admin');

      return;
    }

    // -------------------------
    // EMPLOYEE LOGIN
    // -------------------------

    if (
      loginMode === 'employee' &&
      username === 'employee' &&
      password === 'employee123'
    ) {

      setIsLoggedIn(true);
      setUserType('employee');
      setLoginError('');

      return;
    }

    // -------------------------
    // WRONG LOGIN
    // -------------------------

    setLoginError(
      loginMode === 'admin'
        ? 'Invalid admin username or password'
        : 'Invalid employee username or password'
    );
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    setIsLoggedIn(false);
    setUserType('');
    setLoginMode('admin');

    setUsername('');
    setPassword('');
    setLoginError('');

    setActiveView('admin');
  };

  // =========================
  // CHANGE LOGIN MODE
  // =========================

  const changeLoginMode = (mode) => {

    setLoginMode(mode);

    setUsername('');
    setPassword('');
    setLoginError('');
  };

  // =====================================================
  // LOGIN PAGE
  // =====================================================

  if (!isLoggedIn) {

    return (

      <div className="login-page">

        <div className="login-card">

          {/* LOGO */}

          <h1>DAY-FLOW</h1>

          <p className="login-subtitle">
            Employee Management System
          </p>


          {/* =========================================
              ADMIN / EMPLOYEE TABS
          ========================================= */}

          <div className="login-tabs">

            {/* ADMIN */}

            <button
              type="button"
              className={
                loginMode === 'admin'
                  ? 'login-tab active'
                  : 'login-tab'
              }
              onClick={() => changeLoginMode('admin')}
            >
              👨‍💼 Admin Login
            </button>


            {/* EMPLOYEE */}

            <button
              type="button"
              className={
                loginMode === 'employee'
                  ? 'login-tab active'
                  : 'login-tab'
              }
              onClick={() => changeLoginMode('employee')}
            >
              👤 Employee Login
            </button>

          </div>


          {/* =========================================
              LOGIN TITLE
          ========================================= */}

          <h2 className="selected-login-title">

            {loginMode === 'admin'
              ? 'Admin Login'
              : 'Employee Login'}

          </h2>


          {/* =========================================
              LOGIN FORM
          ========================================= */}

          <form onSubmit={handleLogin}>

            {/* USERNAME */}

            <div className="login-form-group">

              <label>
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder={
                  loginMode === 'admin'
                    ? 'Enter admin username'
                    : 'Enter employee username'
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                required
              />

            </div>


            {/* ERROR */}

            {loginError && (

              <p className="login-error">
                {loginError}
              </p>

            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >

              {loginMode === 'admin'
                ? 'Login as Admin'
                : 'Login as Employee'}

            </button>

          </form>


          {/* =========================================
              DEMO CREDENTIALS
          ========================================= */}

          <div className="demo-login">

            {loginMode === 'admin' ? (

              <p>
                Admin:
                <strong> admin / admin123</strong>
              </p>

            ) : (

              <p>
                Employee:
                <strong> employee / employee123</strong>
              </p>

            )}

          </div>

        </div>

      </div>

    );
  }


  // =====================================================
  // EMPLOYEE DASHBOARD
  // =====================================================

  if (userType === 'employee') {

    return (

      <div className="app-container">

        {/* =========================================
            EMPLOYEE SIDEBAR
        ========================================= */}

        <aside className="sidebar">

          <div className="logo-container">

            <h2>
              DAY-FLOW
            </h2>

          </div>


          <nav className="nav-menu">

            <button
              className="nav-item active"
            >
              👤 My Profile
            </button>


            <button
              className="nav-item"
            >
              📅 My Attendance
            </button>


            <button
              className="nav-item"
            >
              📝 Leave Requests
            </button>


            <button
              className="nav-item"
            >
              💳 My Payroll
            </button>

          </nav>

        </aside>


        {/* =========================================
            EMPLOYEE MAIN CONTENT
        ========================================= */}

        <div className="main-content">

          {/* HEADER */}

          <header className="top-header">

            <div>

              <h3>
                Employee Dashboard
              </h3>

            </div>


            <div className="user-profile">

              <span className="user-avatar">
                EM
              </span>


              <div className="user-info">

                <span className="user-name">
                  Employee User
                </span>

                <span className="user-role">
                  Employee
                </span>

              </div>


              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </header>


          {/* EMPLOYEE PAGE */}

          <main className="view-content">

            <div className="placeholder-view">

              <h2>
                Welcome to DAY-FLOW 👋
              </h2>

              <p>
                You are logged in as an Employee.
              </p>


              <br />


              {/* PROFILE */}

              <div className="employee-info-box">

                <h3>
                  My Profile
                </h3>


                <p>
                  <strong>Name:</strong>{' '}
                  Employee User
                </p>


                <p>
                  <strong>Employee ID:</strong>{' '}
                  EMP-109
                </p>


                <p>
                  <strong>Email:</strong>{' '}
                  employee@dayflow.com
                </p>


                <p>
                  <strong>Department:</strong>{' '}
                  Engineering
                </p>


                <p>
                  <strong>Job Title:</strong>{' '}
                  Software Developer
                </p>


                <p>
                  <strong>Role:</strong>{' '}
                  Developer
                </p>


                <p>
                  <strong>Location:</strong>{' '}
                  Chennai
                </p>


                <p>
                  <strong>Status:</strong>{' '}
                  Active
                </p>

              </div>

            </div>

          </main>

        </div>

      </div>

    );
  }


  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  return (

    <div className="app-container">

      {/* =========================================
          ADMIN SIDEBAR
      ========================================= */}

      <aside className="sidebar">

        <div className="logo-container">

          <h2>
            DAY-FLOW
          </h2>

        </div>


        <nav className="nav-menu">

          {/* DASHBOARD */}

          <button
            className={
              activeView === 'dashboard'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('dashboard')
            }
          >
            📊 Dashboard
          </button>


          {/* EMPLOYEES */}

          <button
            className={
              activeView === 'employees'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('employees')
            }
          >
            👥 Employees
          </button>


          {/* ATTENDANCE */}

          <button
            className={
              activeView === 'attendance'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('attendance')
            }
          >
            📅 Attendance
          </button>


          {/* REPORTS */}

          <button
            className={
              activeView === 'reports'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('reports')
            }
          >
            📊 Reports
          </button>


          {/* LEAVE */}

          <button
            className={
              activeView === 'leave'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('leave')
            }
          >
            📝 Leave Requests
          </button>


          {/* PAYROLL */}

          <button
            className={
              activeView === 'payroll'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('payroll')
            }
          >
            💳 Payroll
          </button>


          {/* ADMIN MANAGEMENT */}

          <button
            className={
              activeView === 'admin'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              setActiveView('admin')
            }
          >
            ⚙️ Admin Management
          </button>

        </nav>

      </aside>


      {/* =========================================
          ADMIN MAIN CONTENT
      ========================================= */}

      <div className="main-content">

        {/* HEADER */}

        <header className="top-header">

          <div className="search-bar">

            <input
              type="text"
              placeholder="Search..."
            />

          </div>


          <div className="user-profile">

            <span className="user-avatar">
              AD
            </span>


            <div className="user-info">

              <span className="user-name">
                Admin User
              </span>

              <span className="user-role">
                System Admin
              </span>

            </div>


            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </header>


        {/* =========================================
            ADMIN PAGE CONTENT
        ========================================= */}

        <main className="view-content">

          {/* ADMIN MANAGEMENT */}

          {activeView === 'admin' ? (

            <AdminManagement />

          ) : activeView === 'attendance' ? (

            <Attendance />

          ) : activeView === 'reports' ? (

            <Reports />

          ) : (

            <div className="placeholder-view">

              <h2>
                {activeView.toUpperCase()} Section
              </h2>

              <p>
                This module remains intact and unchanged.
              </p>

            </div>

          )}

        </main>

      </div>

    </div>

  );
}