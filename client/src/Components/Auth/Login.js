import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {username:"" , password:""};
        window.localStorage.removeItem('currTab');
        window.localStorage.removeItem('location');
        window.localStorage.removeItem("session");
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
        const tempThis = this;
        var url = "http://localhost:9000/api/login?id="+window.localStorage.getItem('session');
        axios
        .post(url, data, config)
                .then(res =>{ 
                            window.localStorage.setItem('session',res.data);
                            window.localStorage.setItem('currTab',"Home");
                            window.localStorage.setItem('location',"Alappuzha");
                            tempThis.props.parentFunction();
                        })
                .catch(err => console.log(err));
        window.sessionStorage.setItem('currTab',"Home");
        window.sessionStorage.setItem('location',"Alappuzha");
        tempThis.props.parentFunction();
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