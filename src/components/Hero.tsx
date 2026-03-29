import React from 'react';
import { Link } from 'react-router-dom';
import { heroBcg, heroBcg2 } from '@assets';

const Hero: React.FC = () => {
  return (
    <div className="bg-grey-10/40">
      <div className="section-center grid items-center py-16 lg:pt-28 lg:pb-40 lg:grid-cols-2 lg:gap-32">
        <article>
          <h1 className="lg:mb-8 leading-[1.1]">
            design your <br />
            comfort zone
          </h1>
          <p className="leading-8 max-w-[45em] mb-8 text-grey-5 text-base lg:text-lg">
            Thoughtfully crafted furniture that transforms your house into a home. Discover pieces
            that blend comfort, functionality, and timeless design—made to fit your lifestyle. Built
            with premium materials and designed to last for years to come.
          </p>
          <Link to="/products" className="btn lg:py-3 lg:px-8 lg:text-base">
            shop now
          </Link>
        </article>
        <article className="hidden lg:block lg:relative lg:before:content-[''] lg:before:absolute lg:before:w-[10%] lg:before:h-[80%] lg:before:bg-primary-9 lg:before:bottom-0 lg:before:left-[-8%] lg:before:rounded-lg">
          <img
            src={heroBcg}
            alt="nice table"
            className="w-full h-137.5 relative rounded-lg block object-cover shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]"
          />
          <img
            src={heroBcg2}
            alt="person working"
            className="absolute bottom-0 left-0 w-62.5 -translate-x-1/2 rounded-lg shadow-[0_20px_40px_-8px_rgba(0,0,0,0.2)]"
          />
        </article>
      </div>
    </div>
  );
};

export default Hero;
