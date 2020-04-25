import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictSearch from './DistrictSearch';


function Institution(props)
{
    const [institutions , setInstitutions] = useState();
    const [location , setLocation] = useState(window.localStorage.getItem('location'));
     

    const vacantCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            if(rooms[i].name=="")
                count++;
        }
        return(count);
    }
    const decontaminatedCount = function(rooms){
        var count = 0;
        for(var i=0;i<rooms.length;i++){
            if(rooms[i].status=="no")
                count++;
        }
        return(count);
    }

    const handleLocation = e =>{
        setLocation(e.target.options[e.target.options.selectedIndex].value)
        window.sessionStorage.setItem('location',e.target.options[e.target.options.selectedIndex].value); 
    }
    
    const roomsRedirect = (url) =>{
        window.location.assign(url);
    }


    const removeInstitution = (id) =>{
        if(window.confirm("Are you sure?"))
        {
            var url = "http://localhost:9000/api/institution/delete/"+id+"?id="+window.localStorage.getItem('session')
            axios.get(url)
                .catch(err => console.log(err));
        }  
        window.localStorage.setItem('location',location);
        InstitutionsListGenerate();
    }


    const removeInstitutionDecider=(id)=>{
        if(props.type !== 'institution')
            return(<button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={removeInstitution.bind(id,id)}>Delete</button>)
        else
            return(<div></div>)
    }


    const InstitutionsListGenerate = () => {
        var url = "";
        axios.get("http://localhost:9000/api/institution?location="+location +"&id=" +window.localStorage.getItem('session') 
                                            +"&institutionId=" + props.institutionId)
        .then(res => {
            if(res.data === "connection closed")
            {
                alert(res.data);
                window.location.replace('/');
            }    
            const institutions = res.data.map( u =>
                <div  key={u._id} className="InstitutionsContainer">
                    <div class="card mb-2">
                        <div class="card-body">
                        <h5 className="card-title">{u.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                        <button type="button" class="btn btn-primary mr-3 mb-2">
                                Total Rooms <span class="badge badge-light">{u.rooms.length}</span>
                        </button>
                        <button type="button" class="btn btn-warning mr-3 mb-2">
                                Vacant <span class="badge badge-light">{vacantCount(u.rooms)}</span>
                        </button>
                        <button type="button" class="btn btn-success mr-3 mb-2">
                                Decontaminated <span class="badge badge-light">{decontaminatedCount(u.rooms)}</span>
                        </button><br/>
                        <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={roomsRedirect.bind(url,"/admin/"+u._id)}>Check Rooms</button>
                        {removeInstitutionDecider(u._id)}
                    </div>  
                </div>
                </div>
                );    
            setInstitutions(institutions);
        })
        .catch(err => console.log(err));
    }

    
    useEffect(()=>{
        InstitutionsListGenerate(); 
    },[location]);
    


    const searchDecider = () =>{
        if(props.type !== 'institution')
            return(<DistrictSearch handleLocationParent = {handleLocation} />) ;
        else
            return(<div></div>);
    }
    
    return (
        <div id="InstitutionTab p-2">
            <div>
                {searchDecider()}
                {institutions}
            </div>                   
        </div>  
    );
}

export default Institution;
