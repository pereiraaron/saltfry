import React from 'react';
import { PageHero } from '@components';
import { heroBcg } from '@assets';

const AboutScreen: React.FC = () => {
  return (
    <main>
      <PageHero title="about" />
      <section
        className="page section section-center
          grid gap-16 lg:grid-cols-2"
      >
        <img
          src={heroBcg}
          alt="nice desk"
          className="w-full block rounded-(--radius-default)
            h-125 object-cover"
        />
        <article>
          <div className="title text-left">
            <h2>our story</h2>
            <div className="underline ml-0!" />
          </div>
          <p
            className="leading-8 max-w-[45em] mx-auto
              mt-8 text-grey-5"
          >
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
