import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Account from './Components/Account/Account';

// Pages
import Treks from './pages/treks';
import Community from './pages/community';
import Challenges from './pages/challenges';
import Auth from './pages/auth';
import Details from './pages/details';
import AdminDashboard from './pages/AdminDashboard';

// ✅ Protected route for admin
const ProtectedAdmin = ({ children }) => {
  const role = localStorage.getItem('role');
  return role && role.toLowerCase() === 'admin' ? children : <Navigate to="/" />;
};

// ✅ Protected route for logged-in user
const ProtectedUser = ({ children }) => {
  const user = localStorage.getItem('user') || localStorage.getItem('googleUser');
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme to <body> and persist in localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    setTheme(e.target.value);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treks" element={<Treks />} />
        <Route path="/treks/:id" element={<Details />} />
        <Route path="/community" element={<Community />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/auth" element={<Auth />} />

        {/* ✅ Admin-only route */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />

        {/* ✅ User Account route with theme props */}
        <Route
          path="/account"
          element={
            <ProtectedUser>
              <Account toggleTheme={toggleTheme} currentTheme={theme} />
            </ProtectedUser>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
