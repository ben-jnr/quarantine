import React, { Component } from 'react'
import InmateTab from './InmateTab'
import InmateAdd from './InmateAdd';
import axios from 'axios';


class RoomInfo extends Component {
    constructor(props){
        super(props);
        var url = window.location.pathname;
        this.name=url.split("/")[2];
        this.district=url.split("/")[3];
        this.no=url.split("/")[4];
        this.floor=url.split("/")[5];
        this.state = {status:"",
                        room:{}};
    }
    

    RoomsRedirect = () =>{
        var url = "/admin/"+this.name+'/'+this.district + '/';
        window.location.assign(url);
    }


    componentDidMount=() =>{
        var patientUrl = 'http://localhost:9000/admin/'+this.name+'/'+this.district+'/'+this.no+'/'+this.floor+'/patient/';
        axios.get(patientUrl)
        .then(res => {
            if(res.data.mssg !== "Room Found")
                window.location.replace('/admin/'+this.name+'/'+this.district+'/');
            else    
            {
                this.setState({status:res.data.room.status,
                                room:res.data.room});
            }  
        })
        .catch(err =>console.log(err));
    }          


    parentRender=()=>{
        this.componentDidMount();
    }


    render() {
        var comp;
        if(this.state.room.name === ""){
            comp=<InmateAdd parentRender={this.parentRender}/>;}
        else
            comp=<InmateTab data={this.state.room}/>;

        return (
            <div>
                <div>
                    <button onClick={this.RoomsRedirect} class='btn btn-primary'>Back</button>
                </div>
                <div className="row">
                    <div className="col roomInfo container">
                        <button type="button" class="btn btn-primary mb-2">
                            Room no : <span class="badge badge-light">{this.no}</span>
                        </button><br/>
                        <button type="button" class="btn btn-primary mb-2">
                            Floor no :   <span class="badge badge-light">{this.floor}</span>
                        </button>
                        <button type="button" className="btn btn-danger mb-2">
                            Contaminated : <span class="badge badge-light">{this.state.status}</span>
                        </button>
                    </div>
                    {comp}
                </div>
            </div>
        )
    }
}

export default RoomInfo
