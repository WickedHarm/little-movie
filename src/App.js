import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Header from "./components/Header/Header";
import Search from "./containers/Search/Search/Search";
import Home from "./components/Home/Home";
import MoviePage from "./containers/MoviePage/MoviePage";
import classes from "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
            <Header />
            <Search />
            <Route exact path="/" component={Home}/>
            {/* <Route path="/movies" component={Search}/> */}
            <Route exact path="/movies/:id" component={MoviePage}/>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
