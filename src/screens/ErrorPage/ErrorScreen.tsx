import React from 'react';
import './ErrorScreen.css';
import { Link } from 'react-router-dom';

const ErrorScreen: React.FC = () => {
  return (
    <main className="page-100">
      <section>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </main>
  );
};

export default ErrorScreen;

