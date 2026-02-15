import React from 'react';
import { Contact, FeaturedProducts, Footer, Hero, Services } from '@components';

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
