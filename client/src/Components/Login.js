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
                if(res.data.admin === 'y'){
                    window.localStorage.setItem("isAdminLogged", "true");
                    window.localStorage.setItem("Name", res.data.name);
                    window.location.assign("./admin");    
                }
                else if(res.data.admin === 'n'){
                    window.localStorage.setItem("isUserLogged", "true");
                    window.localStorage.setItem("Name", res.data.name);
                    window.location.assign("./home");
                }
                else{
                    document.getElementById("Message").innerHTML = "Invalid Credentials";
                }
            })
        .catch(err => console.log(err))
        
    }


    render() {
        return (
            <div id="Login">
                <div id="LoginForm">
                    <div className="LoginLabel">Username</div>
                    <input onChange={this.handleChange} name="username" id="username" type="text"></input>
                    <div className="LoginLabel">Password</div>
                    <input onChange={this.handleChange} name="password" id="password" type="password"></input>
                    <input type="submit" onClick={this.handleSubmit} value="Login" id="LoginButton"></input>
                </div>
                <div id="Message"></div>
            </div>
        );
    }

}

export default Login;