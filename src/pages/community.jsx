import React from "react";
import "./community.scss";

const AboutUs = () => {
  return (
    <div className="about">
      <div className="container">
        <h1>About Aventuraa</h1>
        <p className="tagline">Where Education Meets Adventure</p>

        <div className="about-content">
          <p>
            Aventuraa is a premier school travel and experiential learning company
            dedicated to organizing safe, enriching, and memorable trips for students.
            Founded with a passion for education beyond the classroom, we specialize in
            crafting travel experiences that combine learning, adventure, and personal
            growth.
          </p>
        </div>

        <div className="core-values">
          <h2>Our Values</h2>

          <div className="value-box">
            <h3>Authenticity</h3>
            <p>
              We provide real, immersive, and culturally rich travel experiences that go
              beyond the surface to leave lasting impact and lifelong memories.
            </p>
          </div>

          <div className="value-box">
            <h3>Transparency</h3>
            <p>
              We believe in honest communication. Our process, pricing, and policies are
              always clear and straightforward—no hidden fees, no surprises.
            </p>
          </div>

          <div className="value-box">
            <h3>Safety & Trust</h3>
            <p>
              Student safety is our top priority. From planning to execution, we ensure
              every trip is conducted under strict safety protocols, earning the trust of
              schools and parents alike.
            </p>
          </div>
        </div>

        <div className="contact-details">
          <h3>Contact Information</h3>
          <p>
            <strong>Name:</strong> Aventuraa
          </p>
          <p>
            <strong>Phone:</strong> 9920886874 / 8591569393
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:aventura2904.business@gmail.com">
              aventuraa2904.business@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
