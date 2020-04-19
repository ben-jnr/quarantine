import React, { Component } from 'react'
import InmateTab from './InmateTab'
import InmateAdd from './InmateAdd';


class RoomInfo extends Component {
    constructor(props){
        super(props)
        var url = window.location.pathname;
        this.name=url.split("/")[2].split("-")[0];
        this.district=url.split("/")[2].split("-")[1];
        this.no=url.split("/")[3].split("-")[0];
        this.floor=url.split("/")[3].split("-")[1];
        this.state = {
            status:"",
            Inmate:""
        };

    }
    
    

    RoomsRedirect = () =>{
        var url = "/admin/"+this.name+'-'+this.district + '/';
        window.location.assign(url);
    }


    render() {
        return (
            <div>
                <div>
                    <button onClick={this.RoomsRedirect} class='btn btn-primary'>Back</button>
                </div>
                <div className="row">
                    <div className="col roomInfo container">
                        <button type="button" class="btn btn-primary mb-2">
                            Room no <span class="badge badge-light">{this.no}</span>
                        </button><br/>
                        <button type="button" class="btn btn-primary mb-2">
                            Floor no <span class="badge badge-light">{this.floor}</span>
                        </button>
                        <button className="btn btn-danger">Room status : {this.status}</button>
                    </div>
                    <div className="col peopleInfo">
                        <InmateTab/>
                    </div>
                    <div>
                        <InmateAdd/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomInfo
