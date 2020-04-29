import React from 'react';

function UserTypeForm(props) {
    if(props.type === 'superadmin')
        return (
            <div>
                <h5>Select User Type</h5>
                    <div className="row mb-3 ml-2">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="rBtn1" name="type" value="admin" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn1">Admin</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="rBtn2" name="type" value="dashboard" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn2">Dashboard</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="rBtn3" name="type" value="taluk" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn3">Taluk</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="rBtn4" name="type" value="airport" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn4">Airport</label>
                        </div>
                    </div>
            </div>
        );
    else if(props.type === 'admin')
        return(
            <div>
                <h5>Select User Type</h5>
                    <div className="row mb-3 ml-2">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="rBtn2" name="type" value="dashboard" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn2">Dashboard</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="rBtn3" name="type" value="taluk" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn3">Taluk</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="rBtn4" name="type" value="airport" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="rBtn4">Airport</label>
                        </div>
                    </div>
            </div>
        );
}

export default UserTypeForm;