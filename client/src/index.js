//conect react app to index html file
import React from 'react';
import ReactDOM from 'react-dom';

/*
intialize redux here - needs all those 3 imports dri provider sampe thunk
    provider keeps track of store - a global state which allow us to access that store from anywhere inside app, gk hrs di parent component  or child - accessing state
*/
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//(2) referring to this one from reducers/index.js
import reducers from './reducers';  //anytime ada import begini hrs ada export kan, so we go to reducers' index.js

import App from './App'; // a component
import './index.css';

//have to create store to set up redux
const store = createStore(reducers, compose(applyMiddleware(thunk)));   //now we have the reducer var in store


ReactDOM.render(
    <Provider store={store}> {/* yg di dlm {} is the store from const store */}
        <App/> 
    </Provider>,
    
    document.getElementById('root')
);
//wrap app with provider component