import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import { heroBcg, heroBcg2 } from '../../assets';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="section-center">
        <article className="content">
          <h1>
            design your <br />
            comfort zone
          </h1>
          <p>
            Thoughtfully crafted furniture that transforms your house into a home. Discover pieces
            that blend comfort, functionality, and timeless design—made to fit your lifestyle. Built
            with premium materials and designed to last for years to come.
          </p>
          <Link to="/products" className="btn hero-btn">
            shop now
          </Link>
        </article>
        <article className="img-container">
          <img src={heroBcg} alt="nice table" className="main-img" />
          <img src={heroBcg2} alt="person working" className="accent-img" />
        </article>
      </div>
    </div>
  );
};

export default Hero;

