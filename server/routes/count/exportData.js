const json2csv = require("json2csv").parse;
const fs = require("fs");

var MongoPool = require("../db/db");
MongoPool.getInstance(function (db){
    const quarantine = db.db("quarantine");
    const institutions = quarantine.collection("institution");

    institutions.find().toArray( (err, instList)=>{
        if(err){
            console.log("DB Fetch error. ", err);
            return;
        }

        // Fields: District, Name, Taluk, Constituency, Panchayat, Village, Capacity
        const exportData = [];
        var slNo = 1;
        instList.map( inst=>{
            let row = {
                "Sl No": slNo,
                "Name": inst.name,
                "No of Rooms": inst.rooms.length,
                "No of Beds": getTotalBeds(inst.rooms, 0),
                "Type": inst.type,
                "Panchayath": inst.panchayat,
                "Village": inst.village,
                "Taluk": inst.taluk,
                "Constituency": inst.constituency,
            }
            slNo+=1;
            exportData.push(row);
        })
        const csv = json2csv(exportData);
        fs.writeFile("report.csv", csv, (err)=>{
            if(err)
                console.log("Could not saved");
        });
    });
});

function getTotalBeds(roomsList){
    if(roomsList.length==0)
        return 0;
    let count = 0;
    for(let room of roomsList)
        count += Number(room.beds);
    return count;
}
