import React, {Fragment} from "react";

import Modal from "../Modal/Modal";

const WithError = (OriginalComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        dismissHandler = () => {
            this.setState({
                error: null
            })
        }

        setInterceptors() {

            if (this.reqIntercept===undefined && this.resIntercept===undefined) {
                this.reqIntercept =  axios.interceptors.request.use(req => req, error => {
                    this.setState({
                        error: error
                    })
                    return Promise.reject(error)
                });
    
                this.resIntercept = axios.interceptors.response.use(res => res, error => {
                    this.setState({
                        error: error
                    })
                    return Promise.reject(error)
                })
            }
            
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntercept)
            axios.interceptors.response.eject(this.resIntercept)
        }

        render() {
            const erMess = this.state.error ? this.state.error.message : "Custom Error";
            this.setInterceptors();
            const modal = this.state.error ? <Modal clicked={this.dismissHandler}><h1>{erMess}</h1><h3>Try again later</h3></Modal> : null;
            return (
                <Fragment>
                    {modal}
                    <OriginalComponent error={this.state.error} {...this.props} />
                 </Fragment> 
            )
        }
    }
}

export default WithError;