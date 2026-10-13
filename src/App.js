import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import DashboardLayout from './Components/DashboardLayout';
import EmployeeForm from './Components/EmployeeForm';
import Settings from './Components/Settings';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <DashboardLayout darkMode={darkMode}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="welcome-section">
                  <div>
                    <h1>Welcome back!</h1>
                    <p>Manage your team and employee records in one place.</p>
                  </div>
                  <div className="welcome-icon">✦</div>
                </section>

                <section className="overview-card">
                  <h3>Welcome to EmployEase</h3>
                  <p>
                    Manage employee records or customize your dashboard
                    appearance using the options below.
                  </p>
                  <Link to="/employees" className="btn btn-primary">
                    Manage Employees
                  </Link>
                </section>
              </>
            }
          />

          <Route path="/employees" element={<EmployeeForm />} />

          <Route
            path="/settings"
            element={
              <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />

          <Route
            path="*"
            element={
              <section className="overview-card">
                <h3>Page not found</h3>
                <Link to="/" className="btn btn-primary">
                  Back to Dashboard
                </Link>
              </section>
            }
          />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
