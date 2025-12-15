import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { links } from "../../utils/constants";
import CartButtons from "../CartButtons/CartButtons";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../actions/sidebarActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const { isSidebarOpen } = sidebar;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <div>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.svg"}
            className="logo"
            alt="coding addict"
          />
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
