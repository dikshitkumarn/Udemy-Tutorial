    import React from 'react';
    import ReactDOM from 'react-dom';

    import { createStore, combineReducers, applyMiddleware } from 'redux'
    import { Provider } from 'react-redux'

    import './index.css';
    import App from './App';
    import registerServiceWorker from './registerServiceWorker';
    import counter from './store/reducers/counter'
    import result from './store/reducers/result'

    const rootReducer = combineReducers({
        ctr: counter,
        res: result
    })

    const logger = store => {
        return next => {
            return action => {
                console.log(action)
                const result = next(action)
                console.log("new state", store.getState())
                return result
            }
        }
    }

    const store = createStore(rootReducer, applyMiddleware(logger));

    ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
    registerServiceWorker();
