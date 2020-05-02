import React from 'react';

function RoomsAddForm(props) {
    return (
<div className="col">
        <div class="accordion">
        <div class="card mb-4">
      <button className="btn btn-primary btn-block mr-2" onClick={props.institutionsRedirectParent}>Prev page <i className="fa fa-arrow-left "></i></button>
    <div class="card-header p-1" id="headingRooms">
      <h2 class="mb-0">

        <button class="btn btn-link text-center" type="button" data-toggle="collapse" data-target="#collapseRooms" aria-expanded="true" aria-controls="collapseRooms">
          <h6>Add Room info</h6>
        </button>
      </h2>
    </div>

    <div id="collapseRooms" class="collapse" aria-labelledby="headingRooms" data-parent="#accordionRooms">
      <div class="card-body">
            <form className="p-2 col">
                <div className="form-row">
                    <div className="form-group col">
                        <label>Room No/Name</label>
                        <input type="text" id="roomNo" name="no" className="form-control" placeholder="Room No" onChange={props.handleChangeParent}/>
                    </div>
                    <div className="form-group col">
                        <label>No of beds</label>
                       <input type="number" id="roomBeds" name="beds" className="form-control" placeholder="No of beds" onChange={props.handleChangeParent}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label>Attached Bathroom ?</label>
                        <div className="row mb-3 ml-2">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="attchBath1" name="bathroom" value="yes" onChange={props.handleChangeParent} class="custom-control-input"/>
                                <label class="custom-control-label" for="attchBath1">Yes</label>
                            </div>
                            <div class="custom-control custom-radio ml-2">
                                <input type="radio" id="attchBath2" name="bathroom" value="no" onChange={props.handleChangeParent} class="custom-control-input"/>
                                <label class="custom-control-label" for="attchBath2">No</label>
                            </div>
                        </div>
                </div>
                <div className="form-group col">
                    <label>Disable Friendly?</label>
                    <div className="row mb-3 ml-3">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="disable1" name="disable" value="yes" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="disable1">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-2">
                            <input type="radio" id="disable2" name="disable" value="no" onChange={props.handleChangeParent} class="custom-control-input"/>
                            <label class="custom-control-label" for="disable2">No</label>
                        </div>
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
                <div className="form-group col">
                    <label>Remark</label>
                    <input type="text" id="remark" name="remark" className="form-control" placeholder="remark" onChange={props.handleChangeParent}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={props.handleSubmitParent}>Add room</button>
            </form>      
        </div>
    </div>
  </div>
</div>
            
        </div>
    );
}

export default RoomsAddForm;
