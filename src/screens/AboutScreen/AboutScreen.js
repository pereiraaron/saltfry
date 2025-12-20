import React from 'react';
import Footer from '../../components/Footer.js/Footer';
import PageHero from '../../components/PageHero/PageHero';
import './AboutScreen.css';

const AboutScreen = () => {
  return (
    <>
      <main>
        <PageHero title="about" />
        <section className="page section section-center about">
          <img src="/images/hero-bcg.jpeg" alt="nice desk" />
          <article>
            <div className="title">
              <h2>our story</h2>
              <div className="underline"></div>
            </div>
            <p>
              SaltFry began with a simple idea: furniture should be more than functional—it should
              feel personal. What started as a passion for well-designed interiors grew into a
              commitment to creating pieces that balance comfort, craftsmanship, and timeless style.
              Every design is thoughtfully planned and carefully built using quality materials, with
              attention to detail at every step. We blend modern aesthetics with practical living to
              create furniture that fits seamlessly into everyday life. As we grow, our focus
              remains the same: designing furniture that elevates your space, lasts for years, and
              truly feels like home.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutScreen;
