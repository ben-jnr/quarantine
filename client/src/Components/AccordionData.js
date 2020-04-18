import React, { Component } from 'react'

class AccordionData extends Component {
    render() {
        return (
                <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                      <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Inmate name
                      </button>{/* NOTE THAT THE THE DATA-TARGET ATTRIBUTE ABOVE SHOULD MATCH WITH THW DIV ID BELOW*/}
                      </h5>
                  </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        <h5 id="inmateName">Name of inmate</h5>
                        <p id="inmateAge">20 years</p>
                        <p id="inmateAddr">
                            TEST house,
                            test place,
                            test P.O
                            test
                        </p>
                        <span className="inmatePhn">
                        <p id="inmatePhone" className="mr-3 mb-3"><i className="fa fa-mobile fa-2x"></i> 1234567890</p>
                        </span>
                        <button type="button" class="btn btn-warning mb-2">
                            Date of check-in <span class="badge badge-light">Mar 30,2020</span>
                        </button><br/>
                        <button type="button" class="btn btn-success mb-2">
                            Discharge date <span class="badge badge-light">Apr 10,2020</span>
                        </button><br/>
                        <button type="button" class="btn btn-success mb-2">
                            Health status <span class="badge badge-light">Healthy <i className="fa fa-thumbs-up"></i></span>
                        </button><br/>
                      </div>
                    </div>
            </div>
        )
    }
}

export default AccordionData
