import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <h5>
          &copy; {new Date().getFullYear()}
          <span> SaltFry </span>
        </h5>
        <h5>All rights reserved</h5>
      </div>
    </footer>
  );
};

export default Footer;
