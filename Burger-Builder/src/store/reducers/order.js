import * as actionTypes from "../actions/actionTypes";

const initialState = {
    id: '',
    orderData: null,
    error: null,
    loading: false
}

const orderSubmit = (state = initialState, action) => {
    switch (action.type){
        case(actionTypes.SUBMIT_SUCCESS):
            return {
                ...state,
                error: null,
                orderData: action.orderData,
                loading: false
            }
        case(actionTypes.SUBMIT_FAILURE):
            return {
                ...state,
                id: action.id,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export default orderSubmit