import React, {useEffect} from 'react';
import PanchayatList from './PanchayatList';


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
        </div>
    )


}
export default PanchayatAddForm;