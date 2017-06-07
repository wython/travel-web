/**
 * Entry file
 * Created by wython on 2017/3/25.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../css/index.css'
import store from './store'
import RoutersInit from './routers'
const Routers = RoutersInit(store);

//wangEditor


let rootElement = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Routers/>
    </Provider>
,rootElement);
