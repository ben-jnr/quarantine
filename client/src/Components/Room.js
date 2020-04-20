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
        this.name=url.split('/')[2];
        this.district=url.split('/')[3];                           
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
                        status:this.state.status,
                        name:"",
                        age:"",
                        phn:"",
                        address:"",
                        curr:"",
                        prev:""
                        };
            var tempThis = this;
            var url = "http://localhost:9000/admin/"+this.name+'/'+this.district;
            axios
            .post(url, data, config)
            .then(function(res){
                if(res.data.mssg === "Room Successfully Added")
                {
                    const Rooms = res.data.rooms.map( u => 
                        <div className="RoomsContainer">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <h5 className="card-title">Room No: {u.no}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Floor: {u.floor}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                                    <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={tempThis.inmateRedirect.bind(tempThis,'/admin/'+tempThis.name+'/'+tempThis.district+'/'+u.no+'/'+u.floor+'/')}>Info</button>
                                    <button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={tempThis.removeRoom.bind(tempThis,u.no+'/'+u.floor)}>Delete</button>
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
        document.getElementById("floorNo").value = "";
        document.getElementById("roomStatus").options.selectedIndex = 0;
    }


    

    componentDidMount(){
        window.localStorage.setItem('currTab',"Institutions");
        var url = "http://localhost:9000/admin/"+this.name+'/'+this.district;
        axios.get(url)
        .then(res => {
            const Rooms = res.data.rooms.map( u => 
                <div className="RoomsContainer">
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 className="card-title">Room No: {u.no}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Floor: {u.floor}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                            <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={this.inmateRedirect.bind(this,'/admin/'+this.name+'/'+this.district+'/'+u.no+'/'+u.floor+'/')}>Info</button>
                            <button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={this.removeRoom.bind(this,u.no+'/'+u.floor)}>Delete</button>
                        </div>  
                    </div>
                </div>
            );
            this.setState({"Rooms": Rooms});
        })
        .catch(err => console.log(err));
    }


    removeRoom = (roomUrl) =>{
        if(window.confirm("Are you sure?"))
        {
            var url = "http://localhost:9000/admin/"+ this.name+'/'+this.district+'/'+roomUrl+'/delete/';
            axios.get(url)
            .then(res =>{
                if(res.data.mssg==="Room Successfully Deleted"){
                    const Rooms = res.data.rooms.map( u => 
                        <div className="RoomsContainer">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <h5 className="card-title">Room No: {u.no}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Floor: {u.floor}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                                    <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={this.inmateRedirect.bind(this,'/admin/'+this.name+'/'+this.district+'/'+u.no+'/'+u.floor+'/')}>Info</button>
                                    <button className="btn btn-danger DeleteRoom mt-2 float-right" onClick={this.removeRoom.bind(this,u.no+'/'+u.floor)}>Delete</button>
                                </div>  
                            </div>
                        </div>
                    );
                    this.setState({"Rooms": Rooms});
                }
            })
            .catch(err => console.log(err));
        }  
    }

    inmateRedirect = (url) =>{
        window.location.assign(url);
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
                            <select class="custom-select" id="roomStatus" name='status' onChange={this.handleDropdown}>
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
