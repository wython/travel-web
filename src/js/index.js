var React = require('react');
var ReactDOM = require('react-dom');

import app from './component/app';
var App = app(React);

ReactDOM.render(
    <App/>
    ,document.getElementById('app'));
