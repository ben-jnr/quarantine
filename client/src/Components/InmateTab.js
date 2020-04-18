import React, { Component } from 'react'
import AccordionData from './AccordionData';

class InmateTab extends Component {
    render() {
        return (
            <div>
                <h2>Inmates</h2>
                <div id="accordion">
                  <AccordionData/>
                </div>
            
            </div>
        )
    }
}

export default InmateTab
