import React, { useState } from 'react';
import { Mail, Phone, Calendar, DollarSign, Briefcase, User, MapPin, AlertCircle } from 'lucide-react';
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
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@dayflow.com',
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
    name: 'Michael Chen',
    email: 'michael.chen@dayflow.com',
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
    name: 'Amara Patel',
    email: 'amara.patel@dayflow.com',
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
    name: 'David Kim',
    email: 'david.kim@dayflow.com',
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
    name: 'Elena Rostova',
    email: 'elena.rostova@dayflow.com',
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
    name: 'James Wilson',
    email: 'james.wilson@dayflow.com',
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
    name: 'Sophia Martinez',
    email: 'sophia.martinez@dayflow.com',
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
    name: 'Robert Taylor',
    email: 'robert.taylor@dayflow.com',
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
];

export default function AdminManagement() {
  const [activeTab, setActiveTab] = useState('employees'); // 'employees' | 'settings'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [selectedEmp, setSelectedEmp] = useState({
    id: '',
    name: '',
    email: '',
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

  // Organization settings local state
  const [orgSettings, setOrgSettings] = useState({
    companyName: 'DAY-FLOW Corp',
    timezone: 'UTC -5 (EST)',
    workHours: '09:00 AM - 05:00 PM',
    autoApproveLeaves: false
  });

  // Get unique roles and departments
  const departments = ['All', ...new Set(employees.map(e => e.department))];
  const roles = ['All', ...new Set(employees.map(e => e.role))];
  const statuses = ['All', 'Active', 'On Leave', 'Inactive'];

  // Filter handlers
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesRole = selectedRole === 'All' || emp.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  // Modal Handlers
  const handleOpenAdd = () => {
    setModalMode('add');
    setSelectedEmp({
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      email: '',
      phone: '',
      department: 'Engineering',
      role: '',
      jobTitle: '',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      salary: 0,
      currency: 'USD',
      location: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (emp) => {
    setModalMode('edit');
    setSelectedEmp({ ...emp });
    setShowModal(true);
  };

  const handleOpenView = (emp) => {
    setModalMode('view');
    setSelectedEmp({ ...emp });
    setShowDetailsPanel(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      setEmployees([...employees, selectedEmp]);
    } else if (modalMode === 'edit') {
      setEmployees(employees.map((emp) => (emp.id === selectedEmp.id ? selectedEmp : emp)));
    }
    setShowModal(false);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1>Admin Management</h1>
          <p className="admin-subtitle">Manage organization settings, staff records, roles, and permissions.</p>
        </div>
        <div className="admin-header-actions">
          <button
            className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Employee Directory
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            System Settings
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="summary-grid">
        <div className="summary-card">
          <div className="card-icon blue">
            <User size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Total Employees</span>
            <span className="card-value">{MOCK_SUMMARY.totalEmployees}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon green">
            <AlertCircle size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Present Today</span>
            <span className="card-value">{MOCK_SUMMARY.presentToday}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon orange">
            <Calendar size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Pending Leave Requests</span>
            <span className="card-value">{MOCK_SUMMARY.pendingLeaves}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon purple">
            <DollarSign size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Payroll Status</span>
            <span className="card-value">{MOCK_SUMMARY.payrollStatus}</span>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      {activeTab === 'employees' ? (
        <section className="content-card">
          <div className="table-toolbar">
            <div className="toolbar-search">
              <input
                type="text"
                placeholder="Search by name, ID, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              + Add Employee
            </button>
          </div>

          {/* Filters */}
          <div className="filters-row">
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="filter-select">
              <option value="All">All Departments</option>
              {departments.filter(d => d !== 'All').map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="filter-select">
              <option value="All">All Roles</option>
              {roles.filter(r => r !== 'All').map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="filter-select">
              <option value="All">All Status</option>
              {statuses.filter(s => s !== 'All').map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {(selectedDept !== 'All' || selectedRole !== 'All' || selectedStatus !== 'All' || searchTerm) && (
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDept('All');
                  setSelectedRole('All');
                  setSelectedStatus('All');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="emp-id">{emp.id}</td>
                      <td className="emp-name">{emp.name}</td>
                      <td className="emp-email">
                        <Mail size={14} className="inline-icon" /> {emp.email}
                      </td>
                      <td>{emp.department}</td>
                      <td>{emp.role}</td>
                      <td className="emp-joindate">
                        <Calendar size={14} className="inline-icon" /> {new Date(emp.joinDate).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`status-badge status-${emp.status.toLowerCase().replace(' ', '-')}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-buttons">
                          <button className="btn-icon view" title="View Details" onClick={() => handleOpenView(emp)}>
                            <User size={16} />
                          </button>
                          <button className="btn-icon edit" title="Edit" onClick={() => handleOpenEdit(emp)}>
                            <Briefcase size={16} />
                          </button>
                          <button className="btn-icon delete" title="Delete" onClick={() => handleDelete(emp.id)}>
                            <AlertCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="empty-state">
                      No employees found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="settings-grid">
          {/* Organization Settings */}
          <div className="content-card settings-box">
            <h3>🏢 Organization Settings</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={orgSettings.companyName}
                onChange={(e) => setOrgSettings({ ...orgSettings, companyName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>System Timezone</label>
              <input
                type="text"
                value={orgSettings.timezone}
                onChange={(e) => setOrgSettings({ ...orgSettings, timezone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Standard Work Hours</label>
              <input
                type="text"
                value={orgSettings.workHours}
                onChange={(e) => setOrgSettings({ ...orgSettings, workHours: e.target.value })}
              />
            </div>
          </div>

          {/* User Roles & Permissions */}
          <div className="content-card settings-box">
            <h3>🔑 Roles & Permissions</h3>
            <div className="role-item">
              <div>
                <strong>Super Admin</strong>
                <p>Full system access, manage organization setup & payrolls.</p>
              </div>
              <span className="status-badge status-active">Full</span>
            </div>
            <div className="role-item">
              <div>
                <strong>HR Manager</strong>
                <p>Manage employee directory, leave approvals, attendance.</p>
              </div>
              <span className="status-badge status-active">Elevated</span>
            </div>
            <div className="role-item">
              <div>
                <strong>Employee</strong>
                <p>View personal dashboard, submit leave requests, access payslips.</p>
              </div>
              <span className="status-badge status-inactive">Standard</span>
            </div>
          </div>

          {/* System Settings */}
          <div className="content-card settings-box full-width">
            <h3>⚙️ System Configurations</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={orgSettings.autoApproveLeaves}
                onChange={(e) => setOrgSettings({ ...orgSettings, autoApproveLeaves: e.target.checked })}
              />
              Auto-approve leave requests under 2 days duration
            </label>
            <br />
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => alert('Settings Saved!')}>
              Save Settings
            </button>
          </div>
        </section>
      )}

      {/* Employee Details Panel */}
      {showDetailsPanel && (
        <div className="modal-overlay" onClick={() => setShowDetailsPanel(false)}>
          <div className="details-panel" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowDetailsPanel(false)}>×</button>
            <div className="details-header">
              <h2>{selectedEmp.name}</h2>
              <span className={`status-badge status-${selectedEmp.status.toLowerCase().replace(' ', '-')}`}>
                {selectedEmp.status}
              </span>
            </div>

            <div className="details-content">
              {/* Personal Details */}
              <div className="details-section">
                <h3><User size={18} /> Personal Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Employee ID</label>
                    <p>{selectedEmp.id}</p>
                  </div>
                  <div className="detail-item">
                    <label>Full Name</label>
                    <p>{selectedEmp.name}</p>
                  </div>
                  <div className="detail-item">
                    <label><Mail size={14} /> Email</label>
                    <p><a href={`mailto:${selectedEmp.email}`}>{selectedEmp.email}</a></p>
                  </div>
                  <div className="detail-item">
                    <label><Phone size={14} /> Phone</label>
                    <p><a href={`tel:${selectedEmp.phone}`}>{selectedEmp.phone}</a></p>
                  </div>
                  <div className="detail-item">
                    <label><MapPin size={14} /> Location</label>
                    <p>{selectedEmp.location}</p>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="details-section">
                <h3><Briefcase size={18} /> Job Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Department</label>
                    <p>{selectedEmp.department}</p>
                  </div>
                  <div className="detail-item">
                    <label>Job Title</label>
                    <p>{selectedEmp.jobTitle}</p>
                  </div>
                  <div className="detail-item">
                    <label>Role</label>
                    <p>{selectedEmp.role}</p>
                  </div>
                  <div className="detail-item">
                    <label><Calendar size={14} /> Join Date</label>
                    <p>{new Date(selectedEmp.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div className="details-section">
                <h3><DollarSign size={18} /> Salary Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Annual Salary</label>
                    <p className="salary-value">{selectedEmp.currency} {selectedEmp.salary.toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Monthly Salary</label>
                    <p className="salary-value">{selectedEmp.currency} {Math.round(selectedEmp.salary / 12).toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Currency</label>
                    <p>{selectedEmp.currency}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-actions">
              <button className="btn btn-secondary" onClick={() => setShowDetailsPanel(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => {
                setShowDetailsPanel(false);
                handleOpenEdit(selectedEmp);
              }}>Edit Employee</button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>
              {modalMode === 'add' && 'Add New Employee'}
              {modalMode === 'edit' && 'Edit Employee'}
              {modalMode === 'view' && 'Employee Details'}
            </h3>
            <form onSubmit={handleSaveModal}>
              <div className="form-row">
                <div className="form-group">
                  <label>Employee ID</label>
                  <input type="text" value={selectedEmp.id} disabled />
                </div>
                <div className="form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.name}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email <span className="required">*</span></label>
                  <input
                    type="email"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.email}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone <span className="required">*</span></label>
                  <input
                    type="tel"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.phone}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department <span className="required">*</span></label>
                  <select
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.department}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, department: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="HR">HR</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Job Title <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.jobTitle}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, jobTitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Role <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.role}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, role: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    disabled={modalMode === 'view'}
                    value={selectedEmp.location}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Join Date <span className="required">*</span></label>
                  <input
                    type="date"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.joinDate}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, joinDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Status <span className="required">*</span></label>
                  <select
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.status}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Annual Salary <span className="required">*</span></label>
                  <input
                    type="number"
                    required
                    disabled={modalMode === 'view'}
                    value={selectedEmp.salary}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, salary: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select
                    disabled={modalMode === 'view'}
                    value={selectedEmp.currency}
                    onChange={(e) => setSelectedEmp({ ...selectedEmp, currency: e.target.value })}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                {modalMode !== 'view' && (
                  <button type="submit" className="btn btn-primary">
                    {modalMode === 'add' ? 'Add Employee' : 'Save Changes'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}