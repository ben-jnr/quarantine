import React from 'react';

function UserDependantForm(props) {
    if(props.type === 'institution')
    {
        return(
            <div className="row">
                <div class="form-group col">
                    <label for="instName">Name</label>
                    <input type="text" name="institution" class="form-control" id="instName" placeholder="Name of institution" onChange={props.handleChangeParent}/>
                </div>    
                <div class="col">
                    <label for="dist">District</label>
                    <select class="custom-select " name="district" id="dist" size="1" onChange={props.handleDropdownParent}>
                        <option selected>Choose...</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kasaragod">Kasaragod</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Wayanad">Wayanad</option>
                    </select>
                </div>
                <div class="form-group col">
                    <label for="no">No of Rooms</label>
                    <input type="number" name="no" class="form-control" id="noOfRooms" placeholder="No of Rooms" onChange={props.handleChangeParent}/>
                </div>
                <div id="InstitutionAddMssg"></div>                    
            </div>
        );
    }    
    else
        return(
            <div></div>
        );        
}

export default UserDependantForm;