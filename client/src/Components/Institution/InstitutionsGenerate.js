import React from 'react';

function InstitutionsGenerate(arr, roomsRedirect, url,readyCount , usableCount, removeInstitutionDecider, reqIndex)
{
    if(reqIndex === -1)
    {
        var institutions = arr.map( (u,index) =>
            <div key={u._id} className="accordion InstitutionsContainer mb-3" id={"accordionExample"+index}>
                <div class="card">
                    <div class="card-header" id={"headingOne"+index}>
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne"+index} aria-expanded="true" aria-controls="collapseOne">
                                {u.name}
                            </button>
                            <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={roomsRedirect.bind(url,"/admin/"+u._id)}>Check Rooms</button>
                        </h2>
                    </div>
                    <div id={"collapseOne"+index} class="collapse" aria-labelledby={"headingOne"+index} data-parent={"#accordionExample"+index}>
                        <div class="card-body">
                            <h5 className="card-title">{u.name}</h5>
                            <h6>Phone : {u.phone}</h6>
                            <h6>Type : {u.type}</h6>
                            <h6>Paid Room : {u.payment}</h6>
                            <h6>Details : {u.paymentDetails}</h6>
                            <h6 className="card-title">Structurally Fit : {u.fit}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                            <button type="button" class="btn btn-secondary mr-3 mb-2">
                                Rooms <button class="btn btn-light roomBadge">{u.rooms.length}</button>
                            </button>
                            <button type="button" class="btn btn-warning mr-3 mb-2">
                                Ready <button class="btn btn-light roomBadge">{readyCount(u.rooms)}</button>
                            </button>
                            <button type="button" class="btn btn-success mr-3 mb-2">
                                Usable <button class="btn btn-light roomBadge">{usableCount(u.rooms)}</button>
                            </button>   
                                {removeInstitutionDecider(u._id)}
                                <a href={'/admin/' + u._id + '/edit/'} className="btn btn-primary  mt-2 ml-2 float-right editbtn"><button>Edit</button></a>
                        </div>

                    </div>  
                </div>
                </div>
        );
    }
    else
    {
        var institutions = arr.map(u =>
            <div key={u._id} className="accordion InstitutionsContainer mb-3" id={"accordionExample"+reqIndex}>
                <div class="card">
                    <div class="card-header" id={"headingOne"+reqIndex}>
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne"+reqIndex} aria-expanded="true" aria-controls="collapseOne">
                                {u.name}
                            </button>
                            <button className="btn btn-primary  mt-2 ml-2 float-right" onClick={roomsRedirect.bind(url,"/admin/"+u._id)}>Check Rooms</button>
                        </h2>
                    </div>
                    <div id={"collapseOne"+reqIndex} class="collapse" aria-labelledby={"headingOne"+reqIndex} data-parent={"#accordionExample"+reqIndex}>
                        <div class="card-body">
                            <h5 className="card-title">{u.name}</h5>
                            <h6 className="card-title">Phone : {u.phone}</h6>
                            <h6>Type : {u.type}</h6>
                            <h6>Paid Room : {u.payment}</h6>
                            <h6>Details : {u.paymentDetails}</h6>
                            <h6 className="card-title">Structurally Fit : {u.fit}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{u.district}</h6>
                            <button type="button" class="btn btn-secondary mr-3 mb-2">
                                Total Rooms <button class="btn btn-light roomBadge">{u.rooms.length}</button>
                            </button>
                            <button type="button" class="btn btn-warning mr-3 mb-2">
                                    Ready <button class="btn btn-light roomBadge">{readyCount(u.rooms)}</button>
                            </button>
                            <button type="button" class="btn btn-success mr-3 mb-2">
                                    Usable <button class="btn btn-light roomBadge">{usableCount(u.rooms)}</button>
                            </button>
                            <div>
                                <a className='editbtn' href = {'/admin/'+u._id+'/edit/'}><button className="btn btn-primary  mt-2 ml-2 float-right ">Edit</button></a>
                                {removeInstitutionDecider(u._id)}
                            </div>    
                        </div>  
                    </div>
                </div>
            </div>
        );
    }    
    return(institutions);
}            

export default InstitutionsGenerate;