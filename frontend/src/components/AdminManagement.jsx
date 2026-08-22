import React, { useState } from 'react';
import './AdminManagement.css';

const MOCK_SUMMARY = {
  totalEmployees: 148,
  presentToday: 132,
  pendingLeaves: 12,
  payrollStatus: 'Processing (85%)'
};

const INITIAL_EMPLOYEES = [
  { id: 'EMP-101', name: 'Sarah Jenkins', department: 'Engineering', role: 'Senior Frontend Dev', status: 'Active' },
  { id: 'EMP-102', name: 'Michael Chen', department: 'Product', role: 'Product Manager', status: 'Active' },
  { id: 'EMP-103', name: 'Amara Patel', department: 'HR', role: 'HR Specialist', status: 'On Leave' },
  { id: 'EMP-104', name: 'David Kim', department: 'Engineering', role: 'Backend Lead', status: 'Active' },
  { id: 'EMP-105', name: 'Elena Rostova', department: 'Design', role: 'UI/UX Designer', status: 'Inactive' },
  { id: 'EMP-106', name: 'James Wilson', department: 'Finance', role: 'Financial Analyst', status: 'Active' },
];

export default function AdminManagement() {
  const [activeTab, setActiveTab] = useState('employees'); // 'employees' | 'settings'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [selectedEmp, setSelectedEmp] = useState({ id: '', name: '', department: 'Engineering', role: '', status: 'Active' });

  // Organization settings local state
  const [orgSettings, setOrgSettings] = useState({
    companyName: 'DAY-FLOW Corp',
    timezone: 'UTC -5 (EST)',
    workHours: '09:00 AM - 05:00 PM',
    autoApproveLeaves: false
  });

  // Filter handlers
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Modal Handlers
  const handleOpenAdd = () => {
    setModalMode('add');
    setSelectedEmp({
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      department: 'Engineering',
      role: '',
      status: 'Active'
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
    setShowModal(true);
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
          <div className="card-icon blue">👥</div>
          <div className="card-info">
            <span className="card-label">Total Employees</span>
            <span className="card-value">{MOCK_SUMMARY.totalEmployees}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon green">✅</div>
          <div className="card-info">
            <span className="card-label">Present Today</span>
            <span className="card-value">{MOCK_SUMMARY.presentToday}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon orange">⏳</div>
          <div className="card-info">
            <span className="card-label">Pending Leave Requests</span>
            <span className="card-value">{MOCK_SUMMARY.pendingLeaves}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon purple">💳</div>
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
                placeholder="Search by name, ID, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="HR">HR</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              + Add Employee
            </button>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Role</th>
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
                      <td>{emp.department}</td>
                      <td>{emp.role}</td>
                      <td>
                        <span className={`status-badge status-${emp.status.toLowerCase().replace(' ', '-')}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-buttons">
                          <button className="btn-icon view" title="View" onClick={() => handleOpenView(emp)}>
                            👁️
                          </button>
                          <button className="btn-icon edit" title="Edit" onClick={() => handleOpenEdit(emp)}>
                            ✏️
                          </button>
                          <button className="btn-icon delete" title="Delete" onClick={() => handleDelete(emp.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">
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

      {/* Action Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {modalMode === 'add' && 'Add New Employee'}
              {modalMode === 'edit' && 'Edit Employee'}
              {modalMode === 'view' && 'Employee Details'}
            </h3>
            <form onSubmit={handleSaveModal}>
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" value={selectedEmp.id} disabled />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  disabled={modalMode === 'view'}
                  value={selectedEmp.name}
                  onChange={(e) => setSelectedEmp({ ...selectedEmp, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
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
                <label>Role</label>
                <input
                  type="text"
                  required
                  disabled={modalMode === 'view'}
                  value={selectedEmp.role}
                  onChange={(e) => setSelectedEmp({ ...selectedEmp, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  disabled={modalMode === 'view'}
                  value={selectedEmp.status}
                  onChange={(e) => setSelectedEmp({ ...selectedEmp, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
                {modalMode !== 'view' && (
                  <button type="submit" className="btn btn-primary">
                    Save Changes
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