import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <Link to="/">Login </Link>
            <Link to="/register">Register</Link>
        </>
    )
};

export default NavBar;