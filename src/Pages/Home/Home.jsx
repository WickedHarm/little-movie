import React from "react";

import MovieGrid from "../../containers/MoviesGrid/MoviesGrid";
import WithError from "../../components/HOC/WithError";
import {axiosFetchMovies} from "../../axios";

const Home = (props) => {
    return (
        <div>
            <MovieGrid sectionName="Popular" type="pop"/>
            <MovieGrid sectionName="Top Rated" type="top"/>
            <MovieGrid sectionName="Upcoming" type="upcom"/>
        </div>
    )
}

export default WithError(Home, axiosFetchMovies);