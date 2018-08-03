import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import noPhoto from "../../../../assest/no-image-available-man.png";

import classes from "./Stars.css";


class Stars extends React.Component {

    createActorsList(data) {
        const { cast } = data;
        const imgPath = "https://image.tmdb.org/t/p/w500";
        const actorsList = cast.slice(0, 14).map(item => {
            const { name, character, id, profile_path } = item;
            return (
                <li key={id}>
                    <figure>
                        <img src={profile_path ? imgPath + profile_path : noPhoto} alt={name} />
                        <span>{name}</span>
                    </figure>
                    <i><small>as</small>{character}</i>
                </li>)
        })

        return actorsList;
    }

    render() {
        const list = this.createActorsList(this.props.credits);

        return (
            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={this.props.show}
                timeout={{
                    enter: 500,
                    exit: 400
                }}
                classNames={{
                    enterActive: classes.Open,
                    enterDone: classes.Opened,
                    exitActive: classes.Close
                }}
            >
                <section className={classes.Credits}>
                    <div className={classes.Stars}>
                        <ul>
                            {list.length ? list : <h2 className={classes.nodata}>No data</h2>}
                        </ul>
                    </div>
                </section>
            </CSSTransition>
                )
            }
        }
        
export default Stars;