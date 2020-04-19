import React, { Component } from 'react';
import axios from 'axios';

class Room extends Component {

    constructor(props){
        super(props);
        this.state={no:"",
                    floor:"",
                    status:"",
                    Rooms :[]};
        var url = window.location.pathname;
        this.name=url.split('/')[2].split('-')[0];
        this.district=url.split('/')[2].split('-')[1];                           
    }



    handleChange =(event)=>{    
        this.setState({
            [event.target.name]: event.target.value
          });
    }  

    handleDropdown = event =>{
        this.setState({
            status: event.target.options[event.target.options.selectedIndex].value
          });
    }




    handleSubmit = (event) =>{
        event.preventDefault();
        document.getElementById("RoomAddMssg").innerHTML = "";    
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
        };
        
        if(this.state.no !== "" && this.state.status !== "" && this.state.floor !== "")
        {
            const data ={
                        no:this.state.no,
                        floor:this.state.floor,
                        status:this.state.status
                        };
            var tempThis = this;
            var url = "http://localhost:9000/admin/"+this.name+'/'+this.district;
            axios
            .post(url, data, config)
            .then(function(res){
                if(res.data.mssg === "Room Successfully Added")
                {
                    console.log(res.data.rooms);
                    const Rooms = res.data.rooms.map( u => 
                        <div className="InstitutionsContainer">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <h5 className="card-title">Room No: {u.no}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Floor: {u.floor}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                                    <button className="btn btn-primary  mt-2 ml-2 float-right">Info</button>
                                    <button className="btn btn-danger DeleteInstitution mt-2 float-right">Delete</button>
                                </div>  
                            </div>
                        </div>
                    );
                    tempThis.setState({"Rooms": Rooms});
                }
                else 
                    document.getElementById("RoomAddMssg").innerHTML = res.data.mssg;      
            })
            .catch(err =>console.log(err));
        }                
        else{
            document.getElementById("RoomAddMssg").innerHTML = "Empty Field";
        }    
        this.setState({no:"",status:""}); 
        document.getElementById("roomNo").value = "";
    }


    

    componentDidMount(){
        document.getElementById('v-pills-home-tab').classList.remove('active');
        document.getElementById('v-pills-institution-tab').classList.add('active');
        document.getElementById('v-pills-home').classList.remove('active');
        document.getElementById('v-pills-institution').classList.add('active');
        document.getElementById('v-pills-home').classList.remove('show');
        document.getElementById('v-pills-institution').classList.add('show');
        console.log(document.getElementById('v-pills-home-tab'));
        console.log(document.getElementById('v-pills-institution-tab'));
        var url = "http://localhost:9000/admin/"+this.name+'/'+this.district;
        axios.get(url)
        .then(res => {
            const Rooms = res.data.rooms.map( u => 
                <div className="InstitutionsContainer">
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 className="card-title">Room No: {u.no}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Floor: {u.floor}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                            <button className="btn btn-primary  mt-2 ml-2 float-right">Info</button>
                            <button className="btn btn-danger DeleteInstitution mt-2 float-right">Delete</button>
                        </div>  
                    </div>
                </div>
            );
            this.setState({"Rooms": Rooms});
        })
        .catch(err => console.log(err));
    }


    render() {
        return (
        <div>
            <div className="input-group">
                <div>
                    <a href="/admin"><button className="btn btn-primary mr-2">Back</button></a>
                </div>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Room No</label>
                            <input type="number" id="roomNo" name="no" className="form-control" id="roomNo" placeholder="Room No" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Floor No</label>
                            <input type="number" id="floorNo" name="floor" className="form-control" id="floorNo" placeholder="Floor No" onChange={this.handleChange}/>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Status</label>
                            </div>
                            <select class="custom-select" id="roomStatus" name='status' id="inputGroupSelect01" onChange={this.handleDropdown}>
                                <option selected>Choose...</option>
                                <option value="no">Decontaminated</option>
                                <option value="yes">Contaminated</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add room</button>
                    </form>
            </div>
            <div id="RoomAddMssg"></div>
            <div>
                {this.state.Rooms}
            </div>
        </div>
 
        )
    }
}

export default Room
