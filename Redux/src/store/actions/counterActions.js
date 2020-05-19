import * as actionTypes from './actionTypes'

// You can also Do those simle logics here but reducer is a good place

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    }
}

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        value: value
    }
}