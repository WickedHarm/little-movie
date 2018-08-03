import axios from "axios";

export const axiosFetchMovies = axios.create({
    baseURL: `https://api.themoviedb.org/3/`
})