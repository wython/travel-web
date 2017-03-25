/**
 * Entry file
 * Created by wython on 2017/3/25.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store'
import Routers from './routers'

let rootElement = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Routers/>
    </Provider>
,rootElement);
