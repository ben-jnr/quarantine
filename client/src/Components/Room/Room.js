import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomsAddForm from './RoomsAddForm';


function Room(props){

    const [roomInfo, setRoomInfo] = useState({no:0 , beds:0 , status:"" ,ready:"", bathroom:"" , disable:"" });
    const [rooms , setRooms] = useState([]);
    const [roomsArray, setRoomsArray] = useState([]);
    const institutionId = window.location.pathname.split('/')[2];

    const vacancyCheck = name =>{
        if(name === "")
            return("yes");
        else 
            return("no");    
    }
    

    const institutionsRedirect = () =>{
        window.localStorage.setItem('currTab','Institutions');
        window.location.assign('/admin');
    }


    const handleChange =(e)=>{    
        setRoomInfo({...roomInfo, [e.target.name]:e.target.value})
    }  

    const handleDropdown = e =>{
        setRoomInfo({...roomInfo,[e.target.name]: e.target.options[e.target.options.selectedIndex].value});
    }

    
    const removeRoom = (no) =>{
        if(window.confirm("Are you sure?")){
            var url = "http://18.223.108.131:9000/api/rooms/"+no+"/delete?id="+window.localStorage.getItem('session')+
                                                        "&institutionId="+institutionId;
            axios.get(url)
            .then(res =>{
                if(res.data === "connection closed"){
                    alert("connection closed");
                    window.location.replace('/');
                }
                if(res.data.mssg==="Room Successfully Deleted"){
                    setRoomsArray(res.data.rooms);
                }
            })
            .catch(err => console.log(err));
        }  
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
            let no;
            const data ={no:roomInfo.no, status:roomInfo.status, name:"", beds:roomInfo.beds,
                        ready:roomInfo.ready, bathroom:roomInfo.bathroom, disable:roomInfo.disable};    
            var url = "http://18.223.108.131:9000/api/rooms/add?id="+window.localStorage.getItem('session')+"&institutionId="+institutionId;
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
                    setRoomsArray(res.data.rooms);
                    document.getElementById("RoomAddMssg").innerHTML =res.data.mssg;
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


   const RoomsListGenerator=(arr)=>
   {
    let url;
    let no;
    const Rooms = arr.map( u => 
        <div className="RoomsContainer" key={u.no}>
            <div className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">Room No: {u.no}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Vacancy: {vacancyCheck(u.name)}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">No of Beds: {u.beds}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Attached Bathroom: {u.bathroom}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Disable Friendly: {u.disable}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Ready: {u.ready}</h6>
                    <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={inmateRedirect.bind(url,"/admin/"+institutionId+"/"+u.no)}>Info</button>
                    <button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={removeRoom.bind(no,u.no)}>Delete</button>
                </div>  
            </div>
        </div>
    );
    return Rooms;
   }


    useEffect(()=>{
        let no;
        window.localStorage.setItem('currTab',"Institutions");
        if(roomsArray.length === 0){
            var url = "http://18.223.108.131:9000/api/rooms?id="+window.localStorage.getItem('session')+
                                                "&institutionId="+institutionId;                                                                       
            axios.get(url)
            .then(res => {
                if(res.data === "connection closed"){
                    alert("connection closed");
                    window.location.replace('/');
                }
                setRoomsArray(res.data);
                setRooms(RoomsListGenerator(res.data));
            })
            .catch(err => console.log(err));
        }
        else{
            setRooms(RoomsListGenerator(roomsArray));
        }    
    },[roomsArray])

    

    return(
        <div className="row">
            <div col-4>
                <RoomsAddForm institutionsRedirectParent={institutionsRedirect} handleChangeParent={handleChange}
                            handleDropdownParent = {handleDropdown} handleSubmitParent={handleSubmit}/>
                <div id="RoomAddMssg"></div>
            </div>
            <div className="col-6">
                {rooms}
            </div>
        </div>
    );
}

export default Room;
