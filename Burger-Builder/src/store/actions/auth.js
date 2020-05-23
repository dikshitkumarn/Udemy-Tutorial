import axios from "axios";
import * as actionTypes from './actionTypes'

export const checkAuth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = isSignUp ?  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD02jZf6hjOBpirgm6wV_RXA80tMn_9zlw": "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD02jZf6hjOBpirgm6wV_RXA80tMn_9zlw"
        axios.post(url, authData)
        .then(res => {
            console.log(res)
            dispatch(authSuccess(res.data))
            dispatch(checkAuthTime(res.data.expiresIn))
        })
        .catch(error => {
            console.log(error)
            dispatch(authFailure(error.response.data.error))
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

export const checkAuthTime = (expiryTime) => {
    return dispatch =>  {
        setTimeout(() => {
            return dispatch(logout())
        }, expiryTime * 1000);
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}