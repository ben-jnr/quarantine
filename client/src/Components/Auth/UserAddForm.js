import React from 'react';

function UserAddForm(props) {
    return (
        <div id="userAddFrom" className="">
            <form className="col-md-7">
                <h2 className="text-center">Add User</h2><hr/>
                <div className="form-group">
                    <input type="text" className="form-control" id="newUsername" onChange={props.handleChangeParent} name="username" placeholder="Enter username" required/>
                </div>
                <div className="form-group">
                    <input type="password" onChange={props.handleChangeParent} name="password" className="form-control" id="newPassword" placeholder="Password" required/>
                </div>
                <div className="form-group">
                    <input type="password" onChange={props.handleChangeParent} name="confirmpassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" required/>                    
                </div>
            </form>            
        </div>
    );
}

export default UserAddForm;