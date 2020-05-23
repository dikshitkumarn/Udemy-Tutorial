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
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000 )
            localStorage.setItem("token", res.data.idToken )
            localStorage.setItem("expirationDate", expirationDate )
            localStorage.setItem("userId", res.data.localId)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
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

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
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
    localStorage.removeItem("token")
    localStorage.removeItem('expirationDate')
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkStatus = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        const expirationDate = new Date(localStorage.getItem("expirationDate"))
        if(!token){
            dispatch(logout())
        }
        else{
            if(expirationDate <= new Date()){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}