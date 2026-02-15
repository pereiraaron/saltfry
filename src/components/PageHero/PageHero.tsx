import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  product?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({ title, product }) => {
  return (
    <section className="bg-primary-10 w-full min-h-[16vh] flex items-center text-primary-1">
      <div className="section-center">
        <h3>
          <Link
            className="text-primary-3 p-2 transition-all duration-300 hover:text-primary-1"
            to="/"
          >
            Home{' '}
          </Link>
          {product && (
            <Link
              className="text-primary-3 p-2 transition-all duration-300 hover:text-primary-1"
              to="/products"
            >
              / Products
            </Link>
          )}
          / {title}
        </h3>
      </div>
    </section>
  );
};

export default PageHero;
