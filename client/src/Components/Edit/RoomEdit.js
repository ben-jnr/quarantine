import React,{useState, useEffect} from 'react';
import axios from 'axios';

function RoomEdit(props) {
    const institutionId = window.location.pathname.split('/')[2];
    const roomNo = window.location.pathname.split('/')[3];
    
    const [roomInfo , setRoomInfo]= useState({no:"" , beds:0 , status:"" ,ready:"", bathroom:"" , disable:"", emigrantId:"" , remark:""})

    const handleChange =(e)=>{    
        setRoomInfo({...roomInfo, [e.target.name]:e.target.value})
    }  

    const handleDropdown = e =>{
        setRoomInfo({...roomInfo,[e.target.name]: e.target.options[e.target.options.selectedIndex].value});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(roomInfo.beds);
        if(window.confirm("Are you sure?"))
        {
            if(roomInfo.no !== "" && roomInfo.beds > -1 && roomInfo.status !="" && roomInfo.ready !== "" 
                && roomInfo.bathroom !=="" && roomInfo.disable !="" && roomInfo.beds != "")
            {
                var config = {  headers: {'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true}};
                var url = 'https://ccctsr.in/api/rooms/'+roomNo+'/edit'
                        +'?institutionId=' + institutionId +'&id='+window.localStorage.getItem('session');
                axios.post(url, roomInfo ,config)
                .then(res => {
                    if(typeof(res.data)==='string')
                    {
                        if(res.data === 'connection closed')
                        {
                            alert(res.data);
                            window.location.replace('/');
                        }
                        else
                        {
                            if(res.data === "Room Successfully Updated")
                                window.location.replace('/admin/'+institutionId);
                            else    
                                document.getElementById('roomsEditFormMssg').innerHTML = res.data;
                        }
                    }
                })  
                .catch(err => console.log(err));
            }
            else
            {
                document.getElementById('roomsEditFormMssg').innerHTML = 'Empty Fields Present'
            }              
        }
        
    }


    useEffect(()=>{
        const url = 'https://ccctsr.in/api/rooms/'+roomNo+'?institutionId=' + institutionId +'&id='+window.localStorage.getItem('session');
        axios.get(url)
        .then(res =>{
            if(typeof(res.data) === 'string')
            {
                if(res.data === 'connection closed')
                {
                    alert("connection closed");
                    window.location.replace('/');
                }
                else
                {console.log(res.data)}
            }  
            else
            {
                document.getElementById('roomBedsEdit').value=res.data.beds;
                document.getElementById('roomsRemarkEdit').value=res.data.remark;
                if(res.data.bathroom === 'yes')
                    document.getElementById('attchBath1Edit').checked=true;
                else 
                    document.getElementById('attchBath2Edit').checked=true;
                if(res.data.disable === 'yes')
                    document.getElementById('disable1Edit').checked=true;
                else 
                    document.getElementById('disable2Edit').checked=true;
                if(res.data.ready === 'yes')
                    document.getElementById('ready1Edit').checked=true;
                else 
                    document.getElementById('ready2Edit').checked=true; 
                if(res.data.status === 'yes') 
                    document.getElementById('roomStatusEdit').options.selectedIndex = 1;
                else
                    document.getElementById('roomStatusEdit').options.selectedIndex = 0; 
                setRoomInfo(res.data); 
            }                    
        })
        .catch(err => console.log(err));
    },[])



    return (
        <div className="container p-4">
            <div className='row'>
                <div className = 'col-lg-2'></div>
                <div className = 'col-lg-8'>
                    <a href = {'/admin/'+institutionId}><button className = 'btn btn-primary btn-block mb-2'>Go Back</button></a>
                </div>
            </div>
            <form className="container p-2 col col-lg-8 roomEdit">
                <div className="text-center">
                    <h3 id='roomEditHeading'>Room : </h3>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label>No of beds</label>
                        <input type="number" id="roomBedsEdit" name="beds" className="form-control" placeholder="No of Beds" onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-row col-lg col-sm-6">
                    <div className="form-group col">
                        <label>Attached Bathroom ?</label>
                        <div className="row mb-3 ml-2">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="attchBath1Edit" name="bathroom" value="yes" onChange={handleChange} class="custom-control-input"/>
                                <label class="custom-control-label" for="attchBath1Edit">Yes</label>
                            </div>
                            <div class="custom-control custom-radio ml-2">
                                <input type="radio" id="attchBath2Edit" name="bathroom" value="no" onChange={handleChange} class="custom-control-input"/>
                                <label class="custom-control-label" for="attchBath2Edit">No</label>
                            </div>
                        </div>
                </div>
                <div className="form-group col-lg col-sm-6">
                    <label>Disable Friendly?</label>
                    <div className="row mb-3 ml-3">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="disable1Edit" name="disable" value="yes" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="disable1Edit">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-2">
                            <input type="radio" id="disable2Edit" name="disable" value="no" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="disable2Edit">No</label>
                        </div>
                    </div>
                </div>
                <div className="form-group pr-4 col-lg col-sm-6">
                    <label>Ready to Occupy</label>
                    <div className="row mb-3">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="ready1Edit" name="ready" value="yes" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="ready1Edit">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="ready2Edit" name="ready" value="no" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="ready2Edit">No</label>
                        </div>
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                    </div>
                    <select className="custom-select" id="roomStatusEdit" name='status' onChange={handleDropdown}>
                        <option defaultValue value="no">Decontaminated</option>
                        <option value="yes">Contaminated</option>
                    </select>
                </div>
                
                <div className="form-group col">
                    <label>Remark</label>
                    <input type="text" id="roomsRemarkEdit" name="remark" className="form-control" placeholder="Remarks" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Edit room</button>
            </form>
            <div id="roomsEditFormMssg"></div>      
        </div>
    );
}

export default RoomEdit;