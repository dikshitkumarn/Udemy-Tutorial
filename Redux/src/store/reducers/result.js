import * as actionTypes from '../actions/actionTypes'

const initialState = {
    results: []
}

const reducer = ( state = initialState, action ) => {
    // SWITCH
    // Do simple logics Here like res * 2
    switch ( action.type ){
        case( actionTypes.STORE_RESULT ):
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: action.counter *2 })
            }
        case( actionTypes.DELETE_RESULT ):
            // let id = 2
            // let newArray = [...state.results]
            // newArray.splice(id, 1)
            const updatedArray = state.results.filter(result => result.id !== action.resultElId)
            return {
                ...state,
                results: updatedArray
            }
    }

    return state
}

export default reducer