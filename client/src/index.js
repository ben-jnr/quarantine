import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Home from './Components/Home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render((
    <BrowserRouter>
        <div>
            {
                window.localStorage.getItem("isAdminLogged")? 
                    <Route exact path = "/" render={() => <Admin currTab="Institutions"/>}/>
                    :window.localStorage.getItem("isUserLogged")? 
                        <Route exact path = "/" component = {Home}/>
                        :<Route exact path = "/" component = {Login}/>
            }
            
            {
                window.localStorage.getItem("isAdminLogged")? 
                    <Route exact path = "/admin" render={() => <Admin currTab="Institutions"/>} />
                    :<Route exact path = "/admin" component = {Login} />
            }

            {
                window.localStorage.getItem("isAdminLogged")? 
                    <Route exact path = "/admin/:name/:district" render={() => <Admin currTab="Rooms"/>} />
                    :<Route exact path = "/admin/:name/:district" component = {Login} />
            }
            
            {
                window.localStorage.getItem("isAdminLogged")? 
                    <Route exact path = "/admin/:name/:district/:room/:floor" render={() => <Admin currTab="Inmate"/>} />
                    :<Route exact path = "/admin/:name/:district/:room/:floor" component = {Login} />
            }
            
            
            {
                window.localStorage.getItem("isUserLogged")?
                <Route exact path = "/home" component = {Home} />
                :<Route exact path = "/home" component = {Login} />
            }           
        </div>
   </BrowserRouter>
   ), document.getElementById('root'));


serviceWorker.unregister();
