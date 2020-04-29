import React, {useState, useEffect} from 'react';
import Login from './Login';
import Admin from '../Core/Admin';
import axios from 'axios';
import { Route } from "react-router-dom";

function RoutesDecider()
{        
    const [type, setType] = useState("");
    const [institutionId , setInstitutionId] = useState("");   
    const [taluk, setTaluk] = useState("");  

    const readSession=() =>{
        axios.get('http://18.223.108.131:9000/api/?id='+window.localStorage.getItem('session'))
        .then(res =>{
            setType(res.data.type); 
            if(res.data.type === 'institution')
                setInstitutionId(res.data.id);   
            if(res.data.type === 'taluk')
                setTaluk(res.data.taluk);    
        })
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        readSession();
    },[]);

    
    if(window.localStorage.getItem('session'))
    {    
        if(type === "admin" || type === 'dashboard' || type === 'airport' || type === 'institution' || type === 'superadmin' || type === 'taluk')
        {
            if(type === 'admin' || type === 'superadmin' || type === 'dashboard')
                window.localStorage.setItem('currTab',"Home");
            else if(type === 'institution' || type === 'taluk')
                window.localStorage.setItem('currTab',"Institution");        
            if(taluk === ""){
                window.localStorage.setItem('taluk',"Chavakkad");
            }    
            else{
                window.localStorage.setItem('taluk',taluk);
            }  
            return(    
                <div>
                    <Route exact path = "/" render={() => <Admin currInstitutionsTab="Institutions" type={type} institutionId={institutionId} taluk={taluk}/>} />
                    <Route exact path = "/admin" render={() => <Admin currInstitutionsTab="Institutions" type={type} institutionId={institutionId} taluk={taluk}/>} />
                    <Route exact path = "/admin/:id" render={() => <Admin currInstitutionsTab="Rooms" type={type} institutionId={institutionId} taluk={taluk}/>} />
                    <Route exact path = "/admin/:id/:room/" render={() => <Admin currInstitutionsTab="Inmate" type={type} institutionId={institutionId} taluk={taluk}/>} />      
                </div>
            );    
        }
        else if(type==="")
        {
            return(<div></div>)
        }
        else
        {
            return(<Route path= '/' render={()=> <Login parentFunction={readSession} /> }/>)
        }
    }
    else
    {
        return(<Route path= '/' render={()=> <Login parentFunction={readSession} /> }/>)
    }     
}     
export default RoutesDecider;   