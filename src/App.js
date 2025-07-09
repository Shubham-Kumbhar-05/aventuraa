import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './app.css';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';

// Pages
import Treks from './pages/treks';
import Community from './pages/community';
import Challenges from './pages/challenges';
import Auth from './pages/auth';
import Details from './pages/details'; // ✅ Import Details Page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treks" element={<Treks />} />
        <Route path="/treks/:id" element={<Details />} /> {/* ✅ Details Route */}
        <Route path="/community" element={<Community />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/auth" element={<Auth />} />
        {/* Optional: <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
