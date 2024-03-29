import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InstitutionsAddForm from './InstitutionsAddForm';
import TalukSearch from './TalukSearch';
import VillageAddForm  from './VillageAddForm';
import ConstituencyAddForm from './ConstituencyAddForm';
import PanchayatAddForm from './PanchayatAddForm';
import VillageSearch from './VillageSearch';
import VillageList from "../Institution/VillageList";
import InstitutionsGenerate from './InstitutionsGenerate';


function Institution(props)
{
    if(window.localStorage.getItem('taluk') === null)
    {
        if(props.type === 'taluk')
        {
            window.localStorage.setItem('taluk',props.taluk);
            window.localStorage.setItem('village',VillageList[props.taluk][0]);
        }
        else
        {
        window.localStorage.setItem('taluk','Chavakkad');
        window.localStorage.setItem('village', VillageList['Chavakkad'][0] );
        }
    }
    else if(window.localStorage.getItem('village')===null)
    { 
     console.log(1);
        window.localStorage.setItem('village',VillageList[window.localStorage.getItem('taluk')][0]); 
    }

    const defaultInstitution = {type:"" , taluk:"", village:"", constituency:"", panchayat:"", 
        priority:0, fit:"",payment:"", paymentDetails:"", phone:""} 
    const [institutions , setInstitutions] = useState("");
    const [taluk , setTaluk] = useState(window.localStorage.getItem('taluk'));
    const [village, setVillage] = useState(VillageList[window.localStorage.getItem('taluk')][0]);
    const [newInstitution , setNewInstitution] = useState(defaultInstitution);


    const usableCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            if(rooms[i].status==="no" && rooms[i].ready === 'yes')
                count++;
        }
        return(count);
    }
    

    const readyCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            if(rooms[i].ready==="yes")
                count++;
        }
        return(count);
    }


    const handleChange =(e)=>{    
        console.log(e.target.name, e.target.value);
        setNewInstitution({...newInstitution, [e.target.name]:e.target.value})
    }

    const handleDropdown = e =>{
        setNewInstitution({...newInstitution,[e.target.name]: e.target.options[e.target.options.selectedIndex].value});
    }

    const handleTaluk = e =>{
        setTaluk(e.target.options[e.target.options.selectedIndex].value);
        setVillage(VillageList[e.target.options[e.target.options.selectedIndex].value][0]);
        window.localStorage.setItem('taluk',e.target.options[e.target.options.selectedIndex].value);
        window.localStorage.setItem('village',VillageList[e.target.options[e.target.options.selectedIndex].value][0]);
    }
    
    const handleVillage = e =>{
        setVillage(e.target.options[e.target.options.selectedIndex].value);
        window.localStorage.setItem('village',e.target.options[e.target.options.selectedIndex].value);
    }
    

    const roomsRedirect = (url) =>{
        window.location.assign(url);
    }


    const removeInstitutionDecider=(id)=>{
        if(props.type !== 'institution')
            return(<button className="btn btn-danger DeleteInstitution mt-2 ml-2 float-right" onClick={removeInstitution.bind(id,id)}>Delete</button>)
        else
            return(<div></div>)
    }


    //function that generates list of all institutions from backend
    const InstitutionsListGenerate = () => {
        var url = "http://localhost:9000/api/institution?taluk="+taluk+ "&village="+village + 
        "&id=" +window.localStorage.getItem('session') +"&institutionId=" + props.institutionId;
        document.getElementById('loaderInstitutionsSearch').style.display = 'block';
        axios.get(url)
        .then(res => {
            if(res.data === "connection closed")
            {
                alert(res.data);
                window.location.replace('/');
            }    
            document.getElementById('loaderInstitutionsSearch').style.display = 'none';
            const institutions = InstitutionsGenerate(res.data, roomsRedirect, url,
                    readyCount , usableCount, removeInstitutionDecider,-1);
            setInstitutions(institutions);
        })
        .catch(err => console.log(err));
    }


    
    const removeInstitution = (id) =>{
        if(window.confirm("Are you sure?"))
        {
            var url = "http://localhost:9000/api/institution/delete/"+id+"?id="+window.localStorage.getItem('session')
            axios.get(url)
                .catch(err => console.log(err));
        }  
        window.localStorage.setItem('taluk',taluk);
        InstitutionsListGenerate();
    }



    const handleSubmit = (e) =>{
        e.preventDefault();
        document.getElementById('institutionAddMssg').innerHTML = "";
        if(newInstitution.taluk === taluk && newInstitution.village === village)
            document.getElementById('loaderInstitutionsSearch').style.display = 'block';
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
            console.log(data);
            var url = "http://localhost:9000/api/institution/add?id="+ window.localStorage.getItem('session');
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
                        document.getElementById('loaderInstitutionsSearch').style.display = 'none';
                        const tempInstitution = InstitutionsGenerate(res.data.data, roomsRedirect, url,
                            readyCount , usableCount, removeInstitutionDecider, reqIndex)
                        setInstitutions([ tempInstitution, ...institutions]);
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
        document.getElementById('instPhone').value ="";
        document.getElementById('paymentDetails').value ="";
        var radio = document.getElementsByName("type");
        for(var i=0;i<radio.length;i++)
            radio[i].checked = false;
        radio = document.getElementsByName("fit");
            for(var i=0;i<radio.length;i++)
                radio[i].checked = false;    
        radio = document.getElementsByName("payment");
            for(var i=0;i<radio.length;i++)
                radio[i].checked = false;  

        if(document.getElementById('talukAdd')!== null)
            document.getElementById('talukAdd').options.selectedIndex = 0;
        document.getElementById('villageAdd').options.selectedIndex = 0;
        document.getElementById('constituencyAdd').options.selectedIndex = 0;
        document.getElementById('panchayatAdd').options.selectedIndex = 0;
    }


    useEffect(()=>{
        setInstitutions("");
        document.getElementById('loaderInstitutionsSearch').style.display = 'none';
        setVillage(window.localStorage.getItem('village'));     
        setTaluk(window.localStorage.getItem('taluk'));
        if(props.type === 'taluk')
            setNewInstitution({...newInstitution ,taluk:taluk});
        InstitutionsListGenerate();
        window.localStorage.setItem('currTab',"Institutions");
    },[]);
    

    useEffect(()=>{
        setInstitutions("");
        InstitutionsListGenerate();  
    },[taluk,village]);



    const searchDecider = () =>{
        if(props.type === 'taluk')
            return(
                <div>
                    <VillageSearch handleVillageParent = {handleVillage} taluk={window.localStorage.getItem('taluk')}/>
                </div>
            );
        else if(props.type !== 'institution')
        {
            return(
                <div className="row mt-3 mb-4">
                    <TalukSearch handleTalukParent = {handleTaluk} />
                    <VillageSearch handleVillageParent = {handleVillage} taluk={window.localStorage.getItem('taluk')}/>
                </div>
            );
        }    
        else
            return(<div></div>);
    }
    

    const talukDecider = ()=>{
        if(props.type !== 'taluk')
        {
            return(
                <div class="col mt-2">
                    <label for="talukAdd">Taluk</label>
                    <select class="custom-select" name="taluk" id="talukAdd" size="1" onChange={handleDropdown}>
                        <option selected value="Choose">Choose</option>
                        <option value="Chavakkad">Chavakkad</option>
                        <option value="Chalakudy">Chalakudy</option>
                        <option value="Kodungallur">Kodungallur</option>
                        <option value="Kunnamkulam">Kunnamkulam</option>
                        <option value="Mukunthapuram">Mukundapuram</option>
                        <option value="Thalapilly">Thalapilly</option>
                        <option value="Thrissur">Thrissur</option>
                    </select>
                </div>
            )
        }
        else
        {
            return(<div></div>)
        }
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
                <div id="institutionForm" className="inst container mr-4">
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
                                                <div class="form-group col">
                                                    <label for="phone">Phone</label>
                                                    <input type="text" name="phone" class="form-control" id="instPhone" placeholder="Contact no of institution" onChange={handleChange}/>
                                                </div>
                                                {talukDecider()}
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
                <div className="loader" id="loaderInstitutionsSearch" style={{margin:'auto'}}></div>
                <div id="institutionsList">{institutions}</div>                   
        </div>  
    );
       
}

export default Institution;