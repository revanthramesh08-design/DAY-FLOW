import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Login Page</h1>
      <p>Authentication Placeholder</p>
      <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
        <Link to="/employee/dashboard">Go to Employee Dashboard</Link>
        <span>|</span>
        <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
      </div>
    </div>
  )
}