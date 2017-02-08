import React from 'react'
import ReactDOM from 'react-dom'
import {Router,browserHistory} from 'react-router'
import routes from '../routers';
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';

//let store = createStore();


let rootEle = document.getElementById('app');

ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    rootEle
);