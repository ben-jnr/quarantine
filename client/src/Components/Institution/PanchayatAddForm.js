import React, {useEffect} from 'react';
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


function PanchayatAddForm(props)
{
  useEffect(()=>{
        const panchayatAdd = document.getElementById('panchayatAdd');
        panchayatAdd.options.length =1;
        for(var i=0;i<PanchayatList[props.constituency].length; i++)
            panchayatAdd.options[panchayatAdd.options.length] = new Option(PanchayatList[props.constituency][i],PanchayatList[props.constituency][i] );
    },[props.constituency])
    
    
    return(
        <div class="col">
            
            <label for=
            "panchayatAdd">Panchayat</label>
            <select class="custom-select" name="panchayat" id="panchayatAdd" size="1" onChange={props.handleDropdownParent}>
                <option value="" defaultValue>Choose</option>
            </select>

            <button className = 'btn' id = "find-me" onClick={geoFindMe}>Show my location</button><br/>
            <p id = "status"></p>
            <a class="" id = "map-link" target="_blank"></a> 
        </div>
    )


}
export default PanchayatAddForm;