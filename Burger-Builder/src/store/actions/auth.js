import axios from "axios";
import * as actionTypes from './actionTypes'

export const checkAuth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD02jZf6hjOBpirgm6wV_RXA80tMn_9zlw", authData)
        .then(res => {
            console.log(res)
            dispatch(authSuccess(res.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(authFailure(error))
        })
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    console.log(authData)
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}