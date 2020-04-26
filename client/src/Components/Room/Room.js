import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Room(props)
{
    const [roomInfo, setRoomInfo] = useState({no:0 , status:""});
    const [rooms , setRooms] = useState([])
    const institutionId = window.location.pathname.split('/')[2];
   
    const vacancyCheck = name =>{
        if(name === "")
            return("yes");
        else 
            return("no");    
    }
    

    const institutionsRedirect = () =>{
        window.localStorage.setItem('currTab','Institution');
        window.location.assign('/admin');
       }


    const handleChange =(e)=>{    
        setRoomInfo({...roomInfo, [e.target.name]:e.target.value})
    }  

    const handleDropdown = e =>{
        setRoomInfo({...roomInfo,[e.target.name]: e.target.options[e.target.options.selectedIndex].value});
    }



    const handleSubmit = (e) =>{
        e.preventDefault();
        document.getElementById("RoomAddMssg").innerHTML = "";    
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
        };
        if(roomInfo.no !== "" && roomInfo.status !== "")
        {
            const data ={no:roomInfo.no, status:roomInfo.status, name:""};    
            var url = "http://localhost:9000/api/rooms/add?id="+window.localStorage.getItem('session')+"&institutionId="+institutionId;
            axios
            .post(url, data, config)
            .then(function(res){
                if(typeof(res.data) === "string"){
                    if(res.data === "connection closed"){
                        alert(res.data);
                        window.location.replace('/');
                    }
                    else
                        document.getElementById("RoomAddMssg").innerHTML = res.data;      
                }
                else{
                    document.getElementById("RoomAddMssg").innerHTML =res.data;
                }
            })
            .catch(err =>console.log(err));
        }                
        else{
            document.getElementById("RoomAddMssg").innerHTML = "Empty Field";
        }    
        setRoomInfo({no:0,status:""}); 
        document.getElementById("roomNo").value = "";
        document.getElementById("roomStatus").options.selectedIndex = 0;
    }
    

    const inmateRedirect = (url) =>{
        window.location.assign(url);
   }



    useEffect(()=>{
        window.localStorage.setItem('currTab',"Institutions");
        var url = "http://localhost:9000/api/rooms?id="+window.localStorage.getItem('session')+
                                            "&institutionId="+institutionId;                                    
        axios.get(url)
        .then(res => {
            if(res.data === "connection closed")
            {
                alert("connection closed");
                window.location.replace('/');
            }
            const Rooms = res.data.map( u => 
                <div className="RoomsContainer" key={u.no}>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">Room No: {u.no}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Vacancy: {vacancyCheck(u.name)}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                            <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={inmateRedirect.bind(url,"/admin/"+institutionId+"/"+u.no)}>Info</button>
                            <button className="btn btn-danger DeleteInstitution mt-2 float-right" /*onClick={this.removeRoom.bind(this,u.no+'/'+u.floor)}*/>Delete</button>
                        </div>  
                    </div>
                </div>
            );
            setRooms(Rooms);
        })
        .catch(err => console.log(err));
    })

    

    return(
        <div className="row">
            <div className="input-group col-6">
                <div>
                    <button className="btn btn-primary mr-2" onClick={institutionsRedirect}><i className="fa fa-arrow-left "></i></button>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Room No</label>
                        <input type="number" id="roomNo" name="no" className="form-control" placeholder="Room No" onChange={handleChange}/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                        </div>
                        <select className="custom-select" id="roomStatus" name='status' onChange={handleDropdown}>
                            <option defaultValue>Choose...</option>
                            <option value="no">Decontaminated</option>
                            <option value="yes">Contaminated</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add room</button>
                </form>
            </div>
            <div id="RoomAddMssg"></div>
            <div className="col">
                <div className="row-6">
                    {rooms}
                </div>
            </div>
        </div>
    );

    /*
        
       removeRoom = (roomUrl) =>{
        if(window.confirm("Are you sure?"))
        {
            var url = "http://localhost:9000/api/"+ this.name+'/'+this.district+'/'+roomUrl+'/delete/';
            axios.get(url)
            .then(res =>{
                if(res.data.mssg==="Room Successfully Deleted"){
                    const Rooms = res.data.rooms.map( u => 
                        <div className="RoomsContainer">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <h5 className="card-title">Room No: {u.no}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Floor: {u.floor}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Vacancy: {vacancyCheck(u.name)}</h6>
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

    

    }*/
}

export default Room;
