import React from 'react';

function RoomsAddForm(props) {
    return (
        <div className="input-group col-6">
            <div>
                <button className="btn btn-primary mr-2" onClick={props.institutionsRedirectParent}><i className="fa fa-arrow-left "></i></button>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Room No</label>
                    <input type="number" id="roomNo" name="no" className="form-control" placeholder="Room No" onChange={props.handleChangeParent}/>
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
                <button type="submit" className="btn btn-primary" onClick={props.handleSubmitParent}>Add room</button>
            </form>
        </div>
    );
}

export default RoomsAddForm;