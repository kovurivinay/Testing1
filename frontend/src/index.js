import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { Provider } from "react-redux";
//import { createStore, applyMiddleware, compose } from "redux";
//import promise from "redux-promise";
//import reducer from './reducers/reducer_login';
//import thunk from 'redux-thunk';
//import logger from 'redux-logger';
//import RootReducer from "./reducers";
// import store from "./store";
//middleware settings
// To resolve promise to store we use apply
// const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
//createStoreWithMiddleware(RootReducer)
//const store = createStore(reducer, {}, applyMiddleware(thunk));

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<App crossorigin />, document.getElementById('root'));
registerServiceWorker();
