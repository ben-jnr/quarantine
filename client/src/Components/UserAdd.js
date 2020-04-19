import React, { Component } from 'react';
import axios from 'axios';
import "./Styles/UserAdd.css";

class UserAdd extends Component 
{
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
        if(this.state.username !== "" && this.state.password !== ""
                    && this.state.confirmpassword !== "" && this.state.admin !== "")
        {
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
        }
        else{
            document.getElementById("PasswordMismatch").innerHTML = "Empty Field Present";
        }    
        this.setState({username :"", password:"", admin:"n", confirmpassword:""}); 
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";        
    }
    


    render() {
        return (

            <div>
                <form className="col-md-7">
                    <h2 className="text-center">Add User</h2><hr/>
                    <div className="form-group">
                        <label for="username">Email address</label>
                        <input type="email" className="form-control" id="newUsername" onChange={this.handleChange} name="username" placeholder="Enter email" required/>
                    </div>
                    <div className="form-group">
                        <label for="newPassword">Password</label>
                        <input type="password" onChange={this.handleChange} name="password" className="form-control" id="newPassword" placeholder="Password" required/>
                    </div>
                    <div className="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" onChange={this.handleChange} name="confirmpassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" required/>
                    </div>
                    <h4>Grant admin privileges ?</h4>
                    <div className="row mb-3 ml-2">
                    <div class="custom-control custom-radio">
                        <input type="radio" id="rBtn1" name="admin" value="y" class="custom-control-input"/>
                        <label class="custom-control-label" for="rBtn1">Yes</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="rBtn2" name="admin" value="n" class="custom-control-input"/>
                        <label class="custom-control-label" for="rBtn2">No</label>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add User</button>
                    </form>
                    <div id="PasswordMismatch">
                        
                    </div>
                    
            </div>
            
        );
    }
}

export default UserAdd;