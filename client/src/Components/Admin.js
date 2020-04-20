import React, { Component } from 'react';
import Institutions from "./Institutions";
import UserAdd from "./UserAdd";
import Rooms from "./Room"
import "./Styles/Admin.css";
import RoomInfo from './RoomInfo';
import Home from './Home';

class Admin extends Component {
    constructor(props){
      super(props);
    }  

    logout = () => {
        window.localStorage.removeItem("isAdminLogged");
        window.location.replace("/");
    }

    selectTab =() =>{
      if(this.props.currTab === "Institutions")
        return(<Institutions />)
      else if(this.props.currTab === "Rooms")
        return(<Rooms />)
      else if(this.props.currTab === "Inmate")
        return(<RoomInfo />)  
    }

    componentDidMount(){
      if(window.localStorage.getItem('currTab')==="Home"){
        document.getElementById('v-pills-home-tab').classList.add('active');
        document.getElementById('v-pills-institution-tab').classList.remove('active');
        document.getElementById('v-pills-home').classList.add('active');
        document.getElementById('v-pills-institution').classList.remove('active');
        document.getElementById('v-pills-home').classList.add('show');
        document.getElementById('v-pills-institution').classList.remove('show');
      }
      if(window.localStorage.getItem('currTab')==="Institutions")
      {
        document.getElementById('v-pills-home-tab').classList.remove('active');
        document.getElementById('v-pills-institution-tab').classList.add('active');
        document.getElementById('v-pills-home').classList.remove('active');
        document.getElementById('v-pills-institution').classList.add('active');
        document.getElementById('v-pills-home').classList.remove('show');
        document.getElementById('v-pills-institution').classList.add('show');
      }
    }

    render() {
        return (
            <div className="p-3">
              <div class="row">
                <div class="col-3 p-2">
                  <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a className="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">{this.props.currTab}</a>
                    <a className="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-messages" aria-selected="false">Add User</a>
                    <a className="nav-link" id="v-pills-logout" onClick ={this.logout} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
                  </div>
                </div>
                <div className="col-9">
                  <div className="tab-content ml-4" id="v-pills-tabContent">
                    <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Home/></div>
                      <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <h2>{this.props.currTab}</h2> 
                        {this.selectTab()}
                      </div>


                      <div class="tab-pane fade" id="v-pills-user" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <UserAdd />
                      </div>
                        

                    </div>
                  </div>
                </div>
              </div>
                        );
    }
}

export default Admin;