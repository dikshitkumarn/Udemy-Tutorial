import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
    isAuth: false,
    login: () => {}
})

export const AuthContextProvider = (props) => {

    const [isAuth, setIsAuth] = useState(false)

    const login = () => {
        setIsAuth(true)
    }

    return <AuthContext.Provider value={{isAuth: isAuth, login: login}} >{props.children}</AuthContext.Provider>
}