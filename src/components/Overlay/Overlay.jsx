import React from "react";

import classes from "./Overlay.css";

const Overlay = (props) => {
    const cls = props.dark ? [classes.Overlay, classes.dark].join(" ") : classes.Overlay; 
    return (
        <div className={cls} onClick={props.clicked}></div>
    )
}

export default Overlay;