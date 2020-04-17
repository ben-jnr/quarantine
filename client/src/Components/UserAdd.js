import React, { Component } from 'react';
import axios from 'axios';
import "./Styles/UserAdd.css";

class UserAdd extends Component {
    constructor(){
        super()
        this.state = {username :"", password:"", admin:"n", confirmpassword:""};
    }
    

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
          });
    }    


    handleSubmit = (event) =>{
        event.preventDefault();
        document.getElementById("PasswordMismatch").innerHTML = "";    
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
        };
        if(this.state.password === this.state.confirmpassword)
        {
            const data ={   username:this.state.username,
                            password:this.state.password,
                            admin: this.state.admin
                        };
            axios
            .post("http://localhost:9000/admin/useradd", data, config)
            .then(function(res){
                document.getElementById("PasswordMismatch").innerHTML = res.data;
            })
            .catch(err =>console.log(err));            
        }
        else{
            document.getElementById("PasswordMismatch").innerHTML = "Password Mismatch";
        }
        this.setState({username :"", password:"", admin:"n", confirmpassword:""}); 
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";        
    }
    

    render() {
        return (
            <div id="UserAddTab">
                <div id="NewUserForm">
                    <div className = "NewUserLabel">Username:</div>
                    <input onChange={this.handleChange} name="username" id="newUsername" type="text"></input>
                    <div className = "NewUserLabel">Password:</div>
                    <input onChange={this.handleChange} name="password" id="newPassword" type="password"></input>
                    <div className = "NewUserLabel">Re-enter Password:</div>
                    <input onChange={this.handleChange} name="confirmpassword" id="confirmPassword" type="password"></input> 
                    <div className = "NewUserLabel">Admin Privileges:</div>
                    Yes<input name="admin" onChange={this.handleChange} value="y" type="radio"></input>
                    No<input name="admin" onChange={this.handleChange} value="n" type="radio" checked id="Admin"></input>
                    <input type="submit" value="Create" id="UserCreateButton" onClick={this.handleSubmit}></input>
                </div>
                <div id="PasswordMismatch">

                </div>
            </div>
        );
    }
}

export default UserAdd;