import * as actionTypes from './actions'

const initialState = {
    counter: 0,
    results: []
}

const reducer = ( state = initialState, action ) => {
    // SWITCH

    switch ( action.type ){
        case( actionTypes.INCREMENT ):
            return {
                ...state,
                counter: state.counter + 1
            }
        case( actionTypes.DECREMENT ):
            return {
                ...state,
                counter: state.counter - 1
            }
        case( actionTypes.ADD ):
            return {
                ...state,
                counter: state.counter + action.value
            }
        case( actionTypes.SUBTRACT ):
            return {
                ...state,
                counter: state.counter - action.value
            }
        case( actionTypes.STORE_RESULT ):
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: state.counter})
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

    // IF STATEMENT
    
    // if(action.type === "INCREMENT"){
    //     return {
    //         counter: state.counter + 1
    //     }
    // }

    // if(action.type === "DECREMENT"){
    //     return {
    //         counter: state.counter - 1
    //     }
    // }

    // if(action.type === "ADD"){
    //     return {
    //         counter: state.counter + action.value
    //     }
    // }

    // if(action.type === "SUBTRACT"){
    //     return {
    //         counter: state.counter - action.value
    //     }
    // }

    return state
}

export default reducer