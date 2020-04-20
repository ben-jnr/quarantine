import React, { Component } from 'react';
import axios from 'axios';


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
class Institutions extends Component {
    
    
    constructor(props){
        super(props);
        this.state={newInstitution:"",
                    District:"",
                    Location:window.localStorage.getItem('location'),
                    Institutions :[]};            
    }
    

    InstitutionsListGenerate = () => {
        axios.get("http://localhost:9000/admin/institution?location="+this.state.Location)
        .then(res => {
            const institutions = res.data.map( u =>
                <div  key={u._id} className="InstitutionsContainer">
                    <div class="card mb-2">
                        <div class="card-body">
                        <h5 className="card-title">{u.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                        <button type="button" class="btn btn-primary mr-3 mb-2">
                                Total Rooms <span class="badge badge-light">{u.rooms.length}</span>
                        </button>
                        <button type="button" class="btn btn-success mr-3 mb-2">
                                Vacant <span class="badge badge-light">{vacantCount(u.rooms)}</span>
                        </button>
                        <button type="button" class="btn btn-danger mr-3 mb-2">
                                Decontaminated <span class="badge badge-light">{decontaminatedCount(u.rooms)}</span>
                        </button><br/>
                        <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={this.roomsRedirect.bind(this,"/admin/"+u.name+'/'+u.district)}>Check Rooms</button>
                        <button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={this.removeInstitution.bind(this,u._id)}>Delete</button>
                    </div>  
                </div>
                </div>
                );
            this.setState({"Institutions":institutions});
        })
        .catch(err => console.log(err));
    }


    handleChange =(event)=>{    
        this.setState({
            [event.target.name]: event.target.value
          });
    }  

    handleDropdown = event =>{
        this.setState({
            ["District"]: event.target.options[event.target.options.selectedIndex].value
          });
    }

    handleLocation = event =>{
        this.setState({
            ["Location"]: event.target.options[event.target.options.selectedIndex].value
          },function(){
            window.localStorage.setItem('location',this.state.Location);
            {this.InstitutionsListGenerate()}  
          });
        
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        document.getElementById("InstitutionAddMssg").innerHTML = "";    
        if(this.state.newInstitution !== "" && this.state.District !== "")
        {
            const data ={
                        name:this.state.newInstitution,
                        district:this.state.District
                        };
            var config = {
                        headers: {'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Credentials': true}
            };            
            var tempThis = this;
            axios
            .post("http://localhost:9000/admin/institution", data, config)
            .then(function(res){
                if(res.data.mssg === "Institution Succesfully Added")
                { 
                    if(data.district=== tempThis.state.Location)
                    {  
                        var institutions = tempThis.state["Institutions"];
                        const newInstitution = res.data.current.ops.map( u =>
                            <div  key={u._id} className="InstitutionsContainer">
                                <div class="card mb-2">
                                    <div class="card-body">
                                    <h5 className="card-title">{u.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                                    <button type="button" class="btn btn-primary mr-3">
                                            Total Rooms <span class="badge badge-light">{u.rooms.length}</span>
                                    </button>
                                    <button type="button" class="btn btn-success mr-3">
                                            Vacant <span class="badge badge-light">{vacantCount(u.rooms)}</span>
                                    </button>
                                    <button type="button" class="btn btn-danger mr-3">
                                            Decontaminated <span class="badge badge-light">{decontaminatedCount(u.rooms)}</span>
                                    </button><br/>
                                    <button className="btn btn-primary  mt-2 float-right" onClick={tempThis.roomsRedirect.bind(tempThis, "/admin/"+u.name+'/'+u.district)}>Check Rooms</button>
                                    <button className="btn btn-danger DeleteInstitution mt-2 float-right" onClick={tempThis.removeInstitution.bind(tempThis,u._id)}>Delete</button>
                                </div>  
                            </div>
                            </div>
                            );
                        institutions.unshift(newInstitution);
                        tempThis.setState({"Institutions":institutions});
                        document.getElementById("InstitutionAddMssg").innerHTML = "Institution Added to "+data.district;
                    }
                    else{
                        document.getElementById("InstitutionAddMssg").innerHTML = "Institution Added to "+data.district; 
                    }       
                }
                else 
                    document.getElementById("InstitutionAddMssg").innerHTML = "Institution Already Exists";      
            })
            .catch(err =>console.log(err));
        }                
        else{
            document.getElementById("InstitutionAddMssg").innerHTML = "Empty Field";
        }    
        this.setState({newInstitution:"",District:""}); 
        document.getElementById("instName").value = "";
        document.getElementById("dist").options.selectedIndex = 0;
    }


    removeInstitution = (id) =>{
        if(window.confirm("Are you sure?"))
        {
            axios.get("http://localhost:9000/admin/institution/delete/"+id)
                .catch(err => console.log(err));
        }  
        this.componentDidMount();
    }


    roomsRedirect = (url) =>{
         window.location.assign(url);
    }


    onUnload =() =>{
        window.localStorage.setItem('currTab','Home');
        window.localStorage.setItem('location','Alappuzha');
    }

    componentDidMount(){
        window.addEventListener("beforeunload", this.onUnload);
        for(var i=0;i<document.getElementById('loc').options.length;i++)
        {
            if(document.getElementById('loc').options[i].value === window.localStorage.getItem('location'))
            {
                document.getElementById('loc').options.selectedIndex = i;
                break;
            }
        }
        {this.InstitutionsListGenerate()}
    }
     
     componentWillUnmount() {
         window.removeEventListener("beforeunload", this.onUnload);
     }

       
    render() {
        return (
            <div id="InstitutionTab p-2">
                <div className="form-row">
                <div class="form-group col-md-6">
                    <label for="instName">Name</label>
                    <input type="text" name="newInstitution" class="form-control" id="instName" placeholder="Name of institution" onChange={this.handleChange}/>
                </div>
                
                <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="dist">District</label>
                            </div>
                            <select class="custom-select" name="District" id="dist" size="1" onChange={this.handleDropdown}>
                                <option selected>Choose...</option>
                                <option value="Alappuzha">Alappuzha</option>
                                <option value="Ernakulam">Ernakulam</option>
                                <option value="Idukki">Idukki</option>
                                <option value="Kannur">Kannur</option>
                                <option value="Kasaragod">Kasaragod</option>
                                <option value="Kollam">Kollam</option>
                                <option value="Kottayam">Kottayam</option>
                                <option value="Kozhikode">Kozhikode</option>
                                <option value="Malappuram">Malappuram</option>
                                <option value="Palakkad">Palakkad</option>
                                <option value="Pathanamthitta">Pathanamthitta</option>
                                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                <option value="Thrissur">Thrissur</option>
                                <option value="Wayanad">Wayanad</option>
                            </select>
                        </div>
                
                <button type="submit" id="NewInsititutionButton" className="btn btn-primary btn-lg btn-block mb-4" onClick={this.handleSubmit}>Add Institution</button>  
                    
                </div>
                <div id="InstitutionAddMssg"></div>
                
                
                {/*Location Dropdown*/}
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="loc">Location</label>
                    </div>
                    <select class="custom-select" name="location" id="loc" size="1" onChange={this.handleLocation}>
                        <option selected value="Alappuzha">Alappuzha</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kasaragod">Kasaragod</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Wayanad">Wayanad</option>
                    </select>
                </div>    


                {/*List of Institutions*/}                    
                <div>
                    { this.state.Institutions } 
                </div>               
            </div>  
        );
    }
}

export default Institutions;