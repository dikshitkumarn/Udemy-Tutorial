import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';  
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Interseptors_request = axios.interceptors.request.use(
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

const Interseptors_response = axios.interceptors.response.use(
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

axios.interceptors.request.eject(Interseptors_request)
axios.interceptors.response.eject(Interseptors_response)

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
