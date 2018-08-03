import React from "react";

import mainLogo from "../../assest/main-logo.svg";
import classes from "./Header.css";

import Nav from "../Nav/Nav";

class Header extends React.Component {
    render() {
        return (
            <div className={classes.Header}>
                <div className={classes.content}>
                    <img className={classes.mainLogo} src={mainLogo} alt="main-logo"/>
                    <Nav />
                </div>
            </div>
        )
    }
}

export default Header;