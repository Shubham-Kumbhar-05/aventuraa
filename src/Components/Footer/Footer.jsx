import React from 'react'
import './footer.css'
import '../Footer/footer.scss'

import video2 from '../../Assets/video2.mp4'
import logo from '../../Assets/COMPANY LOGO 4-01.png'

import {FaInstagram } from 'react-icons/fa'
import {FaFacebook } from 'react-icons/fa'
import {FaTwitter } from 'react-icons/fa'
import {FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <section className='footer'>
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <img src={logo} alt="Trek Logo" className="logo" />
          <p>
            Where Education Meets Adventure
          </p>
        </div>

        {/* Explore Links */}
        <div className="footer-section">
          <h2>Explore</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Pacakages</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="footer-section">
          <h2>Resources</h2>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Safety Tips</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>📍 Mumbai, Maharashtra, India</p>
          <p>📞 9920886874/8591569393</p>
          <p>✉️ aventura2904.business@gmail.com</p>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Aventuraa | Crafted with <span>🌿 Trust</span></p>
      </div>
    </section>
  )
}

export default Footer
