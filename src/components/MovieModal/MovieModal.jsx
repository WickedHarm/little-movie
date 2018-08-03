import React from "react";

import classes from "./MovieModal.css"

class MovieModal extends React.Component {
    render() {
        let content = this.props.show ? this.props.children : null;
        let ClN = this.props.show ? classes.Open : classes.Close; 
        return(
            <div className={classes.MovieModal + " " + ClN}>
                {content}
            </div>
        //     <div className={classes.MovieModal + " " + classes.Open}>
        //     {this.props.children}
        // </div>
        )
    }
}

export default MovieModal;