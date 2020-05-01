import React, { Component } from 'react'
import AccordionData from './AccordionData';
import axios from 'axios';

class InmateTab extends Component {
    constructor(props){
        super(props);
    }


    handleSubmit=()=>{
        if(window.confirm("Are you Sure?"))
        {
            var url = 'http://www.ccctsr.in'+window.location.pathname;
            const data = {name:"",age:"",phn:"",address:"",curr:"",prev:"",status:'yes'};
            var config = {
                headers: {'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true}
                };
            axios.post(url,data,config)
            .catch(err=>console.log(err));
            this.props.parentRender(data);
        }
    }

    render() {
        return (
            <div>
                <h2>Inmates</h2>
                <div id="accordion">
                  <AccordionData/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={this.handleSubmit}>Discharge</button>
                </div>
            </div>
        )
    }
}

export default InmateTab
