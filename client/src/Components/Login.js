import React, { Component } from 'react';
import axios from 'axios';
import "./Styles/Login.css";


class Login extends Component {
    constructor(){
        super();
        this.state = {username:"" , password:""};
    }


    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    

    handleSubmit = event => {
        event.preventDefault();
        document.getElementById("Message").innerHTML = "";    
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
        };
        const data =this.state;
        this.setState({username:"", password:""}); 
        document.getElementById("username").value = "";
        document.getElementById("password").value = ""; 
        axios
        .post("http://localhost:9000/login", data, config)
        .then(function(res)
            {
                if(window.localStorage.getItem("isAdminLogged")){
                    window.location.assign("./admin");
                    return;    
                }
                if(window.localStorage.getItem("isUserLogged")){
                    window.location.assign("./home");
                    return;    
                }
                console.log(res.data);
                if(res.data ==null) {
                    document.getElementById("Message").innerHTML = "Invalid Credentials";
                }
                else if(res.data.admin === 'y'){
                    window.localStorage.setItem("isAdminLogged", "true");
                    window.localStorage.setItem("Name", res.data.name);
                    window.location.assign("./admin");    
                }
                else if(res.data.admin === 'n'){
                    window.localStorage.setItem("isUserLogged", "true");
                    window.localStorage.setItem("Name", res.data.name);
                    window.location.assign("./home");
                }
            })
        .catch(err => console.log(err))
        
    }


    render() {
        return (
            <div id="Login">
            <div className="container col-md-4" id="Login">
                <h1 className="text-center loginH1">LOGIN</h1>
            <form id="LoginForm">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={this.handleChange} name="username" id="username" className="form-control"  placeholder="Enter username"/>
                </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={this.handleChange} name="password" id="password" className="form-control" placeholder="Password" />
            </div>

                <button type="submit" onClick={this.handleSubmit} value="Login" id="LoginButton" className="btn btn-primary">Login</button>
            </form>
            </div>
            <div id="Message"></div>
            </div>
        );
    }

}

export default Login;