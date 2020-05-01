import React, { Component } from 'react'
import InmateTab from '../Inmate/InmateTab'
import InmateAdd from '../Inmate/InmateAdd';
import axios from 'axios';

var flag=0;
class RoomInfo extends Component {
    constructor(props){
        super(props);
        var url = window.location.pathname;
        this.name=url.split("/")[2];
        this.district=url.split("/")[3];
        this.no=url.split("/")[4];
        this.floor=url.split("/")[5];
        this.state = {room:{}};
    }
    

    RoomsRedirect = () =>{
        var url = "/admin/"+this.name+'/'+this.district + '/';
        window.location.assign(url);
    }


    componentDidMount=() =>{
        flag=1;
        var patientUrl = 'http://18.223.108.131:9000/api/'+this.name+'/'+this.district+'/'+this.no+'/'+this.floor+'/patient/';
        axios.get(patientUrl)
        .then(res => {
            if(res.data.mssg !== "Room Found")
                window.location.replace('/admin/'+this.name+'/'+this.district+'/');
            else    
            {
                this.setState({room:res.data.room});
            }  
        })
        .catch(err =>console.log(err));
    }          




    decontaminate = () =>{
        if(window.confirm("Are you sure?"))
        {
            var room = this.state.room;
            room.status = "no";
            var url = "http://18.223.108.131:9000/api/"+this.name+'/'+this.district+'/'+this.no+'/'+this.floor;
            var config = {
                headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
            };
            axios.post(url,room,config)
            .catch(err=>console.log(err));
            this.setState({status:'no'});   
        }
    }



    parentRender=(data)=>{
        this.setState({room:data})
    }


    render() {
        var comp;
        if(this.state.room.name === "" && flag===1){
            {
                if(this.state.room.status === 'yes'){
                    document.getElementById("RoomStatusBtn").classList.remove('btn-success');
                    document.getElementById("RoomStatusBtn").classList.add('btn-danger');
                    comp=(<p>DeContaminate the room !! <button onClick={this.decontaminate} class='btn btn-danger'>Decontaminated!!</button></p>);
                }
                else{
                    document.getElementById("RoomStatusBtn").classList.add('btn-success');
                    document.getElementById("RoomStatusBtn").classList.remove('btn-danger');
                    comp=<InmateAdd parentRender={this.parentRender} />}
                }
            }
        else if(flag===1)
        {
            comp=<InmateTab parentRender={this.parentRender} />;
            document.getElementById("RoomStatusBtn").classList.remove('btn-success');
            document.getElementById("RoomStatusBtn").classList.add('btn-danger');
        }

        return (
            <div className="container ">
                <div>
                    <button onClick={this.RoomsRedirect} class='btn btn-primary'>Back</button>
                </div>
                <div className="row">
                    <div className="col roomInfo container">
                        <button type="button" class="btn mb-2">
                            Room no : <span class="badge badge-light">{this.no}</span>
                        </button><br/>
                        <button type="button" class="btn mb-2">
                            Floor no :   <span class="badge badge-light">{this.floor}</span>
                        </button>
                        <div>
                        <button type="button" className="btn mb-2" id="RoomStatusBtn">
                            Contaminated  : <span class="badge badge-light">{this.state.room.status}</span>
                        </button>
                        </div>
                    </div>
                    {comp}
                </div>
            </div>
        )
    }
}

export default RoomInfo
