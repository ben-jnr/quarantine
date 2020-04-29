import React, { Component } from 'react'

class DistrictInfo extends Component {
    render() {
        return (
                <div className="row mr-3 homeRow">
                        <div className="col-3"><span>District name</span></div>
                        <div className="col-1">
                                    <span class="badge badge-primary mr-2 homeBadge"><h5>1</h5></span>
                        </div>
                        <div className="col-1">
                                    <span class="badge badge-success mr-2 homeBadge"><h5>1</h5></span>
                        </div>
                        <div className="col-1">
                                    <span class="badge badge-danger mr-2 homeBadge"><h5>1</h5></span>
                        </div>
                </div>
        )
    }
}

export default DistrictInfo
