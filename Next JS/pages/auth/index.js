import React from 'react'
import User from '../../components/User'

const authIndex = () => (
    <div>
        <h1>This is Auth Index Page</h1>
        <User name="Dikshit" age={18} />
        <style jsx > {`
            div{
                border: 5px solid #ccc;
                padding: auto;
                text-align: center;
            }
        `} </style>
    </div>
)

export default authIndex