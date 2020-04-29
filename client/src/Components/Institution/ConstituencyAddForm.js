import React from 'react';

function ConstituencyForm(props) {
    return (
        <div>
            <div class="col">
                <label for="constituencyAdd">Constituency</label>
                <select class="custom-select" name="constituency" id="constituencyAdd" size="1" onChange={props.handleDropdownParent}>
                    <option value="Choose" selected>Choose</option>
                    <option value="Chalakkudy">Chalakkudy</option>
                    <option value="Chelakkara">Chelakkara</option>
                    <option value="Guruvayur">Guruvayur</option>
                    <option value="Irinjalakuda">Irinjalakuda</option>
                    <option value="Kaipamangalam">Kaipamangalam</option>
                    <option value="Kodungallur">Kodungallur</option>
                    <option value="Kunnamkulam">Kunnamkulam</option>
                    <option value="Manalur">Manalur</option>
                    <option value="Nattika">Nattika</option>
                    <option value="Ollur">Ollur</option>
                    <option value="Pudukkad">Pudukkad</option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Wadakkanchery">Wadakkanchery</option>
                </select>
            </div>
        </div>
    );
}

export default ConstituencyForm;