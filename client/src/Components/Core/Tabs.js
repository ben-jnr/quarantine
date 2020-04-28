import React from 'react';
import Home from '../Home/Home';
import UserAdd from "../Auth/UserAdd";
import Institutions from "../Institution/Institutions";
import Rooms from "../Room/Room"
import RoomInfo from '../Room/RoomInfo';

function Tabs(props) {
    const selectInstitutionsTab =() =>{
        if(props.currInstitutionsTab === "Institutions")
        return(<Institutions type={props.type} institutionId ={props.institutionId}/>)
        else if(props.currInstitutionsTab === "Rooms")
          return(<Rooms />)
        else if(props.currInstitutionsTab === "Inmate")
          return(<RoomInfo />)  
    }
    
      
    if(props.type === 'superadmin')
        return(
            <div className="row-12">
                <div className="tab-content ml-4" id="v-pills-tabContent">
                    <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Home/></div>
                    <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-institution-tab">
                        <h2>{props.currTab}</h2> {selectInstitutionsTab()}</div>
                    <div class="tab-pane fade" id="v-pills-user" role="tabpanel" aria-labelledby="v-pills-user-tab">
                        <UserAdd type={props.type}/>
                    </div>
                </div>
            </div>  
        );
    else if(props.type === 'admin')  
    return (
        <div className="row-12">
            <div className="tab-content ml-4" id="v-pills-tabContent">
                <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Home/></div>
                <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-institution-tab">
                    <h2>{props.currTab}</h2> {selectInstitutionsTab()}</div>
                <div class="tab-pane fade" id="v-pills-user" role="tabpanel" aria-labelledby="v-pills-user-tab">
                    <UserAdd type={props.type}/>
                </div>
            </div>
        </div>
    );
    else if(props.type === 'dashboard')  
        return (
            <div className="row-12">
                <div className="tab-content ml-4" id="v-pills-tabContent">
                    <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Home/></div>
                </div>
            </div>
        );
    else if(props.type === 'taluk')  
        return (
            <div className="row-12">
                <div className="tab-content ml-4" id="v-pills-tabContent">
                    <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-institution-tab">
                        <h2>{props.currTab}</h2> {selectInstitutionsTab()}
                    </div>
                    <div class="tab-pane fade" id="v-pills-user" role="tabpanel" aria-labelledby="v-pills-user-tab">
                        <UserAdd type={props.type}/>
                    </div>
                </div>
            </div>
        );    
    else if(props.type === 'airport')  
        return (
            <div className="row-12">
                <div className="tab-content ml-4" id="v-pills-tabContent">
                </div>
            </div>
        );
    else if(props.type === 'institution')  
        return (
            <div className="row-12">
                <div className="tab-content ml-4" id="v-pills-tabContent">
                    <div className="tab-pane fade p-2" id="v-pills-institution" role="tabpanel" aria-labelledby="v-pills-institution-tab">
                        <h2>{props.currTab}</h2> {selectInstitutionsTab()}</div>
                </div>
            </div>
        );        
}

export default Tabs;