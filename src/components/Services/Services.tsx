import React from 'react';
import './Services.css';
import { services } from '../../utils/constants';

const Services: React.FC = () => {
  return (
    <section className="services">
      <div className="section-center">
        <article className="header">
          <h3>
            custom furniture <br /> built only for you
          </h3>
          <p>
            Every piece is designed with attention to detail and crafted using premium materials. We
            believe furniture should be as unique as the people who use it—functional, durable, and
            beautiful.
          </p>
        </article>
        <div className="services-center">
          {services.map((service) => {
            const { id, icon, title, text } = service;
            return (
              <article className="service" key={id}>
                <span className="icon">{icon}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

