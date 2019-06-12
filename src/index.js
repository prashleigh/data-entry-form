import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import { reducers as dataentryformReducer, initialState as dataentryformInitialState } from './components/data-entry-form';

import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    { trace: true, traceLimit: 25 }
) || compose;

/**
 * Middleware for returning chained redux actions
 */
const chainedActons = store => next => action => {
    if (Array.isArray(action)) {
        // return action.reduce((state, action) => Object.assign({}, state, store.dispatch(action)), store.getState());
        return action.map(store.dispatch);
    } else {
        return next(action);
    }
}
// END

const reducers = Object.assign({},
    dataentryformReducer,
    { authentication: (state = {}, action) => state },
    { noop: (state = {}, _) => state }
);

const initialState = Object.assign({},
    dataentryformInitialState
);

const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(
        chainedActons
    ))
);

// TODO(remove)
window.store = store;

// TODO(configure auth)
const user = {};

ReactDOM.render(
    <Provider store={store}>
        <App user={user} />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
