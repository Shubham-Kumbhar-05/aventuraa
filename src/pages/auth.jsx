import { useState, useEffect } from 'react';
import './auth.scss';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  const googleSheetURL = 'https://script.google.com/macros/s/AKfycbzErzXwBEeeeRFNE-sORNMd0H1xPFgGIzfelP8cJ4jn8-mf-xTTNkEufAN9UJmDhCaQvQ/exec';

  const adminCredentials = {
    username: 'aventuraa2904',
    password: 'Aventuraa@2904',
    fullName: 'Aventuraa',
    email: 'aventuraa.admin2904@gmail.com',
    role: 'admin',
  };

  const toggleForm = () => setIsSignup(!isSignup);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const extractRole = (userObj) => {
    const rawRole =
      userObj.role || userObj.Role || userObj[' role'] || userObj['Role '] || '';
    return rawRole.trim().toLowerCase() || 'user';
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setGoogleUser(user);
      localStorage.setItem('googleUser', JSON.stringify(user));

      const response = await fetch(googleSheetURL);
      const users = await response.json();
      const matched = users.find(u => u.Email?.toLowerCase() === user.email.toLowerCase());

      if (matched) {
        const role = extractRole(matched);
        localStorage.setItem('role', role);
        alert(`Welcome ${matched['Full Name'] || user.displayName}`);
        navigate(role === 'admin' ? '/admin' : '/home');
      } else {
        const newUser = {
          fullName: user.displayName || '',
          username: user.email.split('@')[0],
          email: user.email,
          password: 'google',
          confirmPassword: 'google',
          role: 'user',
        };

        await fetch(googleSheetURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        localStorage.setItem('role', 'user');
        alert(`Welcome ${user.displayName}! Signed up via Google`);
        navigate('/home');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google login failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isSignup &&
      formData.username.toLowerCase() === adminCredentials.username.toLowerCase() &&
      formData.password === adminCredentials.password
    ) {
      localStorage.setItem('user', JSON.stringify(adminCredentials));
      localStorage.setItem('role', 'admin');
      alert('Admin login successful!');
      navigate('/admin');
      return;
    }

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const payload = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: 'user',
      };

      try {
        await fetch(googleSheetURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
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
      try {
        const response = await fetch(googleSheetURL);
        const users = await response.json();

        const found = users.find(
          (user) =>
            user.Username?.toLowerCase() === formData.username.toLowerCase() &&
            user.Password === formData.password
        );

        if (found) {
          const role = extractRole(found);
          localStorage.setItem('user', JSON.stringify(found));
          localStorage.setItem('role', role);
          alert('Login successful!');
          navigate(role === 'admin' ? '/admin' : '/home');
        } else {
          alert('Invalid credentials!');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed.');
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setGoogleUser(user);
        localStorage.setItem('googleUser', JSON.stringify(user));

        try {
          const response = await fetch(googleSheetURL);
          const users = await response.json();
          const matched = users.find(u => u.Email?.toLowerCase() === user.email.toLowerCase());

          if (matched) {
            const role = extractRole(matched);
            localStorage.setItem('role', role);
            navigate(role === 'admin' ? '/admin' : '/home');
          }
        } catch (error) {
          console.error('Auto-login failed:', error);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <section className="auth light">
      <div className="authBox">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {!googleUser ? (
          <>
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

            <hr />
            <button onClick={handleGoogleLogin} className="btn">
              Login with Google
            </button>
          </>
        ) : (
          <div>
            <p>Welcome, {googleUser.displayName}</p>
            <button className="btn" onClick={() => {
              signOut(auth);
              setGoogleUser(null);
              localStorage.removeItem('googleUser');
              localStorage.removeItem('role');
              navigate('/');
            }}>Sign Out</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Auth;
