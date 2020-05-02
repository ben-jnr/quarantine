import React from 'react';


function InstitutionsAddForm(props){
    
    const talukDecider = ()=>{
        if(props.type !== 'taluk')
        {
            return(
                <div class="col mt-2">
                    <label for="talukAdd">Taluk</label>
                    <select class="custom-select" name="taluk" id="talukAdd" size="1" onChange={props.handleDropdownParent}>
                        <option selected value="Choose">Choose</option>
                        <option value="Chavakkad">Chavakkad</option>
                        <option value="Chalakudy">Chalakudy</option>
                        <option value="Kodungallur">Kodungallur</option>
                        <option value="Kunnamkulam">Kunnamkulam</option>
                        <option value="Mukunthapuram">Mukundapuram</option>
                        <option value="Thalapilly">Thalapilly</option>
                        <option value="Thrissur">Thrissur</option>
                    </select>
                </div>
            )
        }
        else
        {
            return(<div></div>)
        }
    }
    
    
    return(
        <div className="inst-only">
            <div>
                <div class="form-group col">
                    <label for="instName">Institution Name</label>
                    <input type="text" name="name" class="form-control" id="instName" placeholder="Name of institution" onChange={props.handleChangeParent}/>
                </div>
            <div className="instType ml-3 mb-2">
                <h6>Institution Type?</h6>
                <div className="inst-type mb-2">
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="type1" name="type" value="hotel/lodge" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="type1">Hotel/Lodge</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="type2" name="type" value="hostel" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="type2">Hostel</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="type3" name="type" value="educational institution" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="type3">Educational Institution</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="type4" name="type" value="hospital building" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="type4">Hospital Building</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="type5" name="type" value="resort" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="type5">Resort</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="type6" name="type" value="other" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="type6">Other</label>
                    </div>
                </div>
            </div>
            <div className="fitness ml-3 mt-2">
                <h6>Structurally Fit?</h6>
                <div className="inst-sfit form-row">
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="sfit1" name="fit" value="yes" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="sfit1">Yes</label>
                    </div>
                    <div class="custom-control custom-radio ml-4">
                        <input type="radio" id="sfit2" name="fit" value="no" onChange={props.handleChangeParent} class="custom-control-input"/>
                        <label class="custom-control-label" for="sfit2">No</label>
                    </div>
                </div>   
            </div>  
            {talukDecider()} 
            </div>                 
        </div>
    );
}  


export default InstitutionsAddForm;
