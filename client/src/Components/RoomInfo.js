import React, { Component } from 'react'
import InmateTab from './InmateTab'

class RoomInfo extends Component {
    render() {
        return (
            <div>
                <h2>Room no : room number here</h2>
                <div className="row">
                    <div className="col roomInfo container">
                        <button type="button" class="btn btn-primary mb-2">
                            Room no <span class="badge badge-light">4</span>
                        </button><br/>
                        <button type="button" class="btn btn-info mb-2">
                            Double Bed room <span class="badge badge-light"></span>
                        </button><br/>
                        <button type="button" class="btn btn-secondary mb-2">
                            No of inmates <span class="badge badge-light">4</span>
                        </button><br/>
                        <button className="btn btn-danger">Room status : Contaminated</button>
                    </div>
                    <div className="col peopleInfo">
                        <InmateTab/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomInfo
