import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
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
                id: action.id,
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case(actionTypes.SUBMIT_FAILURE):
            return {
                ...state,
                loading: false,
                purchased: false
            }
        case(actionTypes.SUBMIT_STARTED):
            return {
                ...state,
                purchased: false
            }
        case(actionTypes.FETCH_ORDER_INIT):
            return {
                ...state,
                loading:true
            }
        case(actionTypes.FETCH_ORDER_SUCCESS):
        console.log(action.orders)
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case(actionTypes.FETCH_ORDER_FAIL):
            return{
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export default orderSubmit