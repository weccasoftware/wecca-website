import './styles/Navbar.css';
import { NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
    return (
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
    )
}

export default Navbar;