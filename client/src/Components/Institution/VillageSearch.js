import React, {useEffect} from 'react';
import VillageList from './VillageList';

function VillageSearch(props)
{
    useEffect(()=>{
        const villageSearch = document.getElementById('villageSearch');
        villageSearch.options.length =0;
        document.getElementById('villageSearch').options.selectedIndex = -1;    
        for(var i=0;i<VillageList[props.taluk].length; i++)
        {
            villageSearch.options[i] = new Option(VillageList[props.taluk][i]);
            if(VillageList[props.taluk][i] === window.localStorage.getItem('village'))
                document.getElementById('villageSearch').options.selectedIndex = i;    
        }
        document.getElementById('institutionsList').style.display = 'block';
    },[props.taluk])
    
    
    return(
        <div class="col-lg-6">
            <label for="villageSearch">Village</label>
            <select class="custom-select" name="village" id="villageSearch" size="1" onChange={props.handleVillageParent}>
                <option value="" defaultValue>Choose</option>
            </select>
        </div>
    )


}
export default VillageSearch;