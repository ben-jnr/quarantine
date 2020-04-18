import React, { Component } from 'react'

class Room extends Component {

    constructor(props){
        super(props);
        this.state={newInstitution:"",
                    Institutions :[]};              
    }

    componentDidMount(){
        document.getElementById('v-pills-home-tab').classList.remove('active');
        document.getElementById('v-pills-institution-tab').classList.add('active');
        document.getElementById('v-pills-home').classList.remove('active');
        document.getElementById('v-pills-institution').classList.add('active');
        document.getElementById('v-pills-home').classList.remove('show');
        document.getElementById('v-pills-institution').classList.add('show');
    }



    render() {
        return (
            <div className="input-group">
                <div>
                    <a href="/admin"><button className="btn btn-primary mr-2">Back</button></a>
                </div>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Room No</label>
                            <input type="text" className="form-control" id="roomNo" placeholder="Room No"/>
                        </div>
                        {/* <div className="form-group">
                            <label for="exampleInputPassword1">No of inmate</label>
                            <input type="number" min="1" className="form-control" id="exampleInputPassword1" placeholder="No of inmate"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Date of check-in</label>
                            <input type="date" className="form-control" id="exampleInputPassword1" placeholder="No of inmate"/>
                        </div> */}
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Status</label>
                            </div>
                            <select class="custom-select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">Decontaminated</option>
                                <option value="2">Non Decontaminated</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Add room</button>
                    </form>
            </div>
            
        )
    }
}

export default Room
