import React, { Component } from 'react';
import DistrictInfo from './DistrictInfo';
class Home extends Component {
    
    logout = () => {
        window.localStorage.removeItem("isUserLogged");
        window.localStorage.removeItem("Name");
        window.location.replace("/");
    }

    render() {
        return (
            <div>
                {/*<h1>Home Page</h1>    
                <div id="UserName">Hi, {window.localStorage.getItem("Name")}</div>
                <button onClick ={this.logout} id="UserLogoutButton">Logout</button>*/}
                <DistrictInfo/>
            </div>
        );
    }
}

export default Home;