import React from 'react';

function SettingsSection() {
  const handleSubmit = e => {
    e.preventDefault();
    alert('Settings Updated!');
  };

  return (
    <section>
      <h2>Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>Admin Name</label><input type="text" defaultValue="Admin" required />
        <label>Admin Email</label><input type="email" defaultValue="admin@clothing.com" required />
        <label>New Password</label><input type="password" required />
        <label>Confirm Password</label><input type="password" required />
        <button className="btn-primary" type="submit">Update Settings</button>
      </form>
    </section>
  );
}

export default SettingsSection;
