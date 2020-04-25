import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Components/Auth/RoutesDecider';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import RoutesDecider from './Components/Auth/RoutesDecider';

ReactDOM.render((
    <BrowserRouter> 
        <RoutesDecider />
   </BrowserRouter>
   ), document.getElementById('root'));


serviceWorker.unregister();
