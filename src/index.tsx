import React from 'react';
import ReactDOM from 'react-dom';
import 'macro-css';
import {BrowserRouter} from "react-router-dom";

import {App} from './App';
import './scss/app.scss';
import {Provider} from "react-redux";
import store from "./redux";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}><App/></Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
