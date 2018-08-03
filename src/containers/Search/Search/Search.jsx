import React from "react";
import { withRouter } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import { axiosFetchMovies } from "../../../axios";
import { API_KEY } from "../../../api_key";
import Select from "../Select/Select";

import classes from "./Search.css";
import SelectAnimation from "../Select/SelectAnimation.css";

class Search extends React.Component {

    state = {
        searchArr: null,
        focus: false,
        selected: 0
     }

    selectHandler = (e, index) => {
        const {selected, searchArr} = this.state;

        if (e.type === "mouseover") {
            this.setState( {
                selected: index
            } )
        }

        if(e.keyCode === 38 && selected > 0) {
            e.preventDefault();
            this.setState( prevState => ({
                selected: prevState.selected - 1
            }) )
        }
        if(e.keyCode === 40 && selected < searchArr.length - 1) {
            e.preventDefault();
            this.setState( prevState => ({
                selected: prevState.selected + 1
            }) )
        }
    }

    changeHandler = (e) => {
        if (e.target.value) {
            axiosFetchMovies.get(`search/movie?api_key=${API_KEY}&page=1&include_adult=false&query=${e.target.value}&language=en-US`)
            .then( resp => {
                this.setState({
                    searchArr: resp.data.results,
                    focus: true
                })
            } )
        }else {
            this.setState({
                focus: false
            })
        }
        
    }

    blurHandler = (e) => {
        this.setState({
            focus: false
        })
    } 

    sumbitHandler = (e) => {
        e.preventDefault();
        this.props.history.push(`/movies/${this.state.searchArr[this.state.selected].id}`)
        this.blurHandler();
    }

    render() {
        return (
            <form className={classes.SearchBox} onClick={this.blurHandler} onSubmit={this.sumbitHandler}>
                <input id="search" className={classes.Search} placeholder="Movie" type="text" onKeyDown={this.selectHandler} onChange={this.changeHandler}/>
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={this.state.focus}
                    timeout={200}
                    classNames={{
                        enterActive: SelectAnimation.Show
                    }}
                >
                    <Select focus={this.state.focus} selectedIndex={this.state.selected} res={this.state.searchArr} selectHandler={this.selectHandler}/>
                </CSSTransition>    
            </form>
            
        )
    }
}

export default withRouter(Search);