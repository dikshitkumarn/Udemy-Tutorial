import * as actionTypes from './actionTypes'

export const saveResult = (counter) => {
    return {
        type: actionTypes.STORE_RESULT,
        counter: counter
    }
}

export const storeResult = (counter) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(counter))
        }, 2000);
    }
    
}

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: id
    }
}