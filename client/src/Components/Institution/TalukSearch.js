import React from 'react';

function TalukSearch(props) {
    return (
        <div class="input-group mt-2 mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="loc">Taluk</label>
            </div>
            <select class="custom-select" name="taluk" id="locTaluk" size="1" onChange={props.handleTalukParent}>
                <option selected value="Chavakkad">Chavakkad</option>
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

export default TalukSearch;