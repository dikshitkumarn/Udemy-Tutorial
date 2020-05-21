import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const submitStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const submitSuccess = (state, action) => {
        let newOrder = {...action.orderData} 
        newOrder = updateObject(newOrder, {id: action.id})
        return updateObject(state, {orders: state.orders.concat(newOrder), loading: false, purchased: true})
}

const submitFailure = (state, action) => {
    return updateObject(state, {loading: false, purchased: false}) 
}

const submitStarted = (state, action) => {
    return updateObject(state, {purchased: false})
}

const fetchOrderInit = (state, action) => {
    return updateObject(state, {loading:true})
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false})
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const orderSubmit = (state = initialState, action) => {

    switch (action.type){
        
        case(actionTypes.SUBMIT_START): return submitStart(state, action)

        case(actionTypes.SUBMIT_SUCCESS): return submitSuccess(state, action)

        case(actionTypes.SUBMIT_FAILURE): return submitFailure(state, action)

        case(actionTypes.SUBMIT_STARTED): return submitStarted(state, action)

        case(actionTypes.FETCH_ORDER_INIT): return fetchOrderInit(state, action)

        case(actionTypes.FETCH_ORDER_SUCCESS): return fetchOrderSuccess(state, action)

        case(actionTypes.FETCH_ORDER_FAIL): return fetchOrderFail(state, action)

        default:
            return state
    }
}

export default orderSubmit