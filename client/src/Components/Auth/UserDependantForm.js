import React from 'react';
import PanchayatList from './PanchayatList';


function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
      mapLink.textContent = `Latitude: 0 °, Longitude: 0 °`;
    }
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
      mapLink.textContent = `Latitude: 0 °, Longitude: 0 °`;
    } 
    else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
}
  

function UserDependantForm(props) {
    if(props.type === 'institution')
    {
        return(
            <div>
                <div class="form-group col">
                    <label for="instName">Institution Name</label>
                    <input type="text" name="institution" class="form-control" id="instName" placeholder="Name of institution" onChange={props.handleChangeParent}/>
                </div>    
                <div class="col">
                    <label for="dist">Taluk</label>
                    <select class="custom-select" name="taluk" id="talukadd" size="1" onChange={props.handleDropdownParent}>
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
                <PanchayatList handleDropdownParent={props.handleDropdownParent}/>
                <h6>Structurally Fit?</h6>
                    <div className="row mb-3 ml-2">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="sfit1" name="fit" value="yes" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="sfit1">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="sfit2" name="fit" value="no" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="sfit2">No</label>
                        </div>
                    </div>

                <button className = 'btn' id = "find-me" onClick={geoFindMe}>Show my location</button><br/>
                <p id = "status"></p>
                <a class="" id = "map-link" target="_blank"></a> 
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