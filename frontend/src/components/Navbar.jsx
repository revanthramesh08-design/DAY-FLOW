import { Bell, User } from 'lucide-react'

export default function Navbar({ role }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="role-badge">{role.toUpperCase()} PANEL</span>
      </div>
      <div className="navbar-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div className="user-profile">
          <User size={20} />
          <span>Demo User</span>
        </div>
      </div>
      <style>{`
        .navbar {
          height: var(--header-height);
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .role-badge {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: #eff6ff;
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 12px;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 8px;
          border-radius: 50%;
        }
        .icon-btn:hover {
          background: #f1f5f9;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: var(--text-main);
          padding: 6px 12px;
          border-radius: 20px;
          background: #f1f5f9;
        }
      `}</style>
    </header>
  )
}