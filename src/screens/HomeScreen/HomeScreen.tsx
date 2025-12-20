import React from 'react';
import Contact from '../../components/Contact/Contact';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Footer from '../../components/Footer.js/Footer';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';

const HomeScreen: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <FeaturedProducts />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomeScreen;

