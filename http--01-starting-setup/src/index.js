import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.interceptors.request.use(
    requestconfig => {
        console.log(requestconfig)
        // TO unblock requests return
        return requestconfig
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    responseconfig => {
        console.log(responseconfig)
        //To use response in individual functions return
        return responseconfig
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
