import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Clock,
  Calendar,
  CreditCard,
  Users,
  LogOut
} from 'lucide-react'

export default function Sidebar({ role }) {
  const employeeLinks = [
    { to: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/employee/profile', label: 'My Profile', icon: User },
    { to: '/employee/attendance', label: 'Attendance', icon: Clock },
    { to: '/employee/leave', label: 'Leave', icon: Calendar },
    { to: '/employee/payroll', label: 'Payroll', icon: CreditCard },
  ]

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/employees', label: 'Employees', icon: Users },
    { to: '/admin/attendance', label: 'Attendance', icon: Clock },
    { to: '/admin/leaves', label: 'Leaves', icon: Calendar },
    { to: '/admin/payroll', label: 'Payroll', icon: CreditCard },
  ]

  const links = role === 'admin' ? adminLinks : employeeLinks

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Dayflow</h2>
        <p>Every workday, perfectly aligned.</p>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/login" className="nav-item logout">
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </div>
      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--bg-surface);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
        }
        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .sidebar-header h2 {
          color: var(--primary);
          font-size: 22px;
        }
        .sidebar-header p {
          font-size: 11px;
          color: var(--text-muted);
        }
        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          color: var(--text-muted);
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .nav-item:hover {
          background: #f1f5f9;
          color: var(--text-main);
        }
        .nav-item.active {
          background: #eff6ff;
          color: var(--primary);
        }
        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid var(--border-color);
        }
        .logout {
          color: #ef4444;
        }
        .logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }
      `}</style>
    </aside>
  )
}