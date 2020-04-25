import React from 'react';

function DistrictSearch(props) {
    return (
        <div class="input-group mt-2 mb-3">
            <h5>Search by district</h5>
            <div class="input-group-prepend">
                <label class="input-group-text" for="loc">Location</label>
            </div>
            <select class="custom-select" name="location" id="loc" size="1" onChange={props.handleLocationParent}>
                <option selected value="Alappuzha">Alappuzha</option>
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
    );
}

export default DistrictSearch;