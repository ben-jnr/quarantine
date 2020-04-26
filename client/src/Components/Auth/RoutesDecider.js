import React, {useState, useEffect} from 'react';
import Login from './Login';
import Admin from '../Core/Admin';
import axios from 'axios';
import { Route } from "react-router-dom";

function RoutesDecider()
{        
    const [type, setType] = useState("");
    const [institutionId , setInstitutionId] = useState("");     

    const readSession=() =>{
        axios.get('http://localhost:9000/api/?id='+window.localStorage.getItem('session'))
        .then(res =>{
            if(res.data.type === 'institution')
                setInstitutionId(res.data.id);
            setType(res.data.type);    
        })
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        readSession();
    },[]);

    
    if(window.localStorage.getItem('session'))
    {    
        if(type === "admin" || type === 'dashboard' || type === 'airport' || type === 'institution' || type === 'superadmin')
        {
            if(type === 'admin' || type === 'superadmin' || type === 'dashboard')
                window.localStorage.setItem('currTab',"Home");
            else if(type === 'institution' || type === 'airport')
                window.localStorage.setItem('currTab',"Institution");        
            window.localStorage.setItem('location',"Alappuzha");
            return (
                <div>
                    <Route exact path = "/" render={() => <Admin currInstitutionsTab="Institutions" type={type} institutionId={institutionId}/>} />
                    <Route exact path = "/admin" render={() => <Admin currInstitutionsTab="Institutions" type={type} institutionId={institutionId}/>} />
                    <Route exact path = "/admin/:id" render={() => <Admin currInstitutionsTab="Rooms" type={type} institutionId={institutionId}/>} />
                    <Route exact path = "/admin/:id/:room/" render={() => <Admin currInstitutionsTab="Inmate" type={type} institutionId={institutionId}/>} />      
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