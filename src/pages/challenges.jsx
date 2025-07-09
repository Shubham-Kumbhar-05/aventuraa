import React, { useState } from 'react';
import './challenges.scss';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_ypkgtq5',      // Replace with your EmailJS Service ID
        'template_u05eeem',     // Replace with your EmailJS Template ID
        formData,
        'h729n1Ffsqz19UG9a'       // Replace with your EmailJS Public Key (user ID)
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
        },
        (err) => {
          console.error('FAILED...', err);
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="contact section">
      <div className="container">
        <h2 className="title">Contact Us</h2>
        <p className="subtitle">
          We’d love to hear from you! Send us a message or reach out via the info below.
        </p>

        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <div className="info-box">
              <FaPhoneAlt className="icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 9920886874 / 8591569393</p>
              </div>
            </div>
            <div className="info-box">
              <FaEnvelope className="icon" />
              <div>
                <h4>Email</h4>
                <p>aventuraa2904.business@gmail.com</p>
              </div>
            </div>
            <div className="info-box">
              <FaMapMarkerAlt className="icon" />
              <div>
                <h4>Address</h4>
                <p>Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
