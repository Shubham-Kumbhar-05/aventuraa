import React, { useState } from 'react';
import './main.css';
import '../Main/main.scss';

// Icons
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';

// Routing
import { useNavigate } from 'react-router-dom';

// Animation
import { motion } from 'framer-motion';

//Swipeable
import { useSwipeable } from 'react-swipeable';

// Images
import img17 from '../../Assets/img17.jpg';
import img18 from '../../Assets/img18.jpg';
import img19 from '../../Assets/img19.jpg';
import img20 from '../../Assets/img20.jpg';
import img4 from '../../Assets/img4.jpg';
import img5 from '../../Assets/img5.jpg';
import img6 from '../../Assets/img6.jpg';
import img7 from '../../Assets/img7.jpg';
import img8 from '../../Assets/img8.jpg';
import img9 from '../../Assets/img9.jpg';
import img10 from '../../Assets/img10.jpg';
import img11 from '../../Assets/img11.jpg';
import img12 from '../../Assets/img12.png';
import img13 from '../../Assets/img13.jpg';
import img14 from '../../Assets/img14.jpg';
import img15 from '../../Assets/img15.jpg';
import img16 from '../../Assets/img16.jpg';

// Data Array
const Data = [
  {
    id: 1,
    imgSrc: [img4, img5],
    destTitle: 'Pawna Lake',
    location: 'Maharashtra',
    description:
      'Pawna Lake is a beautiful artificial reservoir formed by the Pawna Dam, located near Lonavala in Maharashtra. It is surrounded by the Sahyadri ranges and offers scenic views, peaceful camping spots, and opportunities for water activities like kayaking and paddle boating. It’s a popular weekend getaway for nature lovers, couples, and adventure seekers.',
  },
  {
    id: 2,
    imgSrc: [img17, img18, img19, img20],
    destTitle: 'Imagicaa',
    location: 'Maharashtra',
    description:
      'Imagicaa is a world-class amusement park located near Khopoli between Mumbai and Pune. It features thrilling rides, a themed water park, a snow zone, live entertainment shows, and restaurants. Perfect for a family outing, Imagicaa offers fun for all age groups with attractions like Nitro, Deep Space, Rajasaura, and the Imagicaa Parade.',
  },
  {
    id: 3,
    imgSrc: [img6, img7, img8],
    destTitle: 'Wet n Joy',
    location: 'Maharashtra',
    description:
      'Wet n Joy is a popular water park located in Lonavala and Shirdi. It offers a variety of rides and slides, including wave pools, rain dance, lazy river, and family floats. Known for its cleanliness and international safety standards, it’s an ideal place to beat the heat and enjoy an adventurous day with family and friends.',
  },
  {
    id: 4,
    imgSrc: [img9, img10],
    destTitle: 'Junnar (Shivneri Fort)',
    location: 'Maharashtra',
    description:
      'Shivneri Fort is a historical fort located near Junnar, known as the birthplace of Chhatrapati Shivaji Maharaj. It features strong fortifications, ancient water tanks, and a temple of Goddess Shivai. A moderate trek leads to the top where visitors can enjoy panoramic views of the Western Ghats and explore Maratha heritage.',
  },
  {
    id: 5,
    imgSrc: [img11, img12, img13],
    destTitle: 'Raigad Fort',
    location: 'Maharashtra',
    description:
      'Raigad Fort was the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. Situated at an altitude of 2,700 ft, the fort can be reached by trekking or ropeway. Visitors can explore ruins of royal palaces, the market area, Shivaji’s Samadhi, and Takmak Tok (execution point). It’s a must-visit for history and trekking enthusiasts.',
  },
  {
    id: 6,
    imgSrc: [img14, img15, img16],
    destTitle: 'Kidzania',
    location: 'Mumbai, Maharashtra',
    description:
      'Kidzania is an indoor family edutainment center that empowers, inspires, and educates children through real-life role-play activities. Designed as a mini city, kids can take on roles like doctors, firefighters, pilots, chefs, and more. It’s an immersive experience that promotes creativity, responsibility, and teamwork in a safe and fun environment.',
  },
];


// Subcomponent to fix Hook Rule
const DestinationCard = ({ item, index, imageIndex, setImageIndex }) => {
  const { id, imgSrc, destTitle, location, description } = item;
  const navigate = useNavigate();

  const handlePrev = () => {
    setImageIndex((prev) => {
      const updated = [...prev];
      updated[index] = updated[index] === 0 ? imgSrc.length - 1 : updated[index] - 1;
      return updated;
    });
  };

  const handleNext = () => {
    setImageIndex((prev) => {
      const updated = [...prev];
      updated[index] = updated[index] === imgSrc.length - 1 ? 0 : updated[index] + 1;
      return updated;
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  return (
    <motion.div
      className="singleDestination"
      key={id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="imageDiv" {...swipeHandlers}>
        <img src={imgSrc[imageIndex]} alt={destTitle} />
        {imgSrc.length > 1 && (
          <>
            <button className="arrow left" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="arrow right" onClick={handleNext}>
              &#10095;
            </button>
          </>
        )}
      </div>

      <div className="cardInfo">
        <h4 className="destTitle">{destTitle}</h4>
        <span className="continent flex">
          <HiOutlineLocationMarker className="icon" />
          <span className="name">{location}</span>
        </span>

        <div className="desc">
          <p>{description}</p>
        </div>

        <button className="btn flex" onClick={() => navigate(`/treks/${id}`)}>
          Book Now <HiOutlineClipboardCheck className="icon" />
        </button>
      </div>
    </motion.div>
  );
};

// Main Component
const Main = () => {
  const [imageIndexes, setImageIndexes] = useState(Array(Data.length).fill(0));

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Most visited destinations</h3>
      </div>

      <div className="secContent grid">
        {Data.map((item, i) => (
          <DestinationCard
            key={item.id}
            item={item}
            index={i}
            imageIndex={imageIndexes[i]}
            setImageIndex={setImageIndexes}
          />
        ))}
      </div>
    </section>
  );
};

export default Main;
