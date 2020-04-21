import React, { Component } from 'react'

class DistrictInfo extends Component {
    render() {
        return (
            <div class="col-sm-4">
                <div class="card mt-2">
                    <h5 className="card-header">District Name</h5>
                    <div class="card-body">
                        <div id="accordion">
                            <div class="card">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Total cases</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Rooms</a>
                                    </li>
                                </ul>
                                <div class="tab-content p-2" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel">
                                        <button type="button" class="btn btn-primary mb-2">
                                            Quarantined <span class="badge badge-light">29</span>
                                        </button><br/>
                                        <button type="button" class="btn btn-success mb-2 mr-2">
                                            Discharging today<span class="badge badge-light">4</span>
                                        </button>
                                        <button type="button" class="btn btn-danger mb-2">
                                            Quarentined today <span class="badge badge-light">29</span>
                                        </button>
                                    </div>
                                    <div class="tab-pane fade" id="profile" role="tabpanel">
                                        <button type="button" class="btn btn-warning mb-2">
                                        Rooms available <span class="badge badge-light">7</span>
                                        </button><br/>
                                        <button type="button" class="btn btn-success mb-2 mr-2">
                                            Decontaminated<span class="badge badge-light">4</span>
                                        </button>
                                        <button type="button" class="btn btn-danger mb-2">
                                            Contaminated<span class="badge badge-light">3</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>    
                        <button className="btn btn-primary mt-2 float-right">More info</button>
                    </div> 
                </div>
            </div>

        )
    }
}

export default DistrictInfo
