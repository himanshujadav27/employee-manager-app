
import { NavLink, useLocation } from 'react-router-dom';

function DashboardLayout({ darkMode, children }) {
  const { pathname } = useLocation();

  const titles = {
    '/': 'Employee Dashboard',
    '/employees': 'Employee Management',
    '/settings': 'Settings'
  };

  const breadcrumbs = {
    '/': 'Dashboard',
    '/employees': 'Employees',
    '/settings': 'Settings'
  };

  const navClass = ({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`;

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">E</div>
          <span>EmployEase</span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={navClass}>
            <span>▦</span> Dashboard
          </NavLink>
          <NavLink to="/employees" className={navClass}>
            <span>♙</span> Employees
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            <span>⚙</span> Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-avatar">EM</div>
          <div>
            <strong>Employee Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <span className="breadcrumb-text">
              Workspace / {breadcrumbs[pathname] || 'Page'}
            </span>
            <h2>{titles[pathname] || 'Page Not Found'}</h2>
          </div>

          <div className="topbar-status">
            <span className="status-dot"></span>
            Management Portal
          </div>
        </header>

        <div className="page-content">{children}</div>

        <footer className="dashboard-footer">
          Employee Management System
          <span>Built with React & Bootstrap</span>
        </footer>
      </main>
    </div>
  );
}

export default DashboardLayout;
