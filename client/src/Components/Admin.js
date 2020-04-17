import React, { Component } from 'react';
import Institutions from "./Institutions";
import UserAdd from "./UserAdd";
import "./Styles/Admin.css";

class Admin extends Component {
    
    logout = () => {
        window.localStorage.removeItem("isAdminLogged");
        window.localStorage.removeItem("Name");
        window.location.replace("/");
    }

    render() {
        return (
            <div>
                <div id="AdminNav">    
                    <div id="AdminName">Hi, {window.localStorage.getItem("Name")}</div>
                    <button onClick ={this.logout} id="AdminLogoutButton">Logout</button>
                </div>

                <div id="Tabbar">
                    <div className="active" className="TabButton">Institutions</div>
                    <div className="TabButton">New User</div> 
                </div>

                <div id="TabWindow">
                    <Institutions id="Institutions"/>
                    <UserAdd id="UserAdd"/>
                </div>
            </div>
        );
    }
}

export default Admin;