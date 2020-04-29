import React, { useState } from 'react';
import axios from 'axios';
import UserAddForm from './UserAddForm';
import UserTypeForm from './UserTypeForm';
import UserDependantForm from './UserDependantForm';

function UserAdd(props) 
{
    const defaultCredentials = {username:"", password:"", confirmpassword:"", type:"", taluk:""}
    const [credentials, setCredentials] = useState(defaultCredentials);
    
    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});    
    }    

    const handleDropdown = e =>{
        setCredentials({...credentials, [e.target.name]:e.target.options[e.target.options.selectedIndex].value});
    }
 

    const setFormsDefault=()=>{
        setCredentials(defaultCredentials); 
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";  
        var radio = document.getElementsByName("type");
        for(var i=0;i<radio.length;i++)
            radio[i].checked = false;
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        var data;
        document.getElementById("passwordMismatch").innerHTML = "";    
        var config = {  headers: {'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true}};
        if(credentials.username !== "" && credentials.password !== "" 
            && credentials.confirmpassword !== "" && credentials.type !== "")
        {                    
            if(credentials.password === credentials.confirmpassword)
            {
                if(credentials.type === 'taluk')
                {
                    if(credentials.taluk !== '')
                    {
                        data ={ username:credentials.username,
                                password:credentials.password,
                                type:credentials.type,
                                taluk:credentials.taluk
                        };
                    }
                    else
                    {
                        document.getElementById("passwordMismatch").innerHTML = "Empty Fields Present";
                        return;
                    }
                }            
                else
                {    
                    data ={ username:credentials.username,
                            password:credentials.password,
                            type:credentials.type
                        };
                }                
                var url = "http://localhost:9000/api/useradd?id="+ window.localStorage.getItem('session');
                axios
                .post(url, data, config)
                .then(function(res){
                    if(res.data === 'connection closed'){
                        alert(res.data);    
                        window.location.replace('/');
                    }
                    document.getElementById("passwordMismatch").innerHTML = res.data;
                    if(credentials.type === 'institution'){
                        if(credentials.taluk === window.localStorage.getItem('location'))
                            window.location.reload();
                    }
                })
                    .catch(err =>console.log(err));            
            }    
            else{document.getElementById("passwordMismatch").innerHTML = "Password Mismatch";}
            setFormsDefault();
        }
        else
            document.getElementById("passwordMismatch").innerHTML = "Empty Fields Present";
    }

    
    return (
        <div className="container col-lg-8 col-sm-4 addUser">
            <UserAddForm handleChangeParent = {handleChange}/> 
            <UserTypeForm handleChangeParent = {handleChange} type={props.type}/>
            <UserDependantForm handleDropdownParent={handleDropdown} type={credentials.type}/>
            <button type="submit" id="addUser" className="float-right btn btn-primary" onClick={handleSubmit}>Add User</button>
            <div id="passwordMismatch"></div>
        </div>                    
    )
}

export default UserAdd;