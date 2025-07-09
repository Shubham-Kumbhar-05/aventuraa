import React, { useState } from 'react';
import './auth.scss';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const googleSheetURL = 'https://script.google.com/macros/s/AKfycbz7wBEmZ9ydkkQpVQp6K5x08-aIzTUqOoJgZd2Eswh_TpUxqV1Nfnmu91-NSy-xPmfN5w/exec';

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      // Basic client-side validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const payload = { ...formData };

      try {
        await fetch(googleSheetURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        alert('Sign up successful!');
        setIsSignup(false);
        setFormData({
          fullName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed.');
      }
    } else {
      // LOGIN: Fetch users from Google Sheet and validate
      try {
        const response = await fetch(googleSheetURL);
        const users = await response.json();

        const found = users.find(
          (user) =>
            user.Username === formData.username &&
            user.Password === formData.password
        );

        if (found) {
          alert('Login successful!');
          localStorage.setItem('user', JSON.stringify(found)); // ✅ Save user to localStorage
          setFormData({
            fullName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          navigate('/'); // ✅ Redirect to homepage
        } else {
          alert('Invalid credentials!');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed.');
      }
    }
  };

  return (
    <section className="auth">
      <div className="authBox">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        <form className="authForm" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="btn">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={toggleForm} style={{ cursor: 'pointer', color: '#007bff' }}>
            {isSignup ? 'Login here' : 'Sign up here'}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Auth;
