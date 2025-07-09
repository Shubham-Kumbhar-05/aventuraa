import React from 'react';
import './treks.scss';
import { Data } from '../Components/Main/Data';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const navigate = useNavigate();

  return (
    <section className="packagesPage container section">
      <h2 className="pageTitle">All Travel Packages</h2>
      <div className="packagesGrid">
        {Data.map(({ id, imgSrc, destTitle, location, description }) => (
          <div className="packageCard" key={id}>
            <img src={imgSrc[0]} alt={destTitle} />
            <div className="info">
              <h3>{destTitle}</h3>
              <p className="location">{location}</p>
              <p className="desc">{description}</p>
              <button className="btn" onClick={() => navigate(`/treks/${id}`)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
