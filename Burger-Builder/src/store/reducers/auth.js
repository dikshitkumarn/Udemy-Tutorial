import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    authData: null,
    error: null
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_START):
            return{
                ...state,
                loading: true
            }
        case(actionTypes.AUTH_SUCCESS):
            return{
                ...state,
                loading: false,
                authData: action.authData
            }
        case(actionTypes.AUTH_FAILURE):
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default auth