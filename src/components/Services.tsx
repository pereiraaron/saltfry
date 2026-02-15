import React from 'react';
import { services } from '@utils/constants';

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-primary-10 min-[1280px]:py-0">
      <div className="section-center min-[1280px]:translate-y-20">
        <article className="lg:grid lg:grid-cols-2">
          <h3 className="text-primary-1 mb-8">
            custom furniture <br /> built only for you
          </h3>
          <p className="mb-0! leading-[1.8] text-primary-3">
            Every piece is designed with attention to detail and crafted using premium materials. We
            believe furniture should be as unique as the people who use it—functional, durable, and
            beautiful.
          </p>
        </article>
        <div className="mt-16 grid gap-10 sm:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
          {services.map((service) => {
            const { id, icon, title, text } = service;
            return (
              <article className="bg-primary-7 text-center py-10 px-8 rounded" key={id}>
                <span className="w-16 h-16 grid mx-auto place-items-center mb-4 rounded-full bg-primary-10 text-primary-1 [&>svg]:text-3xl">
                  {icon}
                </span>
                <h4 className="text-primary-1">{title}</h4>
                <p className="text-primary-2">{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
