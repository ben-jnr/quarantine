import React, { useEffect } from 'react';

function TalukSearch(props) {
    useEffect(()=>{
        if(window.localStorage.getItem('taluk')!== null)
        {
            if(window.localStorage.getItem('taluk')==='Chavakkad')
                document.getElementById('talukSearch').options.selectedIndex=0;
            if(window.localStorage.getItem('taluk')==='Chalakudy')
                document.getElementById('talukSearch').options.selectedIndex=1;
            if(window.localStorage.getItem('taluk')==='Kodungallur')
                document.getElementById('talukSearch').options.selectedIndex=2;
            if(window.localStorage.getItem('taluk')==='Kunnamkulam')
                document.getElementById('talukSearch').options.selectedIndex=3;
            if(window.localStorage.getItem('taluk')==='Mukunthapuram')
                document.getElementById('talukSearch').options.selectedIndex=4;
            if(window.localStorage.getItem('taluk')==='Thalapilly')
                document.getElementById('talukSearch').options.selectedIndex=5;
            if(window.localStorage.getItem('taluk')==='Thrissur')
                document.getElementById('talukSearch').options.selectedIndex=6;    
        }
    },[])
    
    return (
        <div class="mb-3 col-lg-6">
            
                <label  htmlFor="locTaluk">Taluk</label>
                <select class="custom-select" name="taluk" id="talukSearch" onChange={props.handleTalukParent}>
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