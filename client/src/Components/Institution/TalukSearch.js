import React from 'react';

function TalukSearch(props) {
    return (
        <div class="mb-3 col-lg-6">
            
                <label  htmlFor="locTaluk">Taluk</label>
                <select class="custom-select" name="taluk" id="locTaluk" onChange={props.handleTalukParent}>
                <option selected value="Chavakkad">Chavakkad</option>
                <option value="Chalakudy">Chalakudy</option>
                <option value="Kodungallur">Kodungallur</option>
                <option value="Kunnamkulam">Kunnamkulam</option>
                <option value="Mukunthapuram">Mukunthapuram</option>
                <option value="Thalapilly">Thalapilly</option>
                <option value="Thrissur">Thrissur</option>
            </select>
        </div>
    );
}

export default TalukSearch;