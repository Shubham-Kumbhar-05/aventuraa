import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import '../Account/account.scss';

const Account = ({ toggleTheme, currentTheme }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const googleUser = JSON.parse(localStorage.getItem('googleUser'));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(googleUser || storedUser);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Works for Google sign out
    } catch (e) {
      console.log('Not a Google user or already signed out.');
    }

    localStorage.removeItem('googleUser');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    navigate('/auth');        // Redirect to login/signup
    window.location.reload(); // ✅ Refresh to update Navbar state
  };

  return (
    <div className="account-page">
      <h2>User Account</h2>

      <div className="user-details">
        <p><strong>Name:</strong> {user?.displayName || user?.fullName || user?.username || 'Not provided'}</p>
        <p><strong>Email:</strong> {user?.email || 'Not available'}</p>
      </div>

      <div className="theme-toggle">
        <label>
          Theme:&nbsp;
          <select onChange={toggleTheme} value={currentTheme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <button className="signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Account;
