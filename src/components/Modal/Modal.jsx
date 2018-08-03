import React, {Fragment} from "react";

import Overlay from "../Overlay/Overlay";
import classes from "./Modal.css";

class Modal extends React.Component {
    render() {               

        return (
            <Fragment>
                <div className={classes.Modal}>
                    {this.props.children}
                </div>
                <Overlay clicked={this.props.clicked} dark />
            </Fragment>
        )
    }
}

export default Modal;