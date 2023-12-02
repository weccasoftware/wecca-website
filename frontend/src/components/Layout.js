import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.js";

const Layout = () => {
    return (
        <div className="page-layout">
            <Navbar/>
            <Outlet />
        </div>
    )
}

export default Layout;