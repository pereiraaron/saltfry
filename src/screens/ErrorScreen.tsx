import React from 'react';
import { Link } from 'react-router-dom';

const ErrorScreen: React.FC = () => {
  return (
    <main
      className="page-100 bg-primary-10 flex
        justify-center items-center text-center"
    >
      <section>
        <h1 className="text-[10rem]">404</h1>
        <h3 className="normal-case mb-8">Sorry, the page you tried cannot be found</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </main>
  );
};

export default ErrorScreen;
