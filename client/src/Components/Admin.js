import React, { Component } from 'react';
import Institutions from "./Institutions";
import UserAdd from "./UserAdd";
import Rooms from "./Room"
import "./Styles/Admin.css";
import InmateAdd from './InmateAdd';
import RoomInfo from './RoomInfo';

class Admin extends Component {
    constructor(props){
      super(props);
    }  

    logout = () => {
        window.localStorage.removeItem("isAdminLogged");
        window.localStorage.removeItem("Name");
        window.location.replace("/");
    }

    selectTab =() =>{
      if(this.props.currTab === "Institutions")
        return(<Institutions />)
      else if(this.props.currTab === "Rooms")
        return(<Rooms />)
    }


    render() {
        return (
            <div className="container p-3">

<div class="row">
  <div class="col-3 p-2">
    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
      <a class="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">{this.props.currTab}</a>
      <a className="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-messages" aria-selected="false">User</a>
      <a className="nav-link" id="v-pills-addInmate-tab" data-toggle="pill" href="#v-pills-inmate" role="tab"aria-selected="false">Add Inmate</a>
      <a className="nav-link" id="v-pills-roonInfo-tab" data-toggle="pill" href="#v-pills-roomInfo" role="ta b"aria-selected="false">Room info</a>
      <a className="nav-link" id="v-pills-logout" onClick ={this.logout} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
    </div>
  </div>
  <div className="col-9">
    <div className="tab-content ml-4" id="v-pills-tabContent">
      <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Home</div>

      <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          <h2>{this.props.currTab}</h2> 
          {this.selectTab()}
     </div>


      <div class="tab-pane fade" id="v-pills-user" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        <UserAdd />
      </div>
        

      <div class="tab-pane fade" id="v-pills-inmate" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        <h2>Inmate</h2>
        <InmateAdd/>
      </div>

      <div class="tab-pane fade" id="v-pills-roomInfo" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        <RoomInfo/>
      </div>

    </div>
  </div>
</div>
            </div>
        );
    }
}

export default Admin;