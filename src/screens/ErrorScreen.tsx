import React from 'react';
import { Link } from 'react-router-dom';

const ErrorScreen: React.FC = () => {
  return (
    <main className="page-100 flex justify-center items-center text-center px-4">
      <section>
        <p className="text-8xl sm:text-[10rem] font-bold text-primary-9 leading-none mb-4">404</p>
        <h3 className="normal-case mb-3 text-grey-2">Page not found</h3>
        <p className="text-grey-5 max-w-md mx-auto mb-8">
          Sorry, the page you tried cannot be found. It might have been moved or deleted.
        </p>
        <Link to="/" className="btn py-2.5 px-6">
          back home
        </Link>
      </section>
    </main>
  );
};

export default ErrorScreen;
