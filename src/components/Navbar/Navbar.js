import React from "react";
import "./Navbar.css";
import CartButtons from "../CartButtons/CartButtons";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../../utils/constants";
import { openSidebar } from "../../actions/sidebarActions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSidebar = () => {
    dispatch(openSidebar());
  };

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/logo1.svg"}
              alt="comfy sloth"
            />
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
