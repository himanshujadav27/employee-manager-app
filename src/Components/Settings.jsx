
function Settings({ darkMode, setDarkMode }) {
  return (
    <section className="settings-card">
      <h3>Appearance</h3>
      <p>Choose the theme you prefer for your dashboard.</p>

      <div className="theme-setting">
        <div className="theme-icon">{darkMode ? '🌙' : '☀️'}</div>

        <div className="theme-description">
          <strong>Dark Mode</strong>
          <small>
              {darkMode ? 'Dark theme is enabled' : 'Switch to a darker appearance'}
          </small>
        </div>

        <label className="theme-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          />
          <span className="theme-slider"></span>
        </label>
      </div>
    </section>
  );
}

export default Settings;
