import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home(props) {
    
    const [choice , setChoice] = useState('');
    const [tableData, setTableData] = useState('');
    
    const handleChange = (e) =>{
        setChoice(e.target.value);
    }


    useEffect(()=>{
        axios.get('http://localhost:9000/api/count?id='+ window.localStorage.getItem('session') 
                + '&choice='+choice)
        .then(res => {
            const keys = Object.keys(res.data);
            const tableContent = keys.map( u => 
                <tr>
                    <th scope="row">{u}</th>
                    <td>{res.data[u][0]}</td>
                    <td>{res.data[u][1]}</td>
                    <td>{res.data[u][2]}</td>
                    <td>{res.data[u][3]}</td>
                    <td>{res.data[u][4]}</td>
                    <td>{res.data[u][5]}</td>
                    <td>{res.data[u][6]}</td>
                    <td><button className='btn btn-primary'>More</button></td>
                </tr>
            );
            setTableData(tableContent);            
        })
        .catch(err => console.log(err));
    },[choice]);
    

    const headingDecider=() =>{
        if(choice === 'constituency')
            return(' LAC ');
        else if(choice === 'taluk')
            return('Taluk');
        else
            return('');        
    }

    return (
        <div>
            <hr/>
            <div>
                <h6>Count Criteria?</h6>
                <span class="custom-control custom-radio ml-4">
                    <input type="radio" id="choice1" name="choice" value="taluk" onChange={handleChange} class="custom-control-input"/>
                    <label class="custom-control-label" for="choice1">Taluk</label>
                </span>
                <span class="custom-control custom-radio ml-4">
                    <input type="radio" id="choice2" name="choice" value="constituency" onChange={handleChange} class="custom-control-input"/>
                    <label class="custom-control-label" for="choice2">LAC</label>
                </span> 
            </div>
            <hr/>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">{headingDecider()} Name</th>
                        <th scope="col">Institutions</th>
                        <th scope="col">Total Rooms</th>
                        <th scope="col">Ready Rooms</th>
                        <th scope="col">Usable Rooms</th>
                        <th scope="col">Total Beds</th>
                        <th scope="col">Ready Beds</th>
                        <th scope="col">Usable Beds</th>
                        <th scope="col">More Info</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>  
        </div>
    );
}

export default Home;