import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "./components/Header/Header";
import Search from "./containers/Search/Search/Search";
import Home from "./Pages/Home/Home";
import MoviePage from "./Pages/MoviePage/MoviePage";
import NotFound from "./Pages/NotFound/NotFound";
import classes from "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
            <Header />
            <Search />
            <Switch>
              <Route exact path="/" component={Home}/>
              {/* <Route path="/movies" component={Search}/> */}
              <Route exact path="/movies/:id" component={MoviePage}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
