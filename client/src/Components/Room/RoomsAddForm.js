import React from 'react';

function RoomsAddForm(props) {
    return (
        <div className="input-group col-6">
            <div>
                <button className="btn btn-primary mr-2" onClick={props.institutionsRedirectParent}><i className="fa fa-arrow-left "></i></button>
            </div>
            <form>
                <div className="form-group">
                    <label>Room No</label>
                    <input type="number" id="roomNo" name="no" className="form-control" placeholder="Room No" onChange={props.handleChangeParent}/>
                </div>
                <div className="form-group">
                    <label>Floor</label>
                    <input type="number" id="roomBeds" name="bedsNo" className="form-control" placeholder="Room No" onChange={props.handleChangeParent}/>
                </div>
                <div className="form-group">
                    <label>No of beds</label>
                    <input type="number" id="roomBeds" name="bedsNo" className="form-control" placeholder="Room No" onChange={props.handleChangeParent}/>
                </div>
                <div className="form-group">
                    <label>Attached Bathroom?</label>
                    <div className="row mb-3 ml-2">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="attchBath1" name="attchBath" value="yes" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="attchBath1">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="attchBath1" name="attchBath" value="no" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="attchBath2">No</label>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                    </div>
                    <select className="custom-select" id="roomStatus" name='status' onChange={props.handleDropdownParent}>
                        <option defaultValue>Choose...</option>
                        <option value="no">Decontaminated</option>
                        <option value="yes">Contaminated</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Ready to Occupy</label>
                    <div className="row mb-3 ml-2">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="ready1" name="ready" value="yes" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="ready1">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="ready2" name="ready" value="no" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="ready2">No</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={props.handleSubmitParent}>Add room</button>
            </form>
        </div>
    );
}

export default RoomsAddForm;