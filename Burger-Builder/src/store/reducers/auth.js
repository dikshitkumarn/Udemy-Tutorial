import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility";

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading:true})
}


const authSuccess = (state, action) => {
    return updateObject(state, {error:null, loading: false, token: action.idToken, userId: action.localId})
}

const authFailure = (state, action) => {
    return updateObject(state, {loading: false, error: action.error})
}

const authLogOut = (state, action) => {
    return updateObject(state, {token: null, userId: null})
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_START): return authStart(state, action)

        case(actionTypes.AUTH_SUCCESS): return authSuccess(state, action)
        
        case(actionTypes.AUTH_FAILURE): return authFailure(state, action)

        case(actionTypes.AUTH_LOGOUT): return authLogOut(state, action)
        
        default:
            return state
    }
}

export default auth