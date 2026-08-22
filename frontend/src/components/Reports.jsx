import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import './Reports.css';

const MOCK_MONTHLY_DATA = [
  { month: 'Jan', present: 130, absent: 15, leave: 3, halfDay: 0 },
  { month: 'Feb', present: 128, absent: 16, leave: 4, halfDay: 0 },
  { month: 'Mar', present: 135, absent: 10, leave: 3, halfDay: 0 },
  { month: 'Apr', present: 132, absent: 12, leave: 4, halfDay: 0 },
  { month: 'May', present: 138, absent: 8, leave: 2, halfDay: 0 },
  { month: 'Jun', present: 140, absent: 6, leave: 2, halfDay: 0 },
  { month: 'Jul', present: 136, absent: 10, leave: 2, halfDay: 0 },
  { month: 'Aug', present: 132, absent: 12, leave: 4, halfDay: 0 },
];

const MOCK_DEPARTMENT_DATA = [
  { name: 'Engineering', count: 45, percentage: 30.4 },
  { name: 'Product', count: 28, percentage: 18.9 },
  { name: 'HR', count: 15, percentage: 10.1 },
  { name: 'Design', count: 32, percentage: 21.6 },
  { name: 'Finance', count: 28, percentage: 18.9 },
];

const MOCK_SUMMARY = {
  totalEmployees: 148,
  presentToday: 132,
  absentToday: 12,
  onLeaveToday: 3,
  halfDayToday: 1,
  averageAttendance: 92.4,
  lateCheckIns: 24
};

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('Aug');

  const handleExport = () => {
    alert('Export functionality would generate a PDF/CSV report');
  };

  const currentMonthData = MOCK_MONTHLY_DATA.find(d => d.month === selectedMonth);
  const totalRecords = currentMonthData ? currentMonthData.present + currentMonthData.absent + currentMonthData.leave : 0;

  return (
    <div className="reports-container">
      {/* Page Header */}
      <header className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="reports-subtitle">Analyze attendance patterns, department statistics, and employee insights.</p>
        </div>
        <div className="header-actions">
          <div className="date-filter">
            <label>
              <Calendar size={16} />
              Select Month:
            </label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="filter-select">
              {MOCK_MONTHLY_DATA.map((data) => (
                <option key={data.month} value={data.month}>
                  {data.month}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary export-btn" onClick={handleExport}>
            <Download size={16} />
            Export Report
          </button>
        </div>
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
          <div className="card-icon purple">
            <Clock size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">On Leave Today</span>
            <span className="card-value">{MOCK_SUMMARY.onLeaveToday}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon orange">
            <AlertCircle size={24} />
          </div>
          <div className="card-info">
            <span className="card-label">Half Day Today</span>
            <span className="card-value">{MOCK_SUMMARY.halfDayToday}</span>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Monthly Attendance Chart */}
        <section className="content-card chart-card">
          <h3>
            <BarChart3 size={20} />
            Monthly Attendance Trend
          </h3>
          <div className="chart-container">
            <div className="bar-chart">
              {MOCK_MONTHLY_DATA.map((data) => {
                const total = data.present + data.absent + data.leave + data.halfDay;
                const presentPercent = (data.present / total) * 100;
                return (
                  <div key={data.month} className="chart-bar-group">
                    <div className="bar-wrapper">
                      <div className="bar-segment present" style={{ height: `${presentPercent}%` }} title={`Present: ${data.present}`}></div>
                      <div className="bar-segment absent" style={{ height: `${(data.absent / total) * 100}%` }} title={`Absent: ${data.absent}`}></div>
                      <div className="bar-segment leave" style={{ height: `${(data.leave / total) * 100}%` }} title={`Leave: ${data.leave}`}></div>
                    </div>
                    <label className={data.month === selectedMonth ? 'active' : ''}>{data.month}</label>
                  </div>
                );
              })}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color present"></span> Present
              </div>
              <div className="legend-item">
                <span className="legend-color absent"></span> Absent
              </div>
              <div className="legend-item">
                <span className="legend-color leave"></span> Leave
              </div>
            </div>
          </div>
        </section>

        {/* Department Analytics */}
        <section className="content-card chart-card">
          <h3>
            <Users size={20} />
            Employee Distribution by Department
          </h3>
          <div className="department-chart">
            {MOCK_DEPARTMENT_DATA.map((dept) => (
              <div key={dept.name} className="dept-item">
                <div className="dept-header">
                  <span className="dept-name">{dept.name}</span>
                  <span className="dept-count">{dept.count} employees</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${dept.percentage}%` }}></div>
                </div>
                <span className="dept-percentage">{dept.percentage}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Attendance Status Breakdown */}
      <section className="content-card">
        <h3>
          <BarChart3 size={20} />
          {selectedMonth} 2026 - Attendance Status Breakdown
        </h3>
        <div className="status-breakdown">
          <div className="breakdown-cards">
            <div className="breakdown-card present">
              <div className="breakdown-number">{currentMonthData?.present || 0}</div>
              <div className="breakdown-label">Present</div>
              <div className="breakdown-percentage">
                {totalRecords > 0 ? ((currentMonthData?.present / totalRecords) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="breakdown-card absent">
              <div className="breakdown-number">{currentMonthData?.absent || 0}</div>
              <div className="breakdown-label">Absent</div>
              <div className="breakdown-percentage">
                {totalRecords > 0 ? ((currentMonthData?.absent / totalRecords) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="breakdown-card leave">
              <div className="breakdown-number">{currentMonthData?.leave || 0}</div>
              <div className="breakdown-label">On Leave</div>
              <div className="breakdown-percentage">
                {totalRecords > 0 ? ((currentMonthData?.leave / totalRecords) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="breakdown-card halfday">
              <div className="breakdown-number">{currentMonthData?.halfDay || 0}</div>
              <div className="breakdown-label">Half Day</div>
              <div className="breakdown-percentage">
                {totalRecords > 0 ? ((currentMonthData?.halfDay / totalRecords) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="donut-chart-wrapper">
            <svg viewBox="0 0 100 100" className="donut-chart">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#dcfce7"
                strokeWidth="15"
                strokeDasharray={`${(currentMonthData?.present / totalRecords) * 282.7} 282.7`}
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#fee2e2"
                strokeWidth="15"
                strokeDasharray={`${(currentMonthData?.absent / totalRecords) * 282.7} 282.7`}
                strokeDashoffset={-((currentMonthData?.present / totalRecords) * 282.7)}
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#dbeafe"
                strokeWidth="15"
                strokeDasharray={`${(currentMonthData?.leave / totalRecords) * 282.7} 282.7`}
                strokeDashoffset={-(((currentMonthData?.present + currentMonthData?.absent) / totalRecords) * 282.7)}
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="50" textAnchor="middle" dy=".3em" className="donut-text">
                {totalRecords}
              </text>
              <text x="50" y="60" textAnchor="middle" className="donut-label">
                Total
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="content-card">
        <h3>Key Metrics & Insights</h3>
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <h4>Average Attendance Rate</h4>
              <p className="metric-value">{MOCK_SUMMARY.averageAttendance}%</p>
              <p className="metric-description">Overall monthly attendance percentage across all employees</p>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">⏰</div>
            <div className="metric-content">
              <h4>Late Check-ins</h4>
              <p className="metric-value">{MOCK_SUMMARY.lateCheckIns}</p>
              <p className="metric-description">Employees who checked in after 9:00 AM this month</p>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h4>Departments</h4>
              <p className="metric-value">{MOCK_DEPARTMENT_DATA.length}</p>
              <p className="metric-description">Total departments across the organization</p>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">✅</div>
            <div className="metric-content">
              <h4>Highest Attendance</h4>
              <p className="metric-value">Engineering</p>
              <p className="metric-description">Department with the highest average attendance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
