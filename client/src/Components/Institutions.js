import React, { Component } from 'react';
import axios from 'axios';

class Hotels extends Component {
    
    
    constructor(){
        super();
        this.state={newInstitution:"",
                    Institutions :[]};
    }
        

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
          });
    }  



    handleSubmit = (event) =>{
        event.preventDefault();
        document.getElementById("InstitutionAddMssg").innerHTML = "";    
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true}
        };
        if(this.state.newInstitution !== "")
        {
            const data ={name:this.state.newInstitution};
            axios
            .post("http://localhost:9000/admin/institution", data, config)
            .then(function(res){
                window.location.reload();
            })
            .catch(err =>console.log(err));
        }                
        else{
            document.getElementById("InstitutionAddMssg").innerHTML = "Empty Field";
        }    
        this.setState({newInstitution:""}); 
        document.getElementById("NewInstitution").value = "";  
    }


    removeInstitution = (id) =>{
        if(window.confirm("Are you sure?"))
        {
            axios.get("http://localhost:9000/admin/institution/delete/"+id)
                .catch(err => console.log(err));
        }  
        this.componentDidMount();
    }


    componentDidMount(){
        axios.get("http://localhost:9000/admin/institution")
        .then(res => {
            const institutions = res.data.map( u =>
                <div  key={u._id} className="InstitutionsContainer">
                    <div className='Institution'>
                        <p>Name  :{u.name}</p>
                    </div>
                    <div onClick={this.removeInstitution.bind(this,u._id)} className="DeleteInstitution">Delete</div>
                </div>
                );
            this.setState({"Institutions":institutions});
        })
        .catch(err => console.log(err));
    }
    
        
       
    render() {
        return (
            <div id="InstitutionTab">
                <div id="NewInstituteForm">
                    <input type="text" name="newInstitution" id="NewInstitution" onChange={this.handleChange}></input>
                    <input type="submit" id="NewInsititutionButton" onClick={this.handleSubmit} value="Add Institution"></input>  
                </div> 
                <div id="InstitutionAddMssg"></div>
                <div>
                    { this.state.Institutions } 
                </div>               
            </div>
        );
    }
}

export default Hotels;