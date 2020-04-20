import React, { Component } from 'react';
import axios from 'axios';

class AccordionData extends Component {
  

    constructor(props){
      super(props);
      var url = window.location.pathname;
      this.name=url.split("/")[2];
      this.district=url.split("/")[3];
      this.no=url.split("/")[4];
      this.floor=url.split("/")[5];
      this.state = {status:"",
                      room:{}};
  }
  

  componentDidMount=() =>{
    var patientUrl = 'http://localhost:9000/admin/'+this.name+'/'+this.district+'/'+this.no+'/'+this.floor+'/patient/';
    axios.get(patientUrl)
    .then(res => {
        if(res.data.mssg !== "Room Found")
            window.location.replace('/admin/'+this.name+'/'+this.district+'/');
        else    
        {
            this.setState({status:res.data.room.status,
                            room:res.data.room});
        }  
    })
    .catch(err =>console.log(err));
}     



render() {
    return (
                <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                      <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {}
                      </button>{/* NOTE THAT THE THE DATA-TARGET ATTRIBUTE ABOVE SHOULD MATCH WITH THW DIV ID BELOW*/}
                      </h5>
                  </div>

                    <div id="collapseOne" class="show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        <h5 id="inmateName">{this.state.room.name}</h5>
                        <p id="inmateAge">{this.state.room.age}</p>
                        <span className="inmatePhn">
                        <p id="inmatePhone" className="mr-3 mb-3"><i className="fa fa-mobile fa-2x"></i> {this.state.room.phn}</p>
                        </span>
                        <p id="inmateAddr">
                          {this.state.room.address}
                        </p>
                        <button type="button" class="btn btn-warning mb-2">
                            Date of check-in <span class="badge badge-light">Mar 30,2020</span>
                        </button><br/>
                        <button type="button" class="btn btn-success mb-2">
                            Discharge date <span class="badge badge-light">Apr 10,2020</span>
                        </button><br/>
                        <button type="button" class="btn btn-success mb-2">
                            Health status <span class="badge badge-light">{this.state.room.curr}<i className="fa fa-thumbs-up"></i></span>
                        </button><br/>
                      </div>
                    </div>
            </div>
        )
    }
}

export default AccordionData
