import React from 'react';

function UserAddForm(props) {
    return (
        <div id="userAddFrom">
            <form className="col-md-7">
                <h2 className="text-center">Add User</h2><hr/>
                <div className="form-group">
                    <label for="username">Email address</label>
                    <input type="email" className="form-control" id="newUsername" onChange={props.handleChangeParent} name="username" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label for="newPassword">Password</label>
                    <input type="password" onChange={props.handleChangeParent} name="password" className="form-control" id="newPassword" placeholder="Password" required/>
                </div>
                <div className="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" onChange={props.handleChangeParent} name="confirmpassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" required/>                    
                </div>
            </form>            
        </div>
    );
}

export default UserAddForm;