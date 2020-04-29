import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';


function Login(props){   
    const defaultCredentials = {username:"", password:""}
    const [credentials , setCredentials] = useState(defaultCredentials);
    window.localStorage.removeItem('currTab');
    window.localStorage.removeItem('taluk');
    window.localStorage.removeItem('village');
    window.localStorage.removeItem('session');

    const handleChange = e => {
        setCredentials({...credentials, [e.target.name]:e.target.value});      
    }

    const setDefault = ()=>{
        setCredentials(defaultCredentials); 
        document.getElementById("username").value = "";
        document.getElementById("password").value = ""; 
    }


    const handleSubmit = e => {
        e.preventDefault();
        document.getElementById("loginMessage").innerHTML = "";    
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
        };
        const data ={username:credentials.username , password:credentials.password};
        setDefault();
        var url = "http://localhost:9000/api/login?id="+window.localStorage.getItem('session');
        axios
        .post(url, data, config)
            .then(res =>{ 
                window.localStorage.setItem('session',res.data);
                props.parentFunction();
            })
            .catch(err => console.log(err));
    }


    return (
        <div>
            <LoginForm handleChangeParent = {handleChange} handleSubmitParent = {handleSubmit} />
            <div id="loginMessage"></div>
        </div>
    )
}

export default Login;