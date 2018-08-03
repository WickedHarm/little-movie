import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./Nav.css";

const Nav = (props) => {
    return (
        <ul className={classes.Nav}>
           <NavLink to="/">Home</NavLink>
           <NavLink to="/movies">Movies</NavLink>
         </ul>
    )
}

export default Nav;