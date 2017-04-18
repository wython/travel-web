/**
 * Entry file
 * Created by wython on 2017/3/25.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../css/index.css'
import store from './store'
import Routers from './routers'

store.subscribe = function (state) {
    console.log(store.getState())
};

let rootElement = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Routers/>
    </Provider>
,rootElement);
