import "./styles/Navbar.css";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { WINDOW_SIZE_THRESHOLD_PX } from "../config";

const Navbar = () => {
  const NAVBAR_CLASS_HORIZONTAL = "nav-menu";
  const NAVBAR_CLASS_VERTICAL_HIDDEN = "nav-menu-hidden";
  const NAVBAR_CLASS_VERTICAL_SHOWN = "nav-menu-vert";
  const HAMBURGER_DISPLAY_ON = "hamburger-display-on";
  const HAMBURGER_DISPLAY_OFF = "hamburger-display-off";
  const HAMBURGER_MAPPING = {
    false: HAMBURGER_DISPLAY_OFF,
    true: HAMBURGER_DISPLAY_ON,
  };
  
  const [enableMenu, setEnableMenu] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [navbarClass, setNavbarClass] = useState(NAVBAR_CLASS_HORIZONTAL);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize[0] <= WINDOW_SIZE_THRESHOLD_PX && !enableMenu) {
      setEnableMenu(true);
    } else if (windowSize[0] >= WINDOW_SIZE_THRESHOLD_PX && enableMenu) {
      setEnableMenu(false);
    }
  }, [windowSize]);

  useEffect(() => {
    if (enableMenu && expandMenu) {
      setNavbarClass(NAVBAR_CLASS_VERTICAL_SHOWN);
    } else if (enableMenu && !expandMenu) {
      setNavbarClass(NAVBAR_CLASS_VERTICAL_HIDDEN);
    } else {
      setNavbarClass(NAVBAR_CLASS_HORIZONTAL);
    }
  }, [expandMenu, enableMenu]);

  const toggleMenuDisplay = () => {
    setExpandMenu(!expandMenu);
  };

  return (
    <nav className="navbar-main">
      <div className="wecca-logo-image"></div>
      <div className="nav-section" id="nav-main">
        <div
          class={HAMBURGER_MAPPING[enableMenu]}
          onClick={() => toggleMenuDisplay()}
        >
          &#9776;
        </div>
        <div className={navbarClass}>
          <div className="nav-subsection" onClick={() => setExpandMenu(false)}>
            <NavLink
              to="/"
              className={({ isActive }) => "link" + (isActive ? " active" : "")}
            >
              Home
            </NavLink>
          </div>
          <div className="nav-subsection" onClick={() => setExpandMenu(false)}>
            <NavLink
              to="/about"
              className={({ isActive }) => "link" + (isActive ? " active" : "")}
            >
              About
            </NavLink>
          </div>
          <div className="nav-subsection" onClick={() => setExpandMenu(false)}>
            <NavLink
              to="/calendar"
              className={({ isActive }) => "link" + (isActive ? " active" : "")}
            >
              Calendar
            </NavLink>
          </div>
          <div className="nav-subsection" onClick={() => setExpandMenu(false)}>
            <NavLink
              to="/sponsors"
              className={({ isActive }) => "link" + (isActive ? " active" : "")}
            >
              Sponsors
            </NavLink>
          </div>
          <div className="nav-subsection" onClick={() => setExpandMenu(false)}>
            <NavLink
              to="/contact"
              className={({ isActive }) => "link" + (isActive ? " active" : "")}
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/*

<nav className='centre'>
    <ul className="navbar">
        <li>
            <NavLink to='/' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Home</NavLink>
        </li>
        <li>
            <NavLink to='/about' className={({ isActive }) => "link" + (isActive ? " active" : "")}>About</NavLink>
        </li>
        <li>
            <NavLink to='/calendar' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Calendar</NavLink>
        </li>
        <li>
            <NavLink to='/sponsors' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Sponsors</NavLink>
        </li>
        <li>
            <NavLink to='/contact' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Contact Us</NavLink>
        </li>
    </ul>
</nav>

*/
