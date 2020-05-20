import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders'

export const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.SUBMIT_SUCCESS,
        id: id,
        orderData: orderData,
    }
}

export const orderFailue = error => {
    return {
        type: actionTypes.SUBMIT_FAILURE,
        error: error
    }
}

export const orderSubmitStart = () => {
    return {
        type: actionTypes.SUBMIT_START
    }
}

export const orderSubmit = (order) => {
    return dispatch => {
        dispatch(orderSubmitStart())
        axios.post( '/orders.json', order )
            .then( res => {
                console.log(res.data)
                dispatch( orderSuccess( res.data.name, order) );
                // this.props.history.push( '/' );
            } )
            .catch( error => {
                dispatch(orderFailue( error ));
            } );
    }
}

export default orderSubmit