import React from 'react';
import { Link } from 'react-router-dom';
import { heroBcg, heroBcg2 } from '@assets';

const Hero: React.FC = () => {
  return (
    <div>
      <div className="section-center min-h-[60vh] grid place-items-center lg:h-[calc(100vh-5rem)] lg:grid-cols-2 lg:gap-32">
        <article>
          <h1 className="lg:mb-8">
            design your <br />
            comfort zone
          </h1>
          <p className="leading-8 max-w-[45em] mb-8 text-grey-5 text-base lg:text-xl">
            Thoughtfully crafted furniture that transforms your house into a home. Discover pieces
            that blend comfort, functionality, and timeless design—made to fit your lifestyle. Built
            with premium materials and designed to last for years to come.
          </p>
          <Link to="/products" className="btn lg:py-3 lg:px-6 lg:text-base">
            shop now
          </Link>
        </article>
        <article className="hidden lg:block lg:relative lg:before:content-[''] lg:before:absolute lg:before:w-[10%] lg:before:h-[80%] lg:before:bg-primary-9 lg:before:bottom-0 lg:before:left-[-8%] lg:before:rounded">
          <img
            src={heroBcg}
            alt="nice table"
            className="w-full h-137.5 relative rounded block object-cover"
          />
          <img
            src={heroBcg2}
            alt="person working"
            className="absolute bottom-0 left-0 w-62.5 -translate-x-1/2 rounded"
          />
        </article>
      </div>
    </div>
  );
};

export default Hero;
