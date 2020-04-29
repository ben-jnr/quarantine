import React, { Component } from 'react';
import DistrictInfo from './DistrictInfo';
class Home extends Component {
    
    logout = () => {
        window.location.replace("/");
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-3 mb-4">
                    <div className="col-3">
                            <div className="input-group">
                                <span class="badge badge-primary mr-2 homeBadge"><h5>1</h5></span>
                                <span className=""> Total rooms</span>
                            </div>
                    </div>
                    <div className="col-3">
                            <div className="input-group">
                                <span class="badge badge-success mr-2 homeBadge"><h5>1</h5></span>
                                <span className=""> Useable rooms</span>
                            </div>
                    </div>
                    <div className="col-3">
                            <div className="input-group">
                                <span class="badge badge-danger mr-2 homeBadge"><h5>1</h5></span>
                                <span className=""> Unuseable rooms</span>
                            </div>
                    </div>
                    
                </div>
                <div className="info">
                    <DistrictInfo/>
                </div>
            </div>
        );
    }
}

export default Home;