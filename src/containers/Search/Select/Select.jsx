import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classes from "./Select.css";
import Overlay from "../../../components/Overlay/Overlay";

class Select extends React.Component {
    
    
    render() {
    const {selectedIndex} = this.props;
    const findArr = this.props.res.map( (item, index) => {
                    //const title = item.title || item.original_title || item.original_name || null;
                    const title = item.title || item.original_title || null;
                    if (!title) {
                        return null
                    }
                    let release = item.release_date || item.first_air_date || null;
                    release ? release = release.slice(0, 4) : release = "unknown";
                    return (
                        <li className={selectedIndex === index ? classes.selected : null } key={item.id} onMouseOver={(e) => this.props.selectHandler(e, index)}>
                            <Link to={`/movies/${item.id}`}>{`${title}  (${release})`}</Link>
                        </li>)
                } )

        return (
            <Fragment>
                <ul className={classes.Select}>
                    {findArr.length ? findArr : <h2>Nothing</h2>}
                </ul> 
                <Overlay />
            </Fragment>
        )
    }
} 

Select.propTypes = {
    focus: PropTypes.bool.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    res: PropTypes.array,
    selectHandler: PropTypes.func
}

export default Select;