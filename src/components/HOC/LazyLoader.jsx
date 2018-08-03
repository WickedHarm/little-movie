import React, { Fragment } from "react";
import ReactDOM from "react-dom";

export class HitTarget extends React.Component {
    constructor(props) {
        super(props);
        this.elRef = React.createRef();
    }

    componentDidMount() {
        const el = this.elRef.current;
        const elCoord = el.getBoundingClientRect();
        console.log(elCoord)
    }

    render() {
        return (
            <div ref={this.elRef} >
                <h1 style={{color: "red"}}>ETO HitTarget</h1>
            </div>
        )
    }
}

class LazyLoader extends React.Component {
    state = {
        show: true
    }

    scrollListener() {
        let scrollY = 0;
        window.addEventListener("scroll", (e) => {
            
            console.log(window.body.scrollHeight)
        })
        
    }

    hitHandler() {
        console.log(window.scrollHeight)
    }

    componentDidMount() {
        this.scrollListener()
    }

    render() {
        return (
            <Fragment>

                {this.state.show ? this.props.children : null}
            </Fragment>    
        )
    }
}




export default LazyLoader;