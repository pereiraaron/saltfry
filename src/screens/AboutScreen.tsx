import React from 'react';
import { PageHero } from '@components';
import { heroBcg } from '@assets';

const AboutScreen: React.FC = () => {
  return (
    <main>
      <PageHero title="about" />
      <section className="page section section-center grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)]">
          <img
            src={heroBcg}
            alt="nice desk"
            loading="lazy"
            decoding="async"
            className="w-full block h-72 sm:h-96 lg:h-125 object-cover"
          />
        </div>
        <article>
          <div className="title text-left">
            <h2>our story</h2>
            <div className="underline ml-0!" />
          </div>
          <p className="leading-8 max-w-[45em] mx-auto mt-8 text-grey-5">
            Woodwork began with a simple idea: furniture should be more than functional—it should
            feel personal. What started as a passion for well-designed interiors grew into a
            commitment to creating pieces that balance comfort, craftsmanship, and timeless style.
            Every design is thoughtfully planned and carefully built using quality materials, with
            attention to detail at every step. We blend modern aesthetics with practical living to
            create furniture that fits seamlessly into everyday life. As we grow, our focus remains
            the same: designing furniture that elevates your space, lasts for years, and truly feels
            like home.
          </p>
        </article>
      </section>
    </main>
  );
};

export default AboutScreen;
