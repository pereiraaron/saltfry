import React from 'react';
import { Link } from 'react-router-dom';
import './PageHero.css';

interface PageHeroProps {
  title: string;
  product?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({ title, product }) => {
  return (
    <section className="page-hero">
      <div className="section-center">
        <h3>
          <Link to="/">Home </Link>
          {product && <Link to="/products">/ Products</Link>}/ {title}
        </h3>
      </div>
    </section>
  );
};

export default PageHero;
