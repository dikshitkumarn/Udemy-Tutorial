import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderSubmit = (state = initialState, action) => {
    switch (action.type){
        case(actionTypes.SUBMIT_START):
            return updateObject(state, {loading: true})

        case(actionTypes.SUBMIT_SUCCESS):
            let newOrder = {...action.orderData} 
            newOrder = updateObject(newOrder, {id: action.id})
            return updateObject(state, {orders: state.orders.concat(newOrder), loading: false, purchased: true})

        case(actionTypes.SUBMIT_FAILURE):
            return updateObject(state, {loading: false, purchased: false}) 

        case(actionTypes.SUBMIT_STARTED):
            return updateObject(state, {purchased: false})

        case(actionTypes.FETCH_ORDER_INIT):
            return updateObject(state, {loading:true})

        case(actionTypes.FETCH_ORDER_SUCCESS):
            return updateObject(state, {orders: action.orders, loading: false})

        case(actionTypes.FETCH_ORDER_FAIL):
            return updateObject(state, {loading: false})

        default:
            return state
    }
}

export default orderSubmit