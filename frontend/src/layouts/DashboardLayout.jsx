import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function DashboardLayout({ role }) {
  return (
    <div className="layout-container">
      <Sidebar role={role} />
      <div className="main-wrapper">
        <Navbar role={role} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
      <style>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
        }
        .main-wrapper {
          flex: 1;
          margin-left: var(--sidebar-width);
          display: flex;
          flex-direction: column;
        }
        .content-area {
          padding: 24px;
          flex: 1;
        }
      `}</style>
    </div>
  )
}