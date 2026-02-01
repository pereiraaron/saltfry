import React from 'react';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthStore, useUIStore } from '../../stores';
import CartButtons from '../CartButtons/CartButtons';
import { links } from '../../utils/constants';
import { logo } from '../../assets';

const Navbar: React.FC = () => {
  const { userInfo } = useAuthStore();
  const { openSidebar } = useUIStore();

  const handleSidebar = () => {
    openSidebar();
  };

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="comfy sloth" />
          </Link>
          <button type="button" className="nav-toggle" onClick={handleSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {userInfo && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        {window.innerWidth > 992 && <CartButtons />}
      </div>
    </nav>
  );
};

export default Navbar;
