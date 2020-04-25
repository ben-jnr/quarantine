import React, { Component } from 'react';
import DistrictInfo from './DistrictInfo';
class Home extends Component {
    
    logout = () => {
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