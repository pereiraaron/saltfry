import React from 'react';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartButtons from '../CartButtons/CartButtons';
import { links } from '../../utils/constants';
import { openSidebar } from '../../actions/sidebarActions';
import { logo } from '../../assets';
import { RootState } from '../../types';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSidebar = () => {
    dispatch(openSidebar() as any);
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
