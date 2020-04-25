import React from 'react';

function Navbar(props) {
    if(props.type === 'superadmin')
        return(
            <div class="col p-2 mb-3">
                <div className="nav row nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a className="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">{props.currInstitutionsTab}</a>
                    <a className="nav-link" id="v-pills-emigrant-tab" data-toggle="pill" href="#v-pills-emigrant" role="tab" aria-controls="v-pills-messages" aria-selected="false">Add Emigrant</a>
                    <a className="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-messages" aria-selected="false">Add User</a>
                    <a className="nav-link" id="v-pills-logout" onClick ={props.logoutParent} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
                </div>
            </div>
        );
    else if(props.type === 'admin')
        return (
            <div class="col p-2 mb-3">
                <div className="nav row nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a className="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">{props.currInstitutionsTab}</a>
                    <a className="nav-link" id="v-pills-emigrant-tab" data-toggle="pill" href="#v-pills-emigrant" role="tab" aria-controls="v-pills-messages" aria-selected="false">Add Emigrant</a>
                    <a className="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-messages" aria-selected="false">Add User</a>
                    <a className="nav-link" id="v-pills-logout" onClick ={props.logoutParent} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
                </div>
            </div>
        );
    else if(props.type === 'dashboard')
        return(
            <div class="col p-2 mb-3">
            <div className="nav row nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                <a className="nav-link" id="v-pills-logout" onClick ={props.logoutParent} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
            </div>
        </div>
        );
    else if(props.type === 'airport')
        return (
            <div class="col p-2 mb-3">
                <div className="nav row nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link" id="v-pills-emigrant-tab" data-toggle="pill" href="#v-pills-emigrant" role="tab" aria-controls="v-pills-messages" aria-selected="false">Add Emigrant</a>
                    <a className="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">{props.currInstitutionsTab}</a>
                    <a className="nav-link" id="v-pills-logout" onClick ={props.logoutParent} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
                </div>
            </div>
        );
    else if(props.type === 'institution')
        return (
            <div class="col p-2 mb-3">
                <div className="nav row nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link" id="v-pills-institution-tab" data-toggle="pill" href="#v-pills-institution" role="tab" aria-controls="v-pills-profile" aria-selected="false">{props.currInstitutionsTab}</a>
                    <a className="nav-link" id="v-pills-logout" onClick ={props.logoutParent} data-toggle="pill" href="#v-pills-settings" role="tab"aria-selected="false">Logout</a>
                </div>
            </div>
        );    
}

export default Navbar;