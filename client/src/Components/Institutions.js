import React, { Component } from 'react';
import axios from 'axios';

class Institutions extends Component {
    
    
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
                if(res.data === "Institution Succesfully Added")
                    window.location.reload();
                else 
                    document.getElementById("InstitutionAddMssg").innerHTML = res.data;      
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
                    <div class="card mb-2">
                        <div class="card-body">
                        <h5 className="card-title">{u.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Place</h6>
                        <button type="button" class="btn btn-primary mr-3">
                                Total Rooms <span class="badge badge-light">9</span>
                        </button>
                        <button type="button" class="btn btn-success mr-3">
                                Decontaminated <span class="badge badge-light">9</span>
                        </button>
                        <button type="button" class="btn btn-danger mr-3">
                                Non deconataminated <span class="badge badge-light">9</span>
                        </button><br/>
                        <button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={this.removeInstitution.bind(this,u._id)}>Delete</button>
                    </div>  
                </div>
                </div>
                );
            this.setState({"Institutions":institutions});
        })
        .catch(err => console.log(err));
    }
    
        
       
    render() {
        return (
            <div id="InstitutionTab p-2">
                <div id="NewInstituteForm" className="input-group mb-3">
                    <input type="text" className="form-control" name="newInstitution" id="NewInstitution" onChange={this.handleChange}></input>
                    <div className="input-group-append">
                    <button type="submit" id="NewInsititutionButton" className="input-group-text btn btn-sm" onClick={this.handleSubmit}>Add</button>  
                    </div>
                </div> 
                <div id="InstitutionAddMssg"></div>
                <div>
                    { this.state.Institutions } 
                </div>               
            </div>  
        );
    }
}

export default Institutions;