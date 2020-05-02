import React, {useEffect} from 'react';
import VillageList from './VillageList';

function VillageAddForm(props)
{
    useEffect(()=>{
        const villageAdd = document.getElementById('villageAdd');
        villageAdd.options.length =1;
        for(var i=0;i<VillageList[props.taluk].length; i++)
            villageAdd.options[villageAdd.options.length] = new Option(VillageList[(props.taluk)][i],VillageList[props.taluk][i] );
    },[props.taluk])
    
    
    return(
        <div class="col mb-2">
            <label for="villageAdd">Village</label>
            <select class="custom-select" name="village" id="villageAdd" size="1" onChange={props.handleDropdownParent}>
                <option value="" defaultValue>Choose</option>
            </select>
        </div>
    )


}
export default VillageAddForm;