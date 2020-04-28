import React from 'react';

function PanchayatList(props) {
    return (
        <div class="col">
            <label for="panchayat">Panchayat</label>
            <select class="custom-select" name="panchayat" id="panchayat" size="1" onChange={props.handleDropdownParent}>
                <option selected>Choose...</option>
                <option value="Chavakkad">Chavakkad</option>
                <option value="Chalakkudy">Chalakkudy</option>
                <option value="Kodungallur">Kodungallur</option>
                <option value="Kunnamkulam">Kunnamkulam</option>
                <option value="Mukundapuram">Mukundapuram</option>
                <option value="Thalappally">Thalappally</option>
                <option value="Thrissur">Thrissur</option>
            </select>
        </div>
    );
}

export default PanchayatList;