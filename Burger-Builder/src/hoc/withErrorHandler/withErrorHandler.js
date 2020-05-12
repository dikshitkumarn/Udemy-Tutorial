import React from "react"
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../_Aux/_Aux'

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends React.Component {
        state={
            error:null
        }

        closemodal = () => {
            this.setState({error: null})
        }

        componentWillMount = () => {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // console.log(req)
                this.setState({error: null})
                return req
            } )
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({error: error})
            } )
        }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.closemodal} >
                        {this.state.error ? this.state.error.message: null}
                    </Modal> 
                    <WrappedComponent {...this.props} /> 
                </Aux>
            )
        }
    }
}

export default withErrorHandler