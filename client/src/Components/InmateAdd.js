import React, { Component } from 'react'

class InmateAdd extends Component {  
    render() {
        return (
            <div className="input-group">
                    <form>
                        <div className="form-group">
                            <label for="inmateName">Name</label>
                            <input type="text" className="form-control" id="inmateName" placeholder="Enter name"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Age</label>
                            <input type="text" min="1" className="form-control" id="inmateAge" placeholder="Age"/>
                        </div>
                        <div class="form-group">
                            <label for="inmateAddr">Address</label>
                            <textarea class="form-control" id="inmateAddr" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="inmatePhone">Contact No</label>
                            <input type="text"  className="form-control" id="inmatePhone" placeholder="Phone number"/>
                        </div>
                        <h4>Current health status</h4> 
                        <div className="form-group mb-3" id="stat">   
                            <buton className="btn btn-danger mr-3 mb-2"><span className="mt-2">I'm feeling sick <i className="fa fa-meh-o fa-1x"></i></span></buton>
                            <buton className="btn btn-success"><span>I'm fine <i className="fa fa-smile-o fa-1x"></i></span></buton>
                        </div><hr/>
                        
                        <div className="form-group">
                            <h4>Previous medical history</h4>
                            <textarea class="form-control" id="inmateHistory" rows='3'></textarea>
                        </div>
                            <hr/>

                        <button type="submit" className="btn btn-primary btn-lg mt-3">Add inmate</button>
                    </form>
            </div>

        )
    }
}

export default InmateAdd
