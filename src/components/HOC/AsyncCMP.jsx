import React from "react";

const AsyncCMP = (Original) => {
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() {
            Original().then( cmp => {
                this.setState({
                    component: cmp.default
                })
            } )
        }

        render() {
            const Component = this.state.component;

            return Component ? <Component {...this.props}/> : null; 
        }
    }
}

export default AsyncCMP;