import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InstitutionsAddForm from './InstitutionsAddForm';
import TalukSearch from './TalukSearch';
import VillageAddForm  from './VillageAddForm';
import ConstituencyAddForm from './ConstituencyAddForm';
import PanchayatAddForm from './PanchayatAddForm';
import VillageSearch from './VillageSearch';
import VillageList from "../Institution/VillageList";


function Institution(props)
{
    if(props.type === 'taluk')
        var temp = props.taluk;
    else
        var temp = 'Chavakkad';       
    const defaultInstitution = {type:"" , taluk:"", village:"", constituency:"", panchayat:"", priority:0, fit:""} 
    const [institutions , setInstitutions] = useState("");
    const [taluk , setTaluk] = useState(temp);
    const [village, setVillage] = useState(VillageList[props.taluk][0]);
    const [newInstitution , setNewInstitution] = useState(defaultInstitution);

    const vacantCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            console.log(rooms[i]);
            if(rooms[i].emigrantId === "")
                count++;
        }
        return(count);
    }


    const decontaminatedCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            if(rooms[i].status==="no")
                count++;
        }
        return(count);
    }
    

    const ReadyCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            if(rooms[i].ready==="yes")
                count++;
        }
        return(count);
    }


    const handleChange =(e)=>{    
        setNewInstitution({...newInstitution, [e.target.name]:e.target.value})
    }

    const handleDropdown = e =>{
        setNewInstitution({...newInstitution,[e.target.name]: e.target.options[e.target.options.selectedIndex].value});
    }

    const handleTaluk = e =>{
        setTaluk(e.target.options[e.target.options.selectedIndex].value)
        setVillage(VillageList[e.target.options[e.target.options.selectedIndex].value][0]);
    }
    
    const handleVillage = e =>{
        setVillage(e.target.options[e.target.options.selectedIndex].value)
    }
    

    const roomsRedirect = (url) =>{
        window.location.assign(url);
    }


    const removeInstitutionDecider=(id)=>{
        if(props.type !== 'institution')
            return(<button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={removeInstitution.bind(id,id)}>Delete</button>)
        else
            return(<div></div>)
    }


    //function that generates list of all institutions from backend
    const InstitutionsListGenerate = () => {
        var url = "http://18.223.108.131:9000/api/institution?taluk="+taluk+ "&village="+village + 
        "&id=" +window.localStorage.getItem('session') +"&institutionId=" + props.institutionId;
        axios.get(url)
        .then(res => {
            if(res.data === "connection closed")
            {
                alert(res.data);
                window.location.replace('/');
            }    
            const institutions = res.data.map( (u,index) =>
                <div key={u._id} className="accordion InstitutionsContainer mb-3" id={"accordionExample"+index}>
                    <div class="card">
                        <div class="card-header" id={"headingOne"+index}>
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne"+index} aria-expanded="true" aria-controls="collapseOne">
                                    {u.name}
                                </button>
                            </h2>
                        </div>
                        <div id={"collapseOne"+index} class="collapse" aria-labelledby={"headingOne"+index} data-parent={"#accordionExample"+index}>
                            <div class="card-body">
                                <h5 className="card-title">{u.name}</h5>
                                <h6 className="card-title">{u.type}</h6>
                                <h6 className="card-title">Structurally Fit : {u.fit}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                                <button type="button" class="btn btn-secondary mr-3 mb-2">
                                    Total Rooms <button class="btn btn-light roomBadge">{u.rooms.length}</button>
                                </button>
                                <button type="button" class="btn btn-primary mr-3 mb-2">
                                    Vacant <button class="btn btn-light roomBadge">{vacantCount(u.rooms)}</button>
                                </button>
                                <button type="button" class="btn btn-warning mr-3 mb-2">
                                    Ready <button class="btn btn-light roomBadge">{ReadyCount(u.rooms)}</button>
                                </button>
                                <button type="button" class="btn btn-success mr-3 mb-2">
                                    Decontaminated <button class="btn btn-light roomBadge">{decontaminatedCount(u.rooms)}</button>
                                </button><br/>
                                <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={roomsRedirect.bind(url,"/admin/"+u._id)}>Check Rooms</button>
                                {removeInstitutionDecider(u._id)}
                            </div>  
                        </div>
                    </div>
                </div>
            );
            setInstitutions(institutions);
        })
        .catch(err => console.log(err));
    }


    
    const removeInstitution = (id) =>{
        if(window.confirm("Are you sure?"))
        {
            var url = "http://18.223.108.131:9000/api/institution/delete/"+id+"?id="+window.localStorage.getItem('session')
            axios.get(url)
                .catch(err => console.log(err));
        }  
        window.localStorage.setItem('taluk',taluk);
        InstitutionsListGenerate();
    }



    const handleSubmit = (e) =>{
        e.preventDefault();
        document.getElementById('institutionAddMssg').innerHTML = "";
        if(newInstitution.name !== "" && newInstitution.type !== "" && newInstitution.taluk !== "" &&
            newInstitution.village!=="" && newInstitution.constituency!=="" && newInstitution.panchayat!=="" &&
            newInstitution.fit !=="")
        {    
            var config = {  headers: {'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true}};
            let data = {
                ...newInstitution ,
                rooms:[]
            }
            var url = "http://18.223.108.131:9000/api/institution/add?id="+ window.localStorage.getItem('session');
            axios
            .post(url, data, config)
            .then(function(res){
               if(typeof(res.data) === 'string')
               {
                   if(res.data === 'connection closed')
                   {
                       alert(res.data);
                       window.location.replace('/');
                   }
                   else
                   {
                    document.getElementById('institutionAddMssg').innerHTML = res.data;
                   }
                }
                else
                {
                    document.getElementById('institutionAddMssg').innerHTML = res.data.mssg;
                    if(newInstitution.taluk === taluk && newInstitution.village === village)
                    {
                        const reqIndex = document.querySelectorAll('.InstitutionsContainer').length;
                        const tempInstitution = res.data.data.map(u =>
                            <div key={u._id} className="accordion InstitutionsContainer mb-3" id={"accordionExample"+reqIndex}>
                                <div class="card">
                                    <div class="card-header" id={"headingOne"+reqIndex}>
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne"+reqIndex} aria-expanded="true" aria-controls="collapseOne">
                                                {u.name}
                                            </button>
                                        </h2>
                                    </div>
                                    <div id={"collapseOne"+reqIndex} class="collapse" aria-labelledby={"headingOne"+reqIndex} data-parent={"#accordionExample"+reqIndex}>
                                        <div class="card-body">
                                            <h5 className="card-title">{u.name}</h5>
                                            <h6 className="card-title">{u.type}</h6>
                                            <h6 className="card-title">Structurally Fit : {u.fit}</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                                            <button type="button" class="btn btn-secondary mr-3 mb-2">
                                                Total Rooms <button class="btn btn-light roomBadge">{u.rooms.length}</button>
                                            </button>
                                            <button type="button" class="btn btn-primary mr-3 mb-2">
                                                    Vacant <button class="btn btn-light roomBadge">{vacantCount(u.rooms)}</button>
                                            </button>
                                            <button type="button" class="btn btn-warning mr-3 mb-2">
                                                    Ready <button class="btn btn-light roomBadge">{ReadyCount(u.rooms)}</button>
                                            </button>
                                            <button type="button" class="btn btn-success mr-3 mb-2">
                                                    Decontaminated <button class="btn btn-light roomBadge">{decontaminatedCount(u.rooms)}</button>
                                            </button><br/>
                                            <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={roomsRedirect.bind(url,"/admin/"+u._id)}>Check Rooms</button>
                                            {removeInstitutionDecider(u._id)}
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        );
                        setInstitutions([...institutions , tempInstitution]);
                    }                
                }    
            })
            .catch(err => console.log(err));
        }
        else{
            document.getElementById('institutionAddMssg').innerHTML = "Empty Fields Present"
        }
        if(props.type === 'taluk')
            setNewInstitution({...defaultInstitution, taluk:taluk});
        else
            setNewInstitution(defaultInstitution);    
        document.getElementById('instName').value ="";
        var radio = document.getElementsByName("type");
        for(var i=0;i<radio.length;i++)
            radio[i].checked = false;
        radio = document.getElementsByName("fit");
            for(var i=0;i<radio.length;i++)
                radio[i].checked = false;    
        if(document.getElementById('talukAdd')!== null)
            document.getElementById('talukAdd').options.selectedIndex = 0;
        document.getElementById('villageAdd').options.selectedIndex = 0;
        document.getElementById('constituencyAdd').options.selectedIndex = 0;
        document.getElementById('panchayatAdd').options.selectedIndex = 0;
    }


    useEffect(()=>{
        setTaluk(taluk);
        setVillage(VillageList[taluk][0]);
        if(props.type === 'taluk')
            setNewInstitution({...newInstitution ,taluk:taluk});
        InstitutionsListGenerate();
        window.localStorage.setItem('currTab',"Institutions");
    },[]);
    

    useEffect(()=>{
        InstitutionsListGenerate();  
    },[taluk,village]);



    const searchDecider = () =>{
        if(props.type === 'taluk')
            return(
                <div>
                    <VillageSearch handleVillageParent = {handleVillage} taluk={taluk}/>
                </div>
            );
        else if(props.type !== 'institution')
        {
            return(
                <div className="row mt-3 mb-4">
                    <TalukSearch handleTalukParent = {handleTaluk} />
                    <VillageSearch handleVillageParent = {handleVillage} taluk={taluk}/>
                </div>
            );
        }    
        else
            return(<div></div>);
    }
    

    const villageFormsDecider = () =>{
        if(props.type === 'taluk')
            return(<VillageAddForm taluk= {taluk} handleDropdownParent={handleDropdown}/>)
        else
            return(<VillageAddForm taluk= {newInstitution.taluk} handleDropdownParent={handleDropdown}/>)
    }


    const formsDecider = () =>{
        if(props.type !== 'institution')
        {
            return(
                <div id="institutionForm" className="inst">
                    <div class="accordion" id="accordionExample">
                        <div class="card p-0 m-0">
                            <div class="card-header text-center p-2" id="headingOne">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <h5>Add Institution</h5>
                                </button>
                            </div>
                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div className="inst-details">
                                        <InstitutionsAddForm type = {props.type} handleDropdownParent={handleDropdown} handleChangeParent = {handleChange}/>
                                            <div className="lsgd">
                                                {villageFormsDecider()}
                                                <ConstituencyAddForm handleDropdownParent = {handleDropdown}/>
                                                <PanchayatAddForm constituency={newInstitution.constituency}  handleDropdownParent = {handleDropdown}/>
                                                <div class="sbmt-btn">
                                                    <button className='btn' onClick = {handleSubmit}>Submit</button>
                                                </div>
                                                <div id="institutionAddMssg"></div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


    const userHeaderDecider = ()=>{
        if(props.type === 'taluk')
            return(<h6 id="talukHeader">{taluk} user </h6>);
        else
            return(<h6 id="talukHeader">{props.type} user </h6>)    
    }


    return (
        <div id="InstitutionTab p-2" className="search">
                {userHeaderDecider()}
                {formsDecider()}
                <hr/>
                <h4 className="text-center mb-4">Search</h4>
                {searchDecider()}
                <hr />
                {institutions}                   
        </div>  
    );
       
}

export default Institution;