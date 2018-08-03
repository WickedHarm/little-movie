import React from "react";
import LazyLoad from "react-lazy-load";

import MovieGrid from "../../containers/MoviesGrid/MoviesGrid";
import Footer from "../../Layout/Footer/Footer";
import WithError from "../../components/HOC/WithError";
import {axiosFetchMovies} from "../../axios";

const gridH = 940;

const Home = (props) => {
    return (
        <div>
            <LazyLoad height={gridH} onContentVisible={()=> {console.log("visible pop")}}>
                <MovieGrid sectionName="Popular" type="pop"/>
            </LazyLoad>    
            <LazyLoad height={gridH} onContentVisible={()=> {console.log("visible top")}}>
                <MovieGrid sectionName="Top Rated" type="top"/>
            </LazyLoad>
            <LazyLoad height={gridH} onContentVisible={()=> {console.log("visible upcom")}}>
                <MovieGrid sectionName="Upcoming" type="upcom"/>
            </LazyLoad>
            <Footer />
        </div>
    )
}

export default WithError(Home, axiosFetchMovies);