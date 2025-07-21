import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { Data } from '../Components/Main/Data';
import './details.scss';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trek = Data.find(item => item.id === parseInt(id));
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleNext = () => {
    setCurrentImgIndex(prev =>
      trek && prev === trek.imgSrc.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImgIndex(prev =>
      trek && prev === 0 ? trek.imgSrc.length - 1 : prev - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzHreFHW3Y5iNqPzFdZp0odtYW2f3LcU7Hb0RfAGRo1U8MQqk61ZrCseE98gnFQ4P9FDw/exec'; // ✅ Booking script

    const formBody = new URLSearchParams();
    formBody.append('name', formData.name);
    formBody.append('trip', trek.destTitle);  // ✅ Sending trip name
    formBody.append('email', formData.email);
    formBody.append('phone', formData.phone);

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formBody,
      });

      setSubmitted(true);

      setTimeout(() => {
        setShowForm(false);
        setFormData({ name: '', email: '', phone: '' });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error!", error.message);
    }
  };

  if (!trek) return <h2 className="text-center">Destination not found</h2>;

  return (
    <div className="detailsPage container section">
      <button onClick={() => navigate(-1)} className="backBtn">← Back</button>

      <div className="detailsContainer">
        <motion.div
          className="imagesSection"
          {...swipeHandlers}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img src={trek.imgSrc[currentImgIndex]} alt={`Slide ${currentImgIndex}`} />
          {trek.imgSrc.length > 1 && (
            <>
              <button className="arrow left" onClick={handlePrev}>‹</button>
              <button className="arrow right" onClick={handleNext}>›</button>
            </>
          )}
        </motion.div>

        <div className="info">
          <h2 className="title">{trek.destTitle}</h2>
          <div className="location">
            <HiOutlineLocationMarker /> {trek.location}
          </div>

          <p className="description">{trek.description}</p>

          <button className="btn flex bookBtn" onClick={() => setShowForm(true)}>
            Book Now
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="formOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="formContainer"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {!submitted ? (
                <>
                  <h3>Booking Details</h3>
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="btn">Submit</button>
                  </form>
                  <button className="btn cancelBtn" onClick={() => setShowForm(false)}>Cancel</button>
                </>
              ) : (
                <div className="thankYou">
                  <h4>Thank you!</h4>
                  <p>Your booking has been submitted.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
