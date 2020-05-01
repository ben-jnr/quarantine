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
        document.getElementById("loader").style.visibility = "visible";
        document.getElementById("loaderText").style.visibility ="visible";
        setTimeout(()=>{
            document.getElementById("loginMessage").innerHTML = "";    
            var config = {
                headers: {'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true}
            };
            const data ={username:credentials.username , password:credentials.password};
            setDefault();
            var url = "https://www.ccctsr.in/api/login?id="+window.localStorage.getItem('session');
            axios
            .post(url, data, config)
                .then(res =>{
                    if(res.data === "User does not exist")
                    {
                        document.getElementById("loader").style.visibility = "hidden";
                        document.getElementById("loaderText").style.visibility ="hidden";
                        document.getElementById("loginMessage").innerHTML = "User does not exist"; 
                    } 
                    window.localStorage.setItem('session',res.data);
                    props.parentFunction();
                })
                .catch(err => console.log(err));
        }
    ,1000);
    }   


    return (
        <div>
            <LoginForm handleChangeParent = {handleChange} handleSubmitParent = {handleSubmit} />
            <div id="loginMessage"></div>
        </div>
    )
}

export default Login;
