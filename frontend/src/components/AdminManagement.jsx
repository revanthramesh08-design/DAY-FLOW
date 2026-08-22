import React, { useEffect, useState } from 'react';

import {
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Briefcase,
  User,
  MapPin,
  AlertCircle,
  ChevronDown,
  LogOut,
  KeyRound
} from 'lucide-react';

import './AdminManagement.css';

const MOCK_SUMMARY = {
  totalEmployees: 148,
  presentToday: 132,
  pendingLeaves: 12,
  payrollStatus: 'Processing (85%)'
};

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-101',
    profilePicture: 'https://i.pravatar.cc/160?img=47',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@dayflow.com',
    username: 'sarah',
    employeePassword: 'sarah123',
    phone: '+1-415-555-0101',
    department: 'Engineering',
    role: 'Senior Frontend Dev',
    jobTitle: 'Senior Frontend Developer',
    status: 'Active',
    joinDate: '2022-03-15',
    salary: 125000,
    currency: 'USD',
    location: 'San Francisco, CA'
  },
  {
    id: 'EMP-102',
    profilePicture: 'https://i.pravatar.cc/160?img=12',
    name: 'Michael Chen',
    email: 'michael.chen@dayflow.com',
    username: 'michael',
    employeePassword: 'michael123',
    phone: '+1-415-555-0102',
    department: 'Product',
    role: 'Product Manager',
    jobTitle: 'Senior Product Manager',
    status: 'Active',
    joinDate: '2021-07-20',
    salary: 135000,
    currency: 'USD',
    location: 'San Francisco, CA'
  },
  {
    id: 'EMP-103',
    profilePicture: 'https://i.pravatar.cc/160?img=32',
    name: 'Amara Patel',
    email: 'amara.patel@dayflow.com',
    username: 'amara',
    employeePassword: 'amara123',
    phone: '+1-415-555-0103',
    department: 'HR',
    role: 'HR Specialist',
    jobTitle: 'HR Specialist',
    status: 'On Leave',
    joinDate: '2023-01-10',
    salary: 85000,
    currency: 'USD',
    location: 'Remote'
  },
  {
    id: 'EMP-104',
    profilePicture: 'https://i.pravatar.cc/160?img=11',
    name: 'David Kim',
    email: 'david.kim@dayflow.com',
    username: 'david',
    employeePassword: 'david123',
    phone: '+1-415-555-0104',
    department: 'Engineering',
    role: 'Backend Lead',
    jobTitle: 'Backend Engineering Lead',
    status: 'Active',
    joinDate: '2020-11-05',
    salary: 145000,
    currency: 'USD',
    location: 'San Francisco, CA'
  },
  {
    id: 'EMP-105',
    profilePicture: 'https://i.pravatar.cc/160?img=44',
    name: 'Elena Rostova',
    email: 'elena.rostova@dayflow.com',
    username: 'elena',
    employeePassword: 'elena123',
    phone: '+1-415-555-0105',
    department: 'Design',
    role: 'UI/UX Designer',
    jobTitle: 'Lead UI/UX Designer',
    status: 'Inactive',
    joinDate: '2022-06-12',
    salary: 115000,
    currency: 'USD',
    location: 'New York, NY'
  },
  {
    id: 'EMP-106',
    profilePicture: 'https://i.pravatar.cc/160?img=53',
    name: 'James Wilson',
    email: 'james.wilson@dayflow.com',
    username: 'james',
    employeePassword: 'james123',
    phone: '+1-415-555-0106',
    department: 'Finance',
    role: 'Financial Analyst',
    jobTitle: 'Senior Financial Analyst',
    status: 'Active',
    joinDate: '2021-02-22',
    salary: 105000,
    currency: 'USD',
    location: 'Chicago, IL'
  },
  {
    id: 'EMP-107',
    profilePicture: 'https://i.pravatar.cc/160?img=49',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@dayflow.com',
    username: 'sophia',
    employeePassword: 'sophia123',
    phone: '+1-415-555-0107',
    department: 'Engineering',
    role: 'DevOps Engineer',
    jobTitle: 'DevOps Engineer',
    status: 'Active',
    joinDate: '2022-09-08',
    salary: 130000,
    currency: 'USD',
    location: 'Austin, TX'
  },
  {
    id: 'EMP-108',
    profilePicture: 'https://i.pravatar.cc/160?img=68',
    name: 'Robert Taylor',
    email: 'robert.taylor@dayflow.com',
    username: 'robert',
    employeePassword: 'robert123',
    phone: '+1-415-555-0108',
    department: 'Product',
    role: 'UX Researcher',
    jobTitle: 'Senior UX Researcher',
    status: 'Active',
    joinDate: '2023-04-18',
    salary: 110000,
    currency: 'USD',
    location: 'Seattle, WA'
  },
  {
    id: 'EMP-109',
    profilePicture: '',
    name: 'Employee User',
    email: 'employee@dayflow.com',
    username: 'employee',
    employeePassword: 'employee123',
    phone: '',
    department: 'Engineering',
    role: 'Software Developer',
    jobTitle: 'Software Developer',
    status: 'Active',
    joinDate: '2024-01-01',
    salary: 50000,
    currency: 'USD',
    location: 'Remote'
  }
];

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

const getDefaultAttendance = (status) => {
  if (status === 'On Leave') {
    return {
      status: 'leave',
      checkIn: null,
      checkOut: null
    };
  }

  return {
    status: 'absent',
    checkIn: null,
    checkOut: null
  };
};

const getAttendanceState = (attendance) => {
  switch (attendance?.status) {
    case 'present':
      return {
        label: 'Present',
        className: 'present'
      };

    case 'leave':
      return {
        label: 'On Leave',
        className: 'leave'
      };

    case 'checked-out':
      return {
        label: 'Checked Out',
        className: 'checked-out'
      };

    default:
      return {
        label: 'Absent',
        className: 'absent'
      };
  }
};

const getStoredEmployees = () => {
  try {
    const stored =
      localStorage.getItem('dayflow_employees');

    if (stored) {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error(
      'Unable to load employees:',
      error
    );
  }

  return INITIAL_EMPLOYEES;
};

export default function AdminManagement() {

  const [activeTab, setActiveTab] =
    useState('employees');

  const [searchTerm, setSearchTerm] =
    useState('');

  const [selectedDept, setSelectedDept] =
    useState('All');

  const [selectedRole, setSelectedRole] =
    useState('All');

  const [selectedStatus, setSelectedStatus] =
    useState('All');

  const [employees, setEmployees] =
    useState(getStoredEmployees);

  const [attendanceRecords, setAttendanceRecords] =
    useState(() =>
      Object.fromEntries(
        getStoredEmployees().map((emp) => [
          emp.id,
          getDefaultAttendance(emp.status)
        ])
      )
    );

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [showDetailsPanel, setShowDetailsPanel] =
    useState(false);

  const [modalMode, setModalMode] =
    useState('add');

  const [selectedEmp, setSelectedEmp] =
    useState({
      id: '',
      profilePicture: '',
      name: '',
      email: '',
      username: '',
      employeePassword: '',
      phone: '',
      department: 'Engineering',
      role: '',
      jobTitle: '',
      status: 'Active',
      joinDate: '',
      salary: 0,
      currency: 'USD',
      location: ''
    });

  const [orgSettings, setOrgSettings] =
    useState({
      companyName: 'DAY-FLOW Corp',
      timezone: 'UTC -5 (EST)',
      workHours: '09:00 AM - 05:00 PM',
      autoApproveLeaves: false
    });

  // =========================
  // SAVE EMPLOYEES
  // =========================

  useEffect(() => {
    localStorage.setItem(
      'dayflow_employees',
      JSON.stringify(employees)
    );
  }, [employees]);

  // =========================
  // FILTER OPTIONS
  // =========================

  const departments = [
    'All',
    ...new Set(
      employees.map((emp) => emp.department)
    )
  ];

  const roles = [
    'All',
    ...new Set(
      employees.map((emp) => emp.role)
    )
  ];

  const statuses = [
    'All',
    'Active',
    'On Leave',
    'Inactive'
  ];

  // =========================
  // FILTER EMPLOYEES
  // =========================

  const filteredEmployees =
    employees.filter((emp) => {

      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        emp.name
          .toLowerCase()
          .includes(search) ||
        emp.id
          .toLowerCase()
          .includes(search) ||
        emp.email
          .toLowerCase()
          .includes(search) ||
        emp.role
          .toLowerCase()
          .includes(search) ||
        (emp.username || '')
          .toLowerCase()
          .includes(search);

      const matchesDept =
        selectedDept === 'All' ||
        emp.department === selectedDept;

      const matchesRole =
        selectedRole === 'All' ||
        emp.role === selectedRole;

      const matchesStatus =
        selectedStatus === 'All' ||
        emp.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDept &&
        matchesRole &&
        matchesStatus
      );
    });

  // =========================
  // ADD EMPLOYEE
  // =========================

  const handleOpenAdd = () => {

    setModalMode('add');

    const newId =
      `EMP-${Math.floor(
        100 +
        Math.random() * 900
      )}`;

    setSelectedEmp({
      id: newId,
      profilePicture: '',
      name: '',
      email: '',
      username: '',
      employeePassword: '',
      phone: '',
      department: 'Engineering',
      role: '',
      jobTitle: '',
      status: 'Active',
      joinDate:
        new Date()
          .toISOString()
          .split('T')[0],
      salary: 0,
      currency: 'USD',
      location: ''
    });

    setShowModal(true);
  };

  // =========================
  // EDIT EMPLOYEE
  // =========================

  const handleOpenEdit = (emp) => {
    setModalMode('edit');

    setSelectedEmp({
      username: '',
      employeePassword: '',
      ...emp
    });

    setShowModal(true);
  };

  // =========================
  // VIEW EMPLOYEE
  // =========================

  const handleOpenView = (emp) => {
    setSelectedEmp(emp);
    setShowDetailsPanel(true);
  };

  // =========================
  // PROFILE
  // =========================

  const handleOpenProfile = () => {

    const profile = employees[0];

    if (!profile) return;

    setShowProfileMenu(false);

    handleOpenView(profile);
  };

  // =========================
  // CHECK IN
  // =========================

  const handleCheckIn = (empId) => {

    const now = new Date();

    setAttendanceRecords((prev) => ({
      ...prev,

      [empId]: {
        status: 'present',
        checkIn: now.toISOString(),
        checkOut: null
      }
    }));
  };

  // =========================
  // CHECK OUT
  // =========================

  const handleCheckOut = (empId) => {

    const now = new Date();

    setAttendanceRecords((prev) => ({
      ...prev,

      [empId]: {
        ...(prev[empId] ||
          getDefaultAttendance('Active')),

        status: 'checked-out',

        checkOut:
          now.toISOString()
      }
    }));
  };

  // =========================
  // GET ATTENDANCE
  // =========================

  const getEmployeeAttendance = (emp) => {

    return (
      attendanceRecords[emp.id] ||
      getDefaultAttendance(emp.status)
    );
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {

    if (
      window.confirm(
        'Are you sure you want to delete this employee?'
      )
    ) {

      setEmployees((prev) =>
        prev.filter(
          (emp) => emp.id !== id
        )
      );

      setAttendanceRecords((prev) => {

        const next = {
          ...prev
        };

        delete next[id];

        return next;
      });
    }
  };

  // =========================
  // SAVE ADD / EDIT
  // =========================

  const handleSaveModal = (e) => {

    e.preventDefault();

    // =========================
    // VALIDATE LOGIN
    // =========================

    if (
      !selectedEmp.username.trim()
    ) {
      alert(
        'Please enter an employee username.'
      );
      return;
    }

    if (
      !selectedEmp.employeePassword.trim()
    ) {
      alert(
        'Please enter an employee password.'
      );
      return;
    }

    // =========================
    // DUPLICATE USERNAME
    // =========================

    const duplicateUsername =
      employees.some(
        (emp) =>
          emp.username?.toLowerCase() ===
            selectedEmp.username
              .trim()
              .toLowerCase() &&
          emp.id !== selectedEmp.id
      );

    if (duplicateUsername) {
      alert(
        'This username already exists.'
      );
      return;
    }

    // =========================
    // ADD
    // =========================

    if (modalMode === 'add') {

      const newEmployee = {
        ...selectedEmp,
        username:
          selectedEmp.username.trim(),
        employeePassword:
          selectedEmp.employeePassword.trim()
      };

      setEmployees((prev) => [
        ...prev,
        newEmployee
      ]);

      setAttendanceRecords((prev) => ({
        ...prev,

        [newEmployee.id]:
          getDefaultAttendance(
            newEmployee.status
          )
      }));
    }

    // =========================
    // EDIT
    // =========================

    if (modalMode === 'edit') {

      const updatedEmployee = {
        ...selectedEmp,
        username:
          selectedEmp.username.trim(),
        employeePassword:
          selectedEmp.employeePassword.trim()
      };

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id ===
          updatedEmployee.id
            ? updatedEmployee
            : emp
        )
      );
    }

    setShowModal(false);
  };

  return (
    <div className="admin-container">

      {/* =========================
          HEADER
      ========================= */}

      <header className="admin-header">

        <div>

          <h1>
            Admin Management
          </h1>

          <p className="admin-subtitle">
            Manage organization settings,
            staff records, roles, and permissions.
          </p>

        </div>

        <div className="admin-header-actions">

          <button
            className={`tab-btn ${
              activeTab === 'employees'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('employees')
            }
          >
            Employees
          </button>

          <button
            className={`tab-btn ${
              activeTab === 'settings'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('settings')
            }
          >
            Settings
          </button>

          <div className="profile-menu-wrap">

            <button
              className="profile-avatar-btn"
              type="button"
              onClick={() =>
                setShowProfileMenu(
                  (prev) => !prev
                )
              }
              aria-label="Open profile menu"
              aria-expanded={
                showProfileMenu
              }
            >

              <img
                src={
                  employees[0]
                    ?.profilePicture
                }
                alt={
                  employees[0]?.name ||
                  'Profile'
                }
                className="profile-avatar"
              />

              <ChevronDown size={16} />

            </button>

            {showProfileMenu && (

              <div className="profile-dropdown">

                <button
                  type="button"
                  onClick={
                    handleOpenProfile
                  }
                >
                  <User size={16} />
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowProfileMenu(
                      false
                    )
                  }
                >
                  <LogOut size={16} />
                  Log Out
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* =========================
          SUMMARY
      ========================= */}

      <section className="summary-grid">

        <div className="summary-card">

          <div className="card-icon blue">
            <User size={24} />
          </div>

          <div className="card-info">

            <span className="card-label">
              Total Employees
            </span>

            <span className="card-value">
              {MOCK_SUMMARY.totalEmployees}
            </span>

          </div>

        </div>

        <div className="summary-card">

          <div className="card-icon green">
            <AlertCircle size={24} />
          </div>

          <div className="card-info">

            <span className="card-label">
              Present Today
            </span>

            <span className="card-value">
              {MOCK_SUMMARY.presentToday}
            </span>

          </div>

        </div>

        <div className="summary-card">

          <div className="card-icon orange">
            <Calendar size={24} />
          </div>

          <div className="card-info">

            <span className="card-label">
              Pending Leave Requests
            </span>

            <span className="card-value">
              {MOCK_SUMMARY.pendingLeaves}
            </span>

          </div>

        </div>

        <div className="summary-card">

          <div className="card-icon purple">
            <DollarSign size={24} />
          </div>

          <div className="card-info">

            <span className="card-label">
              Payroll Status
            </span>

            <span className="card-value">
              {MOCK_SUMMARY.payrollStatus}
            </span>

          </div>

        </div>

      </section>

      {/* =========================
          EMPLOYEES
      ========================= */}

      {activeTab === 'employees' ? (

        <section className="content-card">

          <div className="directory-toolbar">

            <div>

              <span className="directory-label">
                Employee Directory
              </span>

              <h2>
                Team Members
              </h2>

              <p>
                Click an employee card
                to open their profile.
              </p>

            </div>

            <button
              className="btn btn-primary new-employee-btn"
              onClick={handleOpenAdd}
            >
              + New
            </button>

          </div>

          {/* SEARCH */}

          <div className="directory-search-row">

            <div className="toolbar-search">

              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="filters-row">

              <select
                value={selectedDept}
                onChange={(e) =>
                  setSelectedDept(
                    e.target.value
                  )
                }
                className="filter-select"
              >

                <option value="All">
                  All Departments
                </option>

                {departments
                  .filter(
                    (d) => d !== 'All'
                  )
                  .map((dept) => (
                    <option
                      key={dept}
                      value={dept}
                    >
                      {dept}
                    </option>
                  ))}

              </select>

              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value
                  )
                }
                className="filter-select"
              >

                <option value="All">
                  All Roles
                </option>

                {roles
                  .filter(
                    (r) => r !== 'All'
                  )
                  .map((role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {role}
                    </option>
                  ))}

              </select>

              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value
                  )
                }
                className="filter-select"
              >

                <option value="All">
                  All Status
                </option>

                {statuses
                  .filter(
                    (s) => s !== 'All'
                  )
                  .map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}

              </select>

              {(
                selectedDept !== 'All' ||
                selectedRole !== 'All' ||
                selectedStatus !== 'All' ||
                searchTerm
              ) && (

                <button
                  className="btn-reset-filters"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDept('All');
                    setSelectedRole('All');
                    setSelectedStatus('All');
                  }}
                >
                  Clear
                </button>

              )}

            </div>

          </div>

          {/* EMPLOYEE CARDS */}

          <div className="employee-card-grid">

            {filteredEmployees.length > 0 ? (

              filteredEmployees.map(
                (emp) => {

                  const attendanceRecord =
                    getEmployeeAttendance(
                      emp
                    );

                  const attendance =
                    getAttendanceState(
                      attendanceRecord
                    );

                  return (

                    <article
                      key={emp.id}
                      className="employee-card"
                      onClick={() =>
                        handleOpenView(emp)
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {

                        if (
                          e.key === 'Enter' ||
                          e.key === ' '
                        ) {
                          handleOpenView(
                            emp
                          );
                        }

                      }}
                    >

                      <div className="employee-card-top">

                        <div className="employee-avatar-wrap">

                          {emp.profilePicture ? (

                            <img
                              src={
                                emp.profilePicture
                              }
                              alt={emp.name}
                              className="employee-avatar"
                            />

                          ) : (

                            <div className="employee-avatar employee-avatar-fallback">
                              {getInitials(
                                emp.name
                              )}
                            </div>

                          )}

                        </div>

                        <span
                          className={`attendance-dot ${attendance.className}`}
                          title={
                            attendance.label
                          }
                          aria-label={
                            attendance.label
                          }
                        />

                      </div>

                      <div className="employee-card-body">

                        <h3>
                          {emp.name}
                        </h3>

                        <p className="employee-card-role">
                          {emp.jobTitle ||
                            emp.role}
                        </p>

                        <p className="employee-card-meta">
                          {emp.department}
                        </p>

                        <span
                          className={`card-status status-${attendance.className}`}
                        >
                          {attendance.label}
                        </span>

                        <div
                          className="attendance-actions"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          {attendanceRecord.status ===
                            'absent' &&
                            emp.status !==
                              'Inactive' && (

                              <button
                                type="button"
                                className="attendance-btn check-in-btn"
                                onClick={() =>
                                  handleCheckIn(
                                    emp.id
                                  )
                                }
                              >
                                Check IN →
                              </button>

                            )}

                          {attendanceRecord.status ===
                            'leave' && (

                            <span className="attendance-message">
                              On Leave
                            </span>

                          )}

                          {attendanceRecord.status ===
                            'present' && (

                            <>
                              <span className="attendance-time">
                                Since{' '}
                                {new Date(
                                  attendanceRecord.checkIn
                                ).toLocaleTimeString(
                                  [],
                                  {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  }
                                )}
                              </span>

                              <button
                                type="button"
                                className="attendance-btn check-out-btn"
                                onClick={() =>
                                  handleCheckOut(
                                    emp.id
                                  )
                                }
                              >
                                Check OUT →
                              </button>
                            </>

                          )}

                          {attendanceRecord.status ===
                            'checked-out' && (

                            <span className="attendance-message checked-out">
                              Checked Out
                            </span>

                          )}

                        </div>

                      </div>

                      <div
                        className="employee-card-actions"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >

                        <button
                          className="btn-icon edit"
                          title="Edit"
                          onClick={() =>
                            handleOpenEdit(
                              emp
                            )
                          }
                        >
                          <Briefcase size={16} />
                        </button>

                        <button
                          className="btn-icon delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(
                              emp.id
                            )
                          }
                        >
                          <AlertCircle size={16} />
                        </button>

                      </div>

                    </article>

                  );
                }
              )

            ) : (

              <div className="empty-state card-empty-state">
                No employees found matching
                your criteria.
              </div>

            )}

          </div>

        </section>

      ) : (

        /* =========================
           SETTINGS
        ========================= */

        <section className="settings-grid">

          <div className="content-card settings-box">

            <h3>
              🏢 Organization Settings
            </h3>

            <div className="form-group">

              <label>
                Company Name
              </label>

              <input
                type="text"
                value={
                  orgSettings.companyName
                }
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    companyName:
                      e.target.value
                  })
                }
              />

            </div>

            <div className="form-group">

              <label>
                System Timezone
              </label>

              <input
                type="text"
                value={
                  orgSettings.timezone
                }
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    timezone:
                      e.target.value
                  })
                }
              />

            </div>

            <div className="form-group">

              <label>
                Standard Work Hours
              </label>

              <input
                type="text"
                value={
                  orgSettings.workHours
                }
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    workHours:
                      e.target.value
                  })
                }
              />

            </div>

          </div>

          <div className="content-card settings-box">

            <h3>
              🔑 Roles & Permissions
            </h3>

            <div className="role-item">

              <div>
                <strong>
                  Super Admin
                </strong>

                <p>
                  Full system access,
                  manage organization
                  setup & payrolls.
                </p>
              </div>

              <span className="status-badge status-active">
                Full
              </span>

            </div>

            <div className="role-item">

              <div>
                <strong>
                  HR Manager
                </strong>

                <p>
                  Manage employee
                  directory, leave
                  approvals, attendance.
                </p>
              </div>

              <span className="status-badge status-active">
                Elevated
              </span>

            </div>

            <div className="role-item">

              <div>
                <strong>
                  Employee
                </strong>

                <p>
                  View personal dashboard,
                  submit leave requests,
                  access payslips.
                </p>
              </div>

              <span className="status-badge status-inactive">
                Standard
              </span>

            </div>

          </div>

          <div className="content-card settings-box full-width">

            <h3>
              ⚙️ System Configurations
            </h3>

            <label className="checkbox-label">

              <input
                type="checkbox"
                checked={
                  orgSettings.autoApproveLeaves
                }
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    autoApproveLeaves:
                      e.target.checked
                  })
                }
              />

              Auto-approve leave requests
              under 2 days duration

            </label>

            <br />

            <button
              className="btn btn-primary"
              style={{
                marginTop: '1rem'
              }}
              onClick={() =>
                alert(
                  'Settings Saved!'
                )
              }
            >
              Save Settings
            </button>

          </div>

        </section>

      )}

      {/* =========================
          DETAILS PANEL
      ========================= */}

      {showDetailsPanel && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowDetailsPanel(false)
          }
        >

          <div
            className="details-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-btn"
              onClick={() =>
                setShowDetailsPanel(false)
              }
            >
              ×
            </button>

            <div className="details-header">

              <div className="details-profile-heading">

                {selectedEmp.profilePicture ? (

                  <img
                    src={
                      selectedEmp.profilePicture
                    }
                    alt={
                      selectedEmp.name
                    }
                    className="details-avatar"
                  />

                ) : (

                  <div className="details-avatar details-avatar-fallback">
                    {getInitials(
                      selectedEmp.name
                    )}
                  </div>

                )}

                <h2>
                  {selectedEmp.name}
                </h2>

              </div>

              <span
                className={`status-badge status-${selectedEmp.status
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {selectedEmp.status}
              </span>

            </div>

            <div className="details-content">

              {/* PERSONAL */}

              <div className="details-section">

                <h3>
                  <User size={18} />
                  Personal Details
                </h3>

                <div className="details-grid">

                  <div className="detail-item">

                    <label>
                      Employee ID
                    </label>

                    <p>
                      {selectedEmp.id}
                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      Full Name
                    </label>

                    <p>
                      {selectedEmp.name}
                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      <Mail size={14} />
                      Email
                    </label>

                    <p>

                      <a
                        href={`mailto:${selectedEmp.email}`}
                      >
                        {selectedEmp.email}
                      </a>

                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      <Phone size={14} />
                      Phone
                    </label>

                    <p>

                      <a
                        href={`tel:${selectedEmp.phone}`}
                      >
                        {selectedEmp.phone}
                      </a>

                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      <MapPin size={14} />
                      Location
                    </label>

                    <p>
                      {selectedEmp.location}
                    </p>

                  </div>

                </div>

              </div>

              {/* JOB DETAILS */}

              <div className="details-section">

                <h3>
                  <Briefcase size={18} />
                  Job Details
                </h3>

                <div className="details-grid">

                  <div className="detail-item">

                    <label>
                      Department
                    </label>

                    <p>
                      {selectedEmp.department}
                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      Job Title
                    </label>

                    <p>
                      {selectedEmp.jobTitle}
                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      Role
                    </label>

                    <p>
                      {selectedEmp.role}
                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      <Calendar size={14} />
                      Join Date
                    </label>

                    <p>
                      {selectedEmp.joinDate
                        ? new Date(
                            selectedEmp.joinDate
                          ).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )
                        : '-'}
                    </p>

                  </div>

                </div>

              </div>

              {/* LOGIN INFORMATION */}

              <div className="details-section">

                <h3>
                  <KeyRound size={18} />
                  Login Information
                </h3>

                <div className="details-grid">

                  <div className="detail-item">

                    <label>
                      Username
                    </label>

                    <p>
                      {selectedEmp.username ||
                        '-'}
                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      Password
                    </label>

                    <p>
                      {selectedEmp.employeePassword
                        ? '••••••••'
                        : '-'}
                    </p>

                  </div>

                </div>

              </div>

              {/* SALARY */}

              <div className="details-section">

                <h3>
                  <DollarSign size={18} />
                  Salary Information
                </h3>

                <div className="details-grid">

                  <div className="detail-item">

                    <label>
                      Annual Salary
                    </label>

                    <p className="salary-value">

                      {selectedEmp.currency}{' '}

                      {Number(
                        selectedEmp.salary
                      ).toLocaleString()}

                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      Monthly Salary
                    </label>

                    <p className="salary-value">

                      {selectedEmp.currency}{' '}

                      {Math.round(
                        Number(
                          selectedEmp.salary
                        ) / 12
                      ).toLocaleString()}

                    </p>

                  </div>

                  <div className="detail-item">

                    <label>
                      Currency
                    </label>

                    <p>
                      {selectedEmp.currency}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="details-actions">

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowDetailsPanel(
                    false
                  )
                }
              >
                Close
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {

                  setShowDetailsPanel(
                    false
                  );

                  handleOpenEdit(
                    selectedEmp
                  );

                }}
              >
                Edit Employee
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h3>

              {modalMode === 'add' &&
                'Add New Employee'}

              {modalMode === 'edit' &&
                'Edit Employee'}

            </h3>

            {/* PROFILE */}

            <div className="modal-avatar-row">

              {selectedEmp.profilePicture ? (

                <img
                  src={
                    selectedEmp.profilePicture
                  }
                  alt={
                    selectedEmp.name ||
                    'Employee'
                  }
                  className="modal-avatar"
                />

              ) : (

                <div className="modal-avatar modal-avatar-fallback">

                  {getInitials(
                    selectedEmp.name
                  )}

                </div>

              )}

              <div>

                <strong>
                  {selectedEmp.name ||
                    'New Employee'}
                </strong>

                <span>
                  Employee login credentials
                  can be created below.
                </span>

              </div>

            </div>

            <form
              onSubmit={
                handleSaveModal
              }
            >

              {/* ID / NAME */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Employee ID
                  </label>

                  <input
                    type="text"
                    value={
                      selectedEmp.id
                    }
                    disabled
                  />

                </div>

                <div className="form-group">

                  <label>
                    Full Name{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      selectedEmp.name
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        name:
                          e.target.value
                      })
                    }
                  />

                </div>

              </div>

              {/* EMAIL / PHONE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Email{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="email"
                    required
                    value={
                      selectedEmp.email
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        email:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Phone{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="tel"
                    required
                    value={
                      selectedEmp.phone
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        phone:
                          e.target.value
                      })
                    }
                  />

                </div>

              </div>

              {/* USERNAME / PASSWORD */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Username{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      selectedEmp.username
                    }
                    placeholder="Example: john"
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        username:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Employee Password{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="password"
                    required
                    value={
                      selectedEmp.employeePassword
                    }
                    placeholder="Create password"
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        employeePassword:
                          e.target.value
                      })
                    }
                  />

                </div>

              </div>

              {/* DEPARTMENT / JOB TITLE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Department{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    required
                    value={
                      selectedEmp.department
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        department:
                          e.target.value
                      })
                    }
                  >

                    <option value="Engineering">
                      Engineering
                    </option>

                    <option value="Product">
                      Product
                    </option>

                    <option value="HR">
                      HR
                    </option>

                    <option value="Design">
                      Design
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Job Title{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      selectedEmp.jobTitle
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        jobTitle:
                          e.target.value
                      })
                    }
                  />

                </div>

              </div>

              {/* ROLE / LOCATION */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Role{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      selectedEmp.role
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        role:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    value={
                      selectedEmp.location
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        location:
                          e.target.value
                      })
                    }
                  />

                </div>

              </div>

              {/* JOIN DATE / STATUS */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Join Date{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="date"
                    required
                    value={
                      selectedEmp.joinDate
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        joinDate:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Status{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    required
                    value={
                      selectedEmp.status
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        status:
                          e.target.value
                      })
                    }
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="On Leave">
                      On Leave
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

              {/* SALARY */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Annual Salary{' '}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={
                      selectedEmp.salary
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        salary:
                          Number(
                            e.target.value
                          )
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Currency
                  </label>

                  <select
                    value={
                      selectedEmp.currency
                    }
                    onChange={(e) =>
                      setSelectedEmp({
                        ...selectedEmp,
                        currency:
                          e.target.value
                      })
                    }
                  >

                    <option value="USD">
                      USD
                    </option>

                    <option value="EUR">
                      EUR
                    </option>

                    <option value="GBP">
                      GBP
                    </option>

                    <option value="INR">
                      INR
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {modalMode === 'add'
                    ? 'Add Employee'
                    : 'Save Changes'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}