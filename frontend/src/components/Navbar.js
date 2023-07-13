import './styles/Navbar.css';
import { NavLink } from "react-router-dom";
import React from "react";
import logo from '../assets/WECCA-purple.png'

const Navbar = () => {
    return (
        <nav className='navbar-main'>
            <div className='nav-section' id='wecca-logo'>
                <div className='wecca-logo-image'/>
            </div>
            <div className='nav-section' id='nav-main'>
                <div className='nav-subsection'>
                    <NavLink to='/' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Home</NavLink>
                </div>
                <div className='nav-subsection'>
                    <NavLink to='/about' className={({ isActive }) => "link" + (isActive ? " active" : "")}>About</NavLink>
                </div>
                <div className='nav-subsection'>
                    <NavLink to='/calendar' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Calendar</NavLink>
                </div>
                <div className='nav-subsection'>
                    <NavLink to='/sponsors' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Sponsors</NavLink>
                </div>
                <div className='nav-subsection'>
                    <NavLink to='/contact' className={({ isActive }) => "link" + (isActive ? " active" : "")}>Contact Us</NavLink>
                </div>
            </div>
        </nav>
    )
}

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