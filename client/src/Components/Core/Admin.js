import React, {useEffect} from 'react';
import Navbar from './Navbar';
import Tabs from './Tabs';
import axios from 'axios';

function Admin(props)
{  
  const logout = () => {
    axios.get('http://localhost:9000/api/delsession?id='+window.localStorage.getItem('session'))
    .catch(err => console.log(err));
    window.localStorage.removeItem("currTab");
    window.localStorage.removeItem("taluk");
    window.localStorage.removeItem("village");
    window.localStorage.removeItem("session");
    window.location.replace("/");
  }


  useEffect(()=>{
    if(props.type === 'superadmin' || props.type === 'admin')
    {
      if(window.localStorage.getItem('currTab')==="Institutions"){
        document.getElementById('v-pills-home-tab').classList.remove('active');
        document.getElementById('v-pills-home').classList.remove('active');
        document.getElementById('v-pills-home').classList.remove('show');
        document.getElementById('v-pills-institution-tab').classList.add('active');
        document.getElementById('v-pills-institution').classList.add('active');
        document.getElementById('v-pills-institution').classList.add('show');
      }
      if(window.localStorage.getItem('currTab')==="Home"){
        document.getElementById('v-pills-institution-tab').classList.remove('active');
        document.getElementById('v-pills-institution').classList.remove('active');
        document.getElementById('v-pills-institution').classList.remove('show');
        document.getElementById('v-pills-home-tab').classList.add('active');
        document.getElementById('v-pills-home').classList.add('active');
        document.getElementById('v-pills-home').classList.add('show');
      }
    }
    
    else if(props.type === 'taluk' || props.type === 'institution')
    {
        document.getElementById('v-pills-institution-tab').classList.add('active');
        document.getElementById('v-pills-institution').classList.add('active');
        document.getElementById('v-pills-institution').classList.add('show');
    }
  })

  
  return (
    <div className="row p-3">
      <div class="col">
        <Navbar currInstitutionsTab={props.currInstitutionsTab} type={props.type} logoutParent={logout} taluk={props.taluk}/>
        <Tabs currInstitutionsTab={props.currInstitutionsTab} type={props.type} institutionId = {props.institutionId} taluk={props.taluk}/>
      </div>
    </div>
  );
}

export default Admin;