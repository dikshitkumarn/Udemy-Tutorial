import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility/utility";

const initialState = {
    results: []
}

const deleteResult = (state, action)  => {
    const updatedArray = state.results.filter(result => result.id !== action.resultElId)
    return updateObject(state, {results: updatedArray})
}

const reducer = ( state = initialState, action ) => {
    // SWITCH
    // Do simple logics Here like res * 2
    switch ( action.type ){
        case( actionTypes.STORE_RESULT ): return updateObject(state, {results: state.results.concat({ id: new Date(), value: action.counter *2 })})
            
            // return {
            //     ...state,
            //     results: state.results.concat({ id: new Date(), value: action.counter *2 })
            // }
        case( actionTypes.DELETE_RESULT ): return deleteResult(state, action)
            // let id = 2
            // let newArray = [...state.results]
            // newArray.splice(id, 1)
            // return {
            //     ...state,
            //     results: updatedArray
            // }
    }

    return state
}

export default reducer