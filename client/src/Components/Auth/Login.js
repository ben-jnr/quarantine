import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    constructor(){
        super();
        this.state = {username:"" , password:""};
        window.sessionStorage.removeItem('currTab');
        window.sessionStorage.removeItem('location');
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
        .post("http://localhost:9000/api/login", data, config)
        .then(function(res)
            {
                if(window.sessionStorage.getItem("isAdminLogged")){
                    window.location.assign("./admin");
                    return;    
                }
                if(window.sessionStorage.getItem("isUserLogged")){
                    window.location.assign("./home");
                    return;    
                }
                console.log(res.data);
                if(res.data ==null) {
                    document.getElementById("Message").innerHTML = "Invalid Credentials";
                }
                else if(res.data.admin === 'y'){
                    window.sessionStorage.setItem("isAdminLogged", "true");
                    window.location.assign("./admin");    
                }
                else if(res.data.admin === 'n'){
                    window.sessionStorage.setItem("isUserLogged", "true");
                    window.location.assign("./home");
                }
            })
        .catch(err => console.log(err))
        window.sessionStorage.setItem('currTab',"Home");
        window.sessionStorage.setItem('location',"Alappuzha");
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