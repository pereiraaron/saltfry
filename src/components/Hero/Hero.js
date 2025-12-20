import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="section-center">
        <article className="content">
          <h1>
            design your <br />
            comfort zone
          </h1>
          <p>
            Thoughtfully crafted furniture that transforms your house into a home. Discover pieces that blend comfort, functionality, and timeless design—made to fit your lifestyle.
            Built with premium materials and designed to last for years to come.</p>
          <Link to="/products" className="btn hero-btn">
            shop now
          </Link>
        </article>
        <article className="img-container">
          <img
            src={process.env.PUBLIC_URL + "/images/hero-bcg.jpeg"}
            alt="nice table"
            className="main-img"
          />
          <img
            src={process.env.PUBLIC_URL + "/images/hero-bcg-2.jpeg"}
            alt="person working"
            className="accent-img"
          />
        </article>
      </div>
    </div>
  );
};

export default Hero;
