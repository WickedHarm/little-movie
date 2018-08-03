import React from "react";
import {withRouter} from "react-router-dom";

import MovieModal from "../MovieModal/MovieModal";
import classes from "./MovieCard.css";

class MovieCard extends React.Component {
    state = {
        showModal: false
    }

    modalHandler = (pos) => {
       pos ? this.setState({showModal: true}) : this.setState({showModal: false})
    } 
    
    clickHandler = (id) => {
        this.props.history.push(`/movies/${id}`);
    }

    render() {
        const imgPath = "https://image.tmdb.org/t/p/w500";
        const {poster_path, release_date, title, vote_average, overview, id} = this.props.movieData;
        return (
            <div className={classes.MovieCard} onClick={() => this.clickHandler(id)} onMouseOver={() => this.modalHandler(true)} onMouseLeave={() => this.modalHandler(false)}>
                <img src={imgPath + poster_path} alt="movieCard"/>
                
                <MovieModal show={this.state.showModal}>
                    <div>
                        <span>{vote_average}</span>
                        <h3>{title}</h3>
                        <span>{release_date}</span>
                    </div>
                    <p>{overview}</p>
                </MovieModal>    
                
            </div>
        )
    }
}

export default withRouter(MovieCard);