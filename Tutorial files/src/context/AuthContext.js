import React from 'react'

const AuthContext = React.createContext({authentication: false, login: () => {}})

export default AuthContext