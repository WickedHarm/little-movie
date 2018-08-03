import React from "react";
import PropTypes from "prop-types";

import { axiosFetchMovies } from "../../axios";

import MovieCard from "../../components/MovieCard/MoveCard";
import Spinner from "../../components/Spinner/Spinner";
import classes from "./MoviesGrid.css";
import typography from "../../typography.css";
import { API_KEY } from "../../api_key";

class MoviesGrid extends React.Component {
    state = {
        movies: null
    }
    
    getMovies(reqType, amount, movieId) {
        if (!reqType) {
            return
        }

        let query = `${reqType}`;
        query = reqType && movieId ? query = `${movieId}/${reqType}` : reqType;

        axiosFetchMovies.get(`movie/${query}?api_key=${API_KEY}&language=en-US&page=1`)
            .then ( resp => {
                this.createGrid(resp.data.results, amount)
            } )
    }

    createGrid(data, amount) {
        const slicedData = amount ? data.slice(0, amount) :  data;
        const MovieCardArr = slicedData.map( item => <MovieCard key={item.id} movieData={item} /> )
        this.setState({
            movies: MovieCardArr
        })
    }

    switchGridType() {
        switch(this.props.type) {
            case "pop": 
                this.getMovies("popular", 18);
                break;
            case "top":
                this.getMovies("top_rated", 18);
                break;
            case "upcom":
                this.getMovies("upcoming", 18);
                break;
            case "recommend":
                this.getMovies("recommendations", 18, this.props.movieId);
                break;    
            default: return            
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movieId !== this.props.movieId) {
            this.switchGridType();
        }
    }
    

    componentDidMount() {
        this.switchGridType()
    }
    
    render() {
        if (this.state.movies) {
            const movList = this.state.movies.length ? this.state.movies : <h2>Nothing</h2>
            return (
                <div className={classes.GridSection}>
                    <div className={classes.content}>
                        <h2 className={typography.heading2}>{this.props.sectionName}</h2>
                        <div className={classes.MoviesGrid}>
                            {movList}
                        </div>
                    </div>
                </div>
            )
        }else {
            return <Spinner />
        }
        
    }
}

MoviesGrid.propTypes = {
    type: PropTypes.oneOf(["pop", "top", "upcom", "recommend"]).isRequired,
    sectionName: PropTypes.string,
    movieId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default MoviesGrid;