import React, {useState, useEffect} from 'react';

function InstitutionEdit(props) {
        
    const defaultInstitution = {type:"" , taluk:"", village:"", constituency:"", panchayat:"", 
        priority:0, fit:"",payment:"", paymentDetails:"", phone:""};
    const [newInstitution , setNewInstitution] = useState(defaultInstitution);
    const institutionId = window.location.pathname.split('/')[2];

    
    const handleChange=(e)=>{
        setNewInstitution({...newInstitution, [e.target.name]:e.target.value});
        console.log(e.target.name, e.target.value);
    }


    useEffect(()=>{
        
    })


    return (
        <div className="inst-only">
            <a href='/admin'><button className="btn btn-primary">Back</button></a>
            <div>
                <div class="form-group col">
                    <label for="instNameEdit">Institution Name</label>
                    <input type="text" name="name" class="form-control" id="instNameEdit" placeholder="Name of institution" onChange={handleChange}/>
                </div>
                <div className="instType ml-3 mb-2">
                    <div class="form-group col">
                        <label for="phoneEdit">Phone</label>
                        <input type="text" name="phone" class="form-control" id="phoneEdit" placeholder="Contact no of institution" onChange={handleChange}/>
                    </div>
                    <h6>Institution Type?</h6>
                    <div className="inst-type mb-2">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="type1Edit" name="type" value="hotel/lodge" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="type1Edit">Hotel/Lodge</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="type2Edit" name="type" value="hostel" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="type2Edit">Hostel</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="type3Edit" name="type" value="educational institution" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="type3Edit">Educational Institution</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="type4Edit" name="type" value="hospital building" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="type4Edit">Hospital Building</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="type5Edit" name="type" value="resort" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="type5Edit">Resort</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="type6Edit" name="type" value="other" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="type6Edit">Other</label>
                        </div>
                    </div>
                </div>
                <div className="fitness ml-3 mt-2">
                    <h6>Structurally Fit?</h6>
                    <div className="inst-sfit form-row">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="sfit1Edit" name="fit" value="yes" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="sfit1Edit">Yes</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="sfit2Edit" name="fit" value="no" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="sfit2Edit">No</label>
                        </div>
                    </div>   
                </div> 
                <div className="fitness ml-3 mt-2">
                    <h6>Payment</h6>
                    <div className="inst-sfit form-row">
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="payment1Edit" name="payment" value="yes" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="payment1Edit">Paid</label>
                        </div>
                        <div class="custom-control custom-radio ml-4">
                            <input type="radio" id="payment2Edit" name="payment" value="no" onChange={handleChange} class="custom-control-input"/>
                            <label class="custom-control-label" for="payment2Edit">Unpaid</label>
                        </div>
                    </div>   
                </div>
                <div className="fitness ml-3 mt-2">
                    <div id='paymentDetailsForm'>
                        <textarea id='paymentDetails' name='paymentDetails' style={{borderRadius:'5px'}} placeholder= 'Enter Payment details (if any)' class="form-control" onChange={handleChange}></textarea>
                    </div>
                </div>     
            </div>                 
        </div>
    );
}

export default InstitutionEdit;