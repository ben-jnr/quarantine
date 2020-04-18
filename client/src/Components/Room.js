import React, { Component } from 'react'

class Room extends Component {
    render() {
        return (
            <div className="input-group">
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Room No</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">No of inmate</label>
                            <input type="number" min="1" className="form-control" id="exampleInputPassword1" placeholder="No of inmate"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Date of check-in</label>
                            <input type="date" className="form-control" id="exampleInputPassword1" placeholder="No of inmate"/>
                        </div>
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
