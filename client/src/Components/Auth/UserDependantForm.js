import React from 'react';
 

function UserDependantForm(props) {
    if(props.type === 'taluk')
    {
        return(
            <div class="col">
                <label for="talukAdd">Taluk</label>
                <select class="custom-select" name="taluk" id="talukAdd" size="1" onChange={props.handleDropdownParent}>
                    <option selected>Choose...</option>
                    <option value="Chavakkad">Chavakkad</option>
                    <option value="Chalakudy">Chalakudy</option>
                    <option value="Kodungallur">Kodungallur</option>
                    <option value="Kunnamkulam">Kunnamkulam</option>
                    <option value="Mukunthapuram">Mukunthapuram</option>
                    <option value="Thalapilly">Thalapilly</option>
                    <option value="Thrissur">Thrissur</option>
                </select>
            </div>
        )
    }  
    else
        return(
            <div></div>
        );        
}

export default UserDependantForm;
