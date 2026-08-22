import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  LogIn,
  LogOut,
  Users,
  TrendingUp,
  TrendingDown,
  Zap,
  Download,
  Eye,
  MapPin
} from 'lucide-react';
import './Attendance.css';

// Get today's date
const today = new Date().toISOString().split('T')[0];

const MOCK_SUMMARY = {
  totalEmployees: 148,
  presentToday: 132,
  absentToday: 12,
  halfDayToday: 4,
  onLeaveToday: 0
};

// Generate realistic mock attendance records
const INITIAL_ATTENDANCE = [
  {
    id: 'ATT-001',
    employeeId: 'EMP-101',
    employeeName: 'Sarah Jenkins',
    department: 'Engineering',
    date: today,
    checkIn: '09:05 AM',
    checkOut: '05:45 PM',
    workingHours: 8.67,
    status: 'Present',
    location: 'San Francisco Office'
  },
  {
    id: 'ATT-002',
    employeeId: 'EMP-102',
    employeeName: 'Michael Chen',
    department: 'Product',
    date: today,
    checkIn: '08:52 AM',
    checkOut: '05:30 PM',
    workingHours: 8.63,
    status: 'Present',
    location: 'San Francisco Office'
  },
  {
    id: 'ATT-003',
    employeeId: 'EMP-103',
    employeeName: 'Amara Patel',
    department: 'HR',
    date: today,
    checkIn: '-',
    checkOut: '-',
    workingHours: 0,
    status: 'Leave',
    location: '-'
  },
  {
    id: 'ATT-004',
    employeeId: 'EMP-104',
    employeeName: 'David Kim',
    department: 'Engineering',
    date: today,
    checkIn: '09:15 AM',
    checkOut: '02:00 PM',
    workingHours: 4.75,
    status: 'Half-day',
    location: 'San Francisco Office'
  },
  {
    id: 'ATT-005',
    employeeId: 'EMP-105',
    employeeName: 'Elena Rostova',
    department: 'Design',
    date: today,
    checkIn: '-',
    checkOut: '-',
    workingHours: 0,
    status: 'Absent',
    location: '-'
  },
  {
    id: 'ATT-006',
    employeeId: 'EMP-106',
    employeeName: 'James Wilson',
    department: 'Finance',
    date: today,
    checkIn: '09:00 AM',
    checkOut: '05:30 PM',
    workingHours: 8.5,
    status: 'Present',
    location: 'Chicago Office'
  },
  {
    id: 'ATT-007',
    employeeId: 'EMP-107',
    employeeName: 'Sophia Martinez',
    department: 'Engineering',
    date: today,
    checkIn: '09:20 AM',
    checkOut: '05:45 PM',
    workingHours: 8.42,
    status: 'Present',
    location: 'Remote'
  },
  {
    id: 'ATT-008',
    employeeId: 'EMP-108',
    employeeName: 'Robert Taylor',
    department: 'Product',
    date: today,
    checkIn: '-',
    checkOut: '-',
    workingHours: 0,
    status: 'Absent',
    location: '-'
  },
  {
    id: 'ATT-009',
    employeeId: 'EMP-109',
    employeeName: 'Lisa Anderson',
    department: 'Engineering',
    date: today,
    checkIn: '10:05 AM',
    checkOut: '06:00 PM',
    workingHours: 7.92,
    status: 'Present',
    location: 'San Francisco Office'
  },
  {
    id: 'ATT-010',
    employeeId: 'EMP-110',
    employeeName: 'Marcus Johnson',
    department: 'Finance',
    date: today,
    checkIn: '09:30 AM',
    checkOut: '05:45 PM',
    workingHours: 8.25,
    status: 'Present',
    location: 'Chicago Office'
  },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [attendance] = useState(INITIAL_ATTENDANCE);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Get unique departments
  const departments = ['All', ...new Set(attendance.map(a => a.department))];
  const statuses = ['All', 'Present', 'Absent', 'Half-day', 'Leave'];

  // Filter attendance records
  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || record.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || record.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailsPanel(true);
  };

  const handleExport = () => {
    alert('Export functionality would export attendance data as CSV');
  };

  return (
    <div className="attendance-container">
      {/* Page Header */}
      <header className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p className="attendance-subtitle">Track and manage employee attendance records with real-time insights.</p>
          <p className="current-date">
            <Calendar size={16} className="inline-icon" />
            Current Date: {new Date(today).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button className="btn btn-primary export-btn" onClick={handleExport}>
          <Download size={16} />
          Export Report
        </button>
      </header>

      {/* Summary Cards */}
      <section className="summary-grid">
        <div className="summary-card">
          <div className="card-icon blue">
            <Users size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Total Employees</span>
            <span className="card-value">{MOCK_SUMMARY.totalEmployees}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Present Today</span>
            <span className="card-value">{MOCK_SUMMARY.presentToday}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon red">
            <TrendingDown size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Absent Today</span>
            <span className="card-value">{MOCK_SUMMARY.absentToday}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon orange">
            <Zap size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Half Day Today</span>
            <span className="card-value">{MOCK_SUMMARY.halfDayToday}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon purple">
            <Clock size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">On Leave Today</span>
            <span className="card-value">{MOCK_SUMMARY.onLeaveToday}</span>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="content-card">
        <div className="filters-header">
          <h3>Filters</h3>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="filter-date"
            />
          </div>

          <div className="filter-group">
            <label>Search Employee</label>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="filter-select"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Attendance Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {(selectedDate !== today || searchTerm || selectedDept !== 'All' || selectedStatus !== 'All') && (
            <button
              className="btn-reset-filters"
              onClick={() => {
                setSelectedDate(today);
                setSearchTerm('');
                setSelectedDept('All');
                setSelectedStatus('All');
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </section>

      {/* Attendance Table */}
      <section className="content-card">
        <div className="table-responsive">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Date</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="emp-name">{record.employeeName}</td>
                    <td className="emp-id">{record.employeeId}</td>
                    <td>{record.department}</td>
                    <td className="emp-date">
                      <Calendar size={14} className="inline-icon" />
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="time-cell">
                      <LogIn size={14} className="inline-icon" />
                      {record.checkIn}
                    </td>
                    <td className="time-cell">
                      <LogOut size={14} className="inline-icon" />
                      {record.checkOut}
                    </td>
                    <td className="work-hours">
                      {record.workingHours > 0 ? `${record.workingHours.toFixed(2)} hrs` : '-'}
                    </td>
                    <td>
                      <span
                        className={`status-badge status-${record.status.toLowerCase().replace('-', '')}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-icon view"
                        title="View Details"
                        onClick={() => handleViewDetails(record)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No attendance records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Attendance Details Panel */}
      {showDetailsPanel && selectedRecord && (
        <div className="modal-overlay" onClick={() => setShowDetailsPanel(false)}>
          <div className="details-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowDetailsPanel(false)}
            >
              ×
            </button>

            <div className="details-header">
              <h2>{selectedRecord.employeeName}</h2>
              <span
                className={`status-badge status-${selectedRecord.status
                  .toLowerCase()
                  .replace('-', '')}`}
              >
                {selectedRecord.status}
              </span>
            </div>

            <div className="details-content">
              {/* Basic Information */}
              <div className="details-section">
                <h3>
                  <User size={18} /> Basic Information
                </h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Employee ID</label>
                    <p>{selectedRecord.employeeId}</p>
                  </div>
                  <div className="detail-item">
                    <label>Employee Name</label>
                    <p>{selectedRecord.employeeName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Department</label>
                    <p>{selectedRecord.department}</p>
                  </div>
                  <div className="detail-item">
                    <label>
                      <MapPin size={14} /> Location
                    </label>
                    <p>{selectedRecord.location}</p>
                  </div>
                </div>
              </div>

              {/* Attendance Details */}
              <div className="details-section">
                <h3>
                  <Calendar size={18} /> Attendance Details
                </h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Date</label>
                    <p>
                      {new Date(selectedRecord.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="detail-item">
                    <label>
                      <LogIn size={14} /> Check-in Time
                    </label>
                    <p>{selectedRecord.checkIn}</p>
                  </div>
                  <div className="detail-item">
                    <label>
                      <LogOut size={14} /> Check-out Time
                    </label>
                    <p>{selectedRecord.checkOut}</p>
                  </div>
                  <div className="detail-item">
                    <label>
                      <Clock size={14} /> Working Hours
                    </label>
                    <p className="work-hours-value">
                      {selectedRecord.workingHours > 0 ? `${selectedRecord.workingHours.toFixed(2)} hrs` : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div className="details-section">
                <h3>Attendance Status</h3>
                <div className="status-info">
                  <p>
                    <strong>Current Status:</strong> {selectedRecord.status}
                  </p>
                  {selectedRecord.status === 'Present' && (
                    <p className="status-remark">Employee was present and worked full hours.</p>
                  )}
                  {selectedRecord.status === 'Half-day' && (
                    <p className="status-remark">
                      Employee worked partial hours ({selectedRecord.workingHours} hrs).
                    </p>
                  )}
                  {selectedRecord.status === 'Absent' && (
                    <p className="status-remark">Employee was absent without prior notice.</p>
                  )}
                  {selectedRecord.status === 'Leave' && (
                    <p className="status-remark">Employee was on approved leave.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="details-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetailsPanel(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
