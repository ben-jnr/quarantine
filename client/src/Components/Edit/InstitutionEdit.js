import React, {useState, useEffect} from 'react';
import axios from 'axios';

function InstitutionEdit(props) {
        
    const defaultInstitution = {name:"", type:"" , taluk:"", village:"", constituency:"", panchayat:"", 
        priority:0, fit:"",payment:"", paymentDetails:"", phone:""};
    const [newInstitution , setNewInstitution] = useState(defaultInstitution);
    const institutionId = window.location.pathname.split('/')[2];

    
    const handleChange=(e)=>{
        if(e.target.name === 'priority' )
        {
            if(e.target.value < 0 || e.target.value === 0 || e.target.value === '')
                setNewInstitution({...newInstitution, priority:0})
            else
                setNewInstitution({...newInstitution, [e.target.name]:e.target.value});        
        }
        else{
            setNewInstitution({...newInstitution, [e.target.name]:e.target.value}); 
        }           
    }


    useEffect(()=>{
        var url = 'http://localhost:9000/api/institution/view?id='+window.localStorage.getItem('session')+
                '&institutionId='+institutionId;
        axios.get(url)
        .then(res=>{
            if(typeof(res.data) === 'string')
            {
                if(res.data === 'connection closed')
                {
                    alert("connection closed");
                    window.location.replace('/');
                }
                else
                {
                    console.log(res.data)
                }
            }
            setNewInstitution(res.data);
            document.getElementById('instNameEdit').value = res.data.name;
            if(res.data.phone === undefined)
                document.getElementById('instPhoneEdit').value = "";
            else
                document.getElementById('instPhoneEdit').value = res.data.phone; 
            if(res.data.paymentDetails ===undefined)
                document.getElementById('paymentDetailsEdit').value = "";
            else
                document.getElementById('paymentDetailsEdit').value = res.data.paymentDetails;    
            document.getElementById('priorityEdit').value = res.data.priority;
            if(res.data.type === 'hotel/lodge')
                document.getElementById('type1Edit').checked = true;
            else if(res.data.type === 'hostel')
                document.getElementById('type2Edit').checked = true;
            else if(res.data.type === 'educational institution')
                document.getElementById('type3Edit').checked = true;
            else if(res.data.type === 'hospital building')
                document.getElementById('type4Edit').checked = true;
            else if(res.data.type === 'resort')
                document.getElementById('type5Edit').checked = true;
            else if(res.data.type === 'other')
                document.getElementById('type6Edit').checked = true;
            if(res.data.fit === 'yes')
                document.getElementById('sfit1Edit').checked = true;
            else if(res.data.fit === 'no')
                document.getElementById('sfit2Edit').checked = true;
            if(res.data.payment === 'yes')
                document.getElementById('payment1Edit').checked = true;
            else if(res.data.payment === 'no')
                document.getElementById('payment2Edit').checked = true;                 
        })
        .catch(err=>console.log(err));        
    },[]);



    const handleSubmit =(e)=>{
        e.preventDefault();
        document.getElementById('instEditMssg').innerHTML = '';
        if(window.confirm("Are you sure?"))
        {
            if(newInstitution.name !== "" && newInstitution.type !="" && newInstitution.taluk !== "" 
                && newInstitution.village !=="" && newInstitution.constituency !="" 
                && newInstitution.panchayat != "" && newInstitution.fit!=='')
            {
                var config = {  headers: {'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true}};
                var url = 'http://localhost:9000/api/institution/edit?institutionId=' + institutionId 
                    +'&id='+window.localStorage.getItem('session');
                axios.post(url, newInstitution ,config)
                .then(res => {
                    if(res.data === 'connection closed')
                    {
                        alert('connection closed');
                        window.location.pathname.replace('/');
                    }
                    window.location.replace('/admin')
                })
                .catch(err =>console.log(err));
            }
            else{
                document.getElementById('instEditMssg').innerHTML = 'Empty Fields Present';
            }
        }
    }    




    return (
        <div className="inst-only container">
            <div className="col-lg-8 col-md-8 container">
                <div className="instType ml-3 mb-2">
                    <a href='/admin'><button className="btn btn-primary btn-block mt-3 mb-4">Back</button></a>
                    <div class="form-group col">
                        <label for="instNameEdit">Institution Name</label>
                        <input type="text" name="name" class="form-control" id="instNameEdit" placeholder="Name of institution" onChange={handleChange}/>
                    </div>
                    <div class="form-group col">
                        <label for="instPhoneEdit">Phone</label>
                        <input type="text" name="phone" class="form-control" id="instPhoneEdit" placeholder="Contact no of institution" onChange={handleChange}/>
                    </div>
                    <div className="inst-type mb-2">
                        <h6>Institution Type?</h6>
                        <div className="row">
                            <div className="col-lg-3 col-4">
                                <div className="form-row"> 
                                    <div class="custom-control custom-radio ml-4">
                                        <input type="radio" id="type5Edit" name="type" value="resort" onChange={handleChange} class="custom-control-input"/>
                                        <label class="custom-control-label" for="type5Edit">Resort</label>
                                    </div>
                                    <div class="custom-control custom-radio ml-4">
                                        <input type="radio" id="type2Edit" name="type" value="hostel" onChange={handleChange} class="custom-control-input"/>
                                        <label class="custom-control-label" for="type2Edit">Hostel</label>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-lg-4">
                                <div className="form-row"> 
                                    <div class="custom-control custom-radio ml-4">
                                        <input type="radio" id="type1Edit" name="type" value="hotel/lodge" onChange={handleChange} class="custom-control-input"/>
                                        <label class="custom-control-label" for="type1Edit">Hotel/Lodge</label>
                                    </div>
                                    <div class="custom-control custom-radio ml-4">
                                        <input type="radio" id="type4Edit" name="type" value="hospital building" onChange={handleChange} class="custom-control-input"/>
                                        <label class="custom-control-label" for="type4Edit">Hospital Building</label>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-lg-4">
                                <div className="form-row"> 
                                    <div class="custom-control custom-radio ml-4">
                                        <input type="radio" id="type3Edit" name="type" value="educational institution" onChange={handleChange} class="custom-control-input"/>
                                        <label class="custom-control-label" for="type3Edit">Educational Institution</label>
                                    </div>
                                    <div class="custom-control custom-radio ml-4">
                                        <input type="radio" id="type6Edit" name="type" value="other" onChange={handleChange} class="custom-control-input"/>
                                        <label class="custom-control-label" for="type6Edit">Other</label>
                                    </div>
                                </div>
                            </div>       
                        </div>                        
                    </div>
                    <div class="form-group col">
                        <label for="priorityEdit">Priority</label>
                        <input type="number" name="priority" class="form-control" id="priorityEdit" placeholder="priority" onChange={handleChange}/>
                    </div>
                    <hr/>
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
                    <hr/>
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
                            <textarea id='paymentDetailsEdit' name='paymentDetails' style={{borderRadius:'5px'}} placeholder= 'Enter Payment details (if any)' class="form-control" onChange={handleChange}></textarea>
                        </div>
                    </div>     
                </div> 
            <div className="float-right mr-4 mt-3 mb-4"> 
            <button className = 'btn btn-primary btn-lg sm-btn-block' onClick={handleSubmit}>Edit</button>                
            </div>
            <div id="instEditMssg"></div>
        </div>
    </div>    
    );
}

export default InstitutionEdit;