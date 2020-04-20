import React, { Component } from 'react'
import axios from 'axios';

class InmateAdd extends Component {  
    
    constructor(props){
        super(props);
        var url = window.location.pathname;
        this.name=url.split("/")[2];
        this.district=url.split("/")[3];
        this.no=url.split("/")[4];
        this.floor=url.split("/")[5];
        this.state = {
            name:"",
            age:"",
            phn:"",
            address:"",
            curr:"",
            prev:""
        };
    }
    
    
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.name !== "" && this.state.age !== "" && this.state.phn !== "" 
            && this.state.address !== "" && this.state.curr !== ""){
                
                var url = "http://localhost:9000/admin/"+ this.name+'/'+this.district+'/'+this.no+'/'+this.floor+'/';
                const data = {
                            name:this.state.name,
                            age:this.state.age,
                            phn:this.state.phn,
                            address:this.state.address,
                            curr:this.state.curr,
                            prev:this.state.prev
                        }
                var config = {
                    headers: {'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true}
                    };
                const tempThis = this;
                axios.post(url,data,config)
                .then(function(res){
                    console.log(res.data);
                    tempThis.props.parentRender();
                })
                .catch(err => {console.log(err)});            
                
            }
        else{
            document.getElementById('InmateAddMssg').innerHTML = "Empty Fields";
        }
         document.getElementById('InmateName').value = "";
         document.getElementById('InmateAge').value = "";
         document.getElementById('InmatePhone').value = "";  
         document.getElementById('InmateAddr').value = "";    
         document.getElementById('InmateHistory').value = "";
         document.getElementById('sickbtn').style.opacity='100%';
         document.getElementById('finebtn').style.opacity='100%';
    }


    currentHealth=(health)=>{
        this.setState({curr:health});
        var pressedbtn = health+'btn';
        document.getElementById(pressedbtn).style.opacity='100%';    
        if(health === "fine")
            document.getElementById('sickbtn').style.opacity='30%';
        else
            document.getElementById('finebtn').style.opacity='30%';    
    }



    render() {
        return (
            <div className="input-group">
                    <form>
                        <div className="form-group">
                            <label for="inmateName">Name</label>
                            <input type="text" name="name" className="form-control" id="InmateName" onChange={this.handleChange} placeholder="Enter name"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Age</label>
                            <input type="text" min="1" name="age" className="form-control" id="InmateAge" onChange={this.handleChange} placeholder="Age"/>
                        </div>
                        <div className="form-group">
                            <label for="inmatePhone">Contact No</label>
                            <input type="text" name="phn" className="form-control" id="InmatePhone" onChange={this.handleChange} placeholder="Phone number"/>
                        </div>
                        <div class="form-group">
                            <label for="inmateAddr">Address</label>
                            <textarea class="form-control" id="InmateAddr" rows="3" name="address" onChange={this.handleChange}></textarea>
                        </div>
                        <h4>Current health status</h4> 
                        <div className="form-group mb-3" id="stat">   
                            <buton id="sickbtn" className="btn btn-danger mr-3 mb-2" onClick={this.currentHealth.bind(this,'sick')}><span className="mt-2">sick <i className="fa fa-meh-o fa-1x"></i></span></buton>
                            <buton id="finebtn" className="btn btn-success" onClick={this.currentHealth.bind(this,'fine')}><span>fine <i className="fa fa-smile-o fa-1x"></i></span></buton>
                        </div><hr/>
                        
                        <div className="form-group">
                            <h4>Previous medical history</h4>
                            <textarea class="form-control" id="InmateHistory" name="prev" rows='3' onChange={this.handleChange}></textarea>
                        </div>
                            <hr/>

                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-lg mt-3">Add inmate</button>
                        <div id="InmateAddMssg"></div>
                    </form>
            </div>

        )
    }
}

export default InmateAdd
