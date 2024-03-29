import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomsAddForm from './RoomsAddForm';


function Room(props){

    const [roomInfo, setRoomInfo] = useState({no:"" , beds:0 , status:"" ,ready:"", bathroom:"" , disable:"",remark:""});
    const [rooms , setRooms] = useState([]);
    const institutionId = window.location.pathname.split('/')[2];
   

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
            var url = "http://localhost:9000/api/rooms/"+no+"/delete?id="+window.localStorage.getItem('session')+
                                                        "&institutionId="+institutionId;
            axios.get(url)
            .then(res =>{
                if(res.data === "connection closed"){
                    alert("connection closed");
                    window.location.replace('/');
                }
                if(res.data.mssg==="Room Successfully Deleted"){
                    RoomsListGenerator();
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
        if(roomInfo.no !=="" && roomInfo.status !== "" && roomInfo.beds >-1 &&
            roomInfo.ready !== "" && roomInfo.bathroom !== "" && roomInfo.disable!=="")
        {
            const data ={no:roomInfo.no, status:roomInfo.status, emigrantId:"", beds:roomInfo.beds,
                        ready:roomInfo.ready, bathroom:roomInfo.bathroom, disable:roomInfo.disable , remark:roomInfo.remark};    
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
                    let no;
                    document.getElementById("RoomAddMssg").innerHTML =res.data.mssg;
                    const index = document.querySelectorAll('.RoomsContainer').length;
                    const Room = res.data.room.map( u => 
                    <div className="accordion RoomsContainer mt-1" id={"accordion"+index}>
                        <div className="card">
                            <div className="card-header row-6" id={"heading"+index}>
                                <div className="row"> 
                                <button className="btn btn-link col" type="button" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne1">
                                    Room No :{u.no}
                                </button>
                                {usableOrNot(u.ready, u.status)} 
                                </div>
                            </div>

                            <div id={"collapse"+index} className="collapse p-2" aria-labelledby={"heading"+index} data-parent={"#accordion"+index}>
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">No of Beds: {u.beds}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Attached Bathroom: {u.bathroom}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Disable Friendly: {u.disable}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Ready: {u.ready}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Remark: {u.remark}</h6>
                                    <button className="btn btn-primary  mt-2 float-left" /*onClick={inmateRedirect.bind(url,"/admin/"+institutionId+"/"+u.no)}*/>Info</button>
                                    <button className="btn btn-danger DeleteInstitution mt-2 ml-2 float-right" onClick={removeRoom.bind(no,u.no)}>Delete</button>
                                    <a href = {window.location.pathname+'/' +u.no+'/edit/'} ><button className="btn btn-primary mt-2 float-right edit-btn">Edit</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                    setRooms([Room, ...rooms]);
                }
            })
            .catch(err =>console.log(err));
        }                
        else{
            document.getElementById("RoomAddMssg").innerHTML = "Empty Fields Present";
        }    
        setRoomInfo({no:0 , beds:0 , status:"" ,ready:"", bathroom:"" , disable:""}); 
        document.getElementById("roomNo").value = "";
        document.getElementById("roomBeds").value = "";
        document.getElementById("remark").value = "";
        document.getElementById("roomStatus").options.selectedIndex = 0;
        var radio = document.getElementsByName("bathroom");
        for(var i=0;i<radio.length;i++)
            radio[i].checked = false;
        var radio = document.getElementsByName("disable");
        for(var i=0;i<radio.length;i++)
            radio[i].checked = false;
        var radio = document.getElementsByName("ready");
        for(var i=0;i<radio.length;i++)
            radio[i].checked = false;         
    }
    

    const inmateRedirect = (url) =>{
        window.location.assign(url);
   }


   const usableOrNot= (ready, status) =>{
    if(ready === 'yes' && status === 'no')
        return(<button className="btn btn-success col-lg-3 col-sm-5">Usable</button>)
    else
        return(<button className="btn btn-danger col-lg-3 col-sm-5 ">Not-Usable</button>)
   }

   const RoomsListGenerator=()=>
    {
        let no;
        let url = "http://localhost:9000/api/rooms?id="+window.localStorage.getItem('session')+
                                                    "&institutionId="+institutionId;                                                                       
        axios.get(url)
        .then(res => {
            if(res.data === "connection closed"){
                alert("connection closed");
                window.location.replace('/');
            }
            document.getElementById('roomHeading').innerHTML = res.data.name;
            const Rooms = res.data.rooms.map( (u,index) => 
            <div className="accordion RoomsContainer mt-1" id={"accordion"+index}>
                <div className="card">
                    <div className="card-header row-6" id={"heading"+index}>
                        <div className="row"> 
                        <button className="btn btn-link col" type="button" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne1">
                            Room No :{u.no}
                        </button>
                        {usableOrNot(u.ready, u.status)} 
                        </div>
                    </div>

                    <div id={"collapse"+index} className="collapse p-2" aria-labelledby={"heading"+index} data-parent={"#accordion"+index}>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">No of Beds: {u.beds}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Attached Bathroom: {u.bathroom}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Disable Friendly: {u.disable}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Contaminated: {u.status}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Ready: {u.ready}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Remark: {u.remark}</h6>
                            <button className="btn btn-primary  mt-2 float-left" /*onClick={inmateRedirect.bind(url,"/admin/"+institutionId+"/"+u.no)}*/>Info</button>
                            <button className="btn btn-danger DeleteInstitution mt-2 ml-2 float-right" onClick={removeRoom.bind(no,u.no)}>Delete</button>
                            <a href = {window.location.pathname+'/' +u.no+'/edit/'} ><button className="btn btn-primary mt-2 float-right edit-btn">Edit</button></a>
                        </div>
                    </div>
                </div>
            </div>
            );
            setRooms(Rooms);
        })
        .catch(err => console.log(err));
    }


    useEffect(()=>{
        window.localStorage.setItem('currTab',"Institutions");
        RoomsListGenerator();    
    },[])
    

    return(
        <div className="mr-3">
            <div className="text-center">
                <h3 id="roomHeading"></h3>
            </div>
        <div className="row mt-4">
            <div className="col-lg-6">
            <div className="text-center">
                    <h4>Add new rooms :</h4>
                </div>
                <RoomsAddForm institutionsRedirectParent={institutionsRedirect} handleChangeParent={handleChange}
                            handleDropdownParent = {handleDropdown} handleSubmitParent={handleSubmit}/>
                <div id="RoomAddMssg"></div>
            </div>
            <div className="col-lg-6">
                <div className="text-center">
                    <h4>Added Rooms :</h4>
                </div>
                {rooms}
            </div>
        </div>
        </div>
    );
}

export default Room;
