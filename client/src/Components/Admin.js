import React, { Component } from 'react';
import Institutions from "./Institutions";
import UserAdd from "./UserAdd";
import Room from "./Room";
import "./Styles/Admin.css";
import InmateAdd from './InmateAdd';

class Admin extends Component {
    
    logout = () => {
        window.localStorage.removeItem("isAdminLogged");
        window.localStorage.removeItem("Name");
        window.location.replace("/");
    }

    render() {
        return (
            <div className="container p-3">

<div class="row">
  <div class="col-3 p-2">
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
      <a class="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">Institution</a>
      <a class="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-messages" aria-selected="false">User</a>
      <a class="nav-link" id="v-pills-room-tab" data-toggle="pill" href="#v-pills-room" role="tab" aria-selected="false">Add Room</a>
      <a class="nav-link" id="v-pills-addInmate-tab" data-toggle="pill" href="#v-pills-inmate" role="tab"aria-selected="false">Add Inmate</a>
      <a class="nav-link" id="v-pills-roonInfo-tab" data-toggle="pill" href="#v-pills-roomInfo" role="ta b"aria-selected="false">Room info</a>
      <a class="nav-link" id="v-pills-logout" onClick ={this.logout} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
    </div>
  </div>
  <div class="col-9">
    <div class="tab-content ml-4" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Home</div>

      <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          <h2>Institution</h2>
          <Institutions id="Institutions"/>
     </div>


      <div class="tab-pane fade" id="v-pills-user" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        New User
        <UserAdd />
      </div>
        

      <div class="tab-pane fade" id="v-pills-room" role="tabpanel" aria-labelledby="v-pills-settings-tab">
        <h2>Room</h2>
        <Room/>
      </div>
    
      <div class="tab-pane fade" id="v-pills-inmate" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        <h2>Inmate</h2>
        <InmateAdd/>
      </div>

      <div class="tab-pane fade" id="v-pills-roomInfo" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        <h2>Hi</h2>
      </div>

    </div>
  </div>
</div>
            </div>
        );
    }
}

export default Admin;