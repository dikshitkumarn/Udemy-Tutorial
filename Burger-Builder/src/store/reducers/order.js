import * as actionTypes from "../actions/actionTypes";

const initialState = {
    id: '',
    orders: [],
    error: null,
    loading: false
}

const orderSubmit = (state = initialState, action) => {
    switch (action.type){
        case(actionTypes.SUBMIT_START):
            return {
                ...state,
                loading: true
            }
        case(actionTypes.SUBMIT_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                orders: state.order.concat(newOrder),
                error: null,
                orderData: action.orderData,
                loading: false
            }
        case(actionTypes.SUBMIT_FAILURE):
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export default orderSubmit