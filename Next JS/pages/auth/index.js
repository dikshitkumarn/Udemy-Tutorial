import React from 'react'
import User from '../../components/User'

const authIndex = (props) => (
    <div>
        <h1>This is Auth Index Page - {props.appName} </h1>
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

authIndex.getInitialProps = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({appName: 'Super App (Auth)'})
        }, 1000)
    })
    return promise
}

export default authIndex