import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  product?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({ title, product }) => {
  return (
    <section className="bg-primary-10 w-full border-b border-primary-9">
      <div className="section-center py-4 md:py-5">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link
            className="text-primary-4 transition-colors duration-200 hover:text-primary-5"
            to="/"
          >
            Home
          </Link>
          <span className="text-primary-4/60">/</span>
          {product && (
            <>
              <Link
                className="text-primary-4 transition-colors duration-200 hover:text-primary-5"
                to="/products"
              >
                Products
              </Link>
              <span className="text-primary-4/60">/</span>
            </>
          )}
          <span className="text-primary-2 font-medium capitalize">{title}</span>
        </nav>
      </div>
    </section>
  );
};

export default PageHero;
