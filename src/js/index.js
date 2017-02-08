import React from 'react'
import ReactDOM from 'react-dom'
import {Router,browserHistory} from 'react-router'
import routes from '../routers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

//reducer
function reducer(state = {},action) {
    switch (action.type) {
        default:
            return state;
    }
}

let store = createStore(reducer,{test:'hello world'});


let rootEle = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
    rootEle
);