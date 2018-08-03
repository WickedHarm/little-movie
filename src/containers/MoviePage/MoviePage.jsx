import React from "react";
import { withRouter } from "react-router-dom";


import { axiosFetchMovies } from "../../axios";
import Crew from "./Cast/Crew/Crew";
import Stars from "./Cast/Stars/Stars";
import Spinner from "../../components/Spinner/Spinner";
import AsyncCMP from "../../components/HOC/AsyncCMP";
import WithError from "../../components/HOC/WithError";

import { API_KEY } from "../../api_key";
import classes from "./MoviePage.css";
import noPhoto from "../../assest/noPhotoMovie.png";

const AsyncRecommendations = AsyncCMP( () => import("../MoviesGrid/MoviesGrid") );


class MoviePage extends React.Component {
    state = {
        loadedMovie: null,
        loadedCredits: null,
        isPosterLoaded: false,
        showActors: false,
        showRecommend: false 
    }

  
    

    fetchMovie() {
        const query = this.props.history.location.pathname;
        const id = query.replace(/[^0-9]/g, "");

        const movie = axiosFetchMovies.get(`movie/${id}?api_key=${API_KEY}&language=en-US`)
        const credits = axiosFetchMovies.get(`movie/${id}/credits?api_key=${API_KEY}`)
        
        Promise.all([movie, credits])
            .then(responses => {
                const [movie, credits] = responses;
                this.setState({
                    loadedMovie: movie.data,
                    loadedCredits: credits.data,
                    showActors: false,
                    showRecommend: false
                })
            }).catch( e => {console.log(e)} )
    }

  

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchMovie();
        }
    }

    componentDidMount() {
        this.fetchMovie();
    }

    showActors = () => {
        this.setState( prevState => {
           return {
            showActors: !prevState.showActors
           } 
        } )
    }

    showRecommend = () => {
        this.setState( prevState => {
            return {
                showRecommend: !prevState.showRecommend
            }
        } )
    }

    render() {
        const { loadedMovie, loadedCredits } = this.state;
        const imgPathLarge = "https://image.tmdb.org/t/p/original/";
        const imgPathMed = "https://image.tmdb.org/t/p/w500/";
        if (loadedMovie && loadedCredits) {
            const style = {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 15%, rgba(0, 0, 0, 0) 70%, rgb(0, 0, 0) 100%), url(${imgPathLarge}${loadedMovie.backdrop_path})`
            }
            const { poster_path, release_date, vote_average, overview, budget, id } = this.state.loadedMovie;
            const title = loadedMovie.title || loadedMovie.original_title || null;
            const img = poster_path ?  imgPathMed + poster_path : noPhoto;
            const budgetSep = budget ? budget.toLocaleString("en") : "Unknown";
            //const releaseToLocal =  new Date(release_date).toLocaleString("en-us", {month: "long", year: "numeric", day: "2-digit"});
            const release = release_date ?
                new Date(release_date).toLocaleString("en-us", {month: "long", year: "numeric", day: "2-digit"})
                :
                "Unknown"
            ;
            
            //const img = this.state.isPosterLoaded ? imgUrl : " ";

            return (
                <div className={classes.MoviePage}>
                    <div className={classes.Backdrop} style={style}>
                        <div className={classes.content}>
                            <section className={classes.MainInfo} >
                                <div className={classes.posterWrapper}>
                                    <img key={id} src={img} className={classes.Poster} alt={title} />
                                </div>
                                <div className={classes.Detail}>
                                    <h1>{title}</h1>
                                    <p>Release <span>{release}</span> </p>
                                    <p>Average Vote <span>{vote_average}</span> </p>
                                    <p>Budget <span>{budgetSep}</span> </p>
                                    <h3>Overview</h3>
                                    <p className={classes.overview}>
                                        {overview}
                                    </p>
                                    <div className={classes.Control}>
                                        <button className={this.state.showActors ? classes.visited : ""} onClick={this.showActors}>Show credits</button>
                                        <button className={this.state.showRecommend ? classes.visited : ""} onClick={this.showRecommend}>Show Recommendation</button>
                                    </div>
                                    
                                </div>
                                <Crew credits={loadedCredits} />
                            </section>
                        </div>
                        </div>
                        
                        <div className={classes.content}>
                            <Stars credits={loadedCredits} show={this.state.showActors}/>
                        </div>

                        {this.state.showRecommend 
                            ? 
                            <section><AsyncRecommendations sectionName="Recommendations" type="recommend" movieId={id} /></section> 
                            : 
                            null}
                        
                </div>
            )
        } else return <Spinner />;

    }
}



export default withRouter( WithError(MoviePage, axiosFetchMovies)  );