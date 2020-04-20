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
                <DistrictInfo/>
            </div>
        );
    }
}

export default Home;