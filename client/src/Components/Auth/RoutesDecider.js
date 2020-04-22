import React, { Component } from 'react';
import Login from './Login';
import Admin from '../Core/Admin';
import Home from '../Core/Home';
import { BrowserRouter, Route } from "react-router-dom";
import axios from 'axios';

var flag = 0;
class RoutesDecider extends Component {
    constructor(){
        super();
        this.state ={'type':""};
    }
   
    componentDidMount = ()=>
    {
        axios.get('http://localhost:9000/api/?id='+window.localStorage.getItem('session'))
        .then(res => this.setState({type:res.data}))
        .catch(err => console.log(err));
        flag =1;
    }
    
    render() {
        if(window.localStorage.getItem('session'))
        {    
            if(this.state.type === 'y')
            {
                return (
                    <div>
                    <Route exact path = "/" render={() => <Admin currTab="Institutions"/>} />
                    <Route exact path = "/admin" render={() => <Admin currTab="Institutions"/>} />
                    <Route exact path = "/admin/:name/:district" render={() => <Admin currTab="Rooms"/>} />
                    <Route exact path = "/admin/:name/:district/:room/:floor" render={() => <Admin currTab="Inmate"/>} />      
                    </div>
                );
            }
            else if(this.state.type === "User does not exist")
            {
                return( 
                    <Route path= '/' render={()=> <Login parentFunction={this.componentDidMount} /> }/>
                )
            }
            else if(flag===0){
                return(
                    <div></div>
                )
            }
            else{
                return( 
                    <Route path= '/' render={()=> <Login parentFunction={this.componentDidMount} /> }/>
                )
            }    
        }
        else
        {
            return(
                <Route path= '/' render={()=> <Login parentFunction={this.componentDidMount} /> }/>
            )
        }     
   }  
    
}    
export default RoutesDecider;   