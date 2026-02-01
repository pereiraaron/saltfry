import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useAuthStore, useUIStore } from '../../stores';
import { links } from '../../utils/constants';
import CartButtons from '../CartButtons/CartButtons';

const Sidebar: React.FC = () => {
  const { userInfo } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const handleCloseSidebar = () => {
    closeSidebar();
  };

  return (
    <div>
      <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className="sidebar-header">
          <img src="/images/logo1.svg" className="logo" alt="coding addict" />
          <button className="close-btn" onClick={handleCloseSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url} onClick={handleCloseSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          {userInfo && (
            <li>
              <Link to="/checkout" onClick={handleCloseSidebar}>
                checkout
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </aside>
    </div>
  );
};

export default Sidebar;
