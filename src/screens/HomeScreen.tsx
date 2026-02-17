import React from 'react';
import { Contact, FeaturedProducts, Hero, Services } from '@components';

const HomeScreen: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </>
  );
};

export default HomeScreen;
