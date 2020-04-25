const   express = require('express'),
        app = express(),
        port = process.env.PORT || 9000,
        ObjectId = require('mongodb').ObjectID,
        cors=require('cors');
require("./routes/db/db").initPool();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes/auth/login')(app);
require('./routes/auth/session')(app);
require('./routes/auth/useradd')(app);
require('./routes/institution/allInstitutions')(app);
require('./routes/institution/delInstitution')(app);


var MongoPool = require("./routes/db/db");
MongoPool.getInstance(function (db){
var quarantine = db.db('quarantine'),
    user=quarantine.collection('user'),
    institution = quarantine.collection('institution'); 

    
        

    

    //route to add new Room
    app.post("/api/:name/:district",function(req,res){
        institution.findOne({name:req.params.name, district:req.params.district},function(err,exists){
            if(!exists){
                res.send({mssg:"Hotel does not Exist"}); 
            }
            else{
                var rooms = exists.rooms;
                var flag=0;
                for(var i=0;i<rooms.length;i++){
                    if(rooms[i].no === req.body.no && rooms[i].floor == req.body.floor)
                    {
                        flag=1;
                        break;
                    }   
                }
                if(flag===0)
                {
                    rooms.push(req.body);
                    rooms.sort((a, b) => (a.floor > b.floor) ? 1 : (a.floor === b.floor) ? ((a.no > b.no) ? 1 : -1) : -1 );
                    institution.updateOne({
                                    name:req.params.name,
                                    district:req.params.district
                                    },
                                    {$set: {
                                        rooms:rooms,
                                    }},function(err,newRoom){
                                        if(err)
                                            console.log(err);
                                        else    
                                            res.send({mssg:"Room Successfully Added",
                                                    rooms:rooms});
                                    })
                }
                else
                {
                    res.send({mssg:"Room Already Exists"});
                }    
            }
        })           
    });          



    //Route to read all rooms
    app.get("/api/:name/:district",function(req,res){
        institution.findOne({name:req.params.name, district:req.params.district},function(err,exists){
            if(!exists){
                res.send({mssg:"failed"});
            }
            else{
                exists.rooms.sort((a, b) => (a.floor > b.floor) ? 1 : (a.floor === b.floor) ? ((a.no > b.no) ? 1 : -1) : -1 );
                res.send({mssg:"success", rooms:(exists.rooms)});
            }    
        })    
    })




    //Route to delete room
    app.get("/api/:name/:district/:no/:floor/delete/" ,function(req,res){
        institution.findOne({name:req.params.name, district:req.params.district},function(err,exists)
        {
            if(exists){
                var rooms = exists.rooms;
                var newRooms = [];
                for(var i=0;i<rooms.length;i++){
                    if(rooms[i].no !== req.params.no || rooms[i].floor !== req.params.floor)
                            newRooms.push(rooms[i]);
                }
                institution.updateOne({
                    name:req.params.name,
                    district:req.params.district
                    },
                    {$set: {
                        rooms:newRooms,
                    }},function(err,current){
                        if(err)
                            console.log(err);
                        else    
                            res.send({mssg:"Room Successfully Deleted",
                                    rooms:newRooms});
                    })
            }
        })
    })



    //Route to read Inmate and returns the particular room
    app.get("/api/:name/:district/:no/:floor/patient",function(req,res){
        institution.findOne({name:req.params.name, district:req.params.district} , function(err,exists){
            if(exists)
            {
                var room ={};
                var flag = 0;
                rooms = exists.rooms;
                for(var i=0;i<rooms.length;i++)
                {                    
                    if((rooms[i].no === req.params.no) && (rooms[i].floor === req.params.floor))
                    {
                        flag=1;
                        room = rooms[i];
                        break;
                    }
                }   
                if(flag === 1)
                {
                    res.send({mssg:"Room Found" , room:room});
                }
                else{
                    res.send({mssg:"Room Not Found"});    
                }    
            }
            else
            {
                res.send({mssg:"Institution Doesnt Exist"})
            }
        })
    })


    //Route to add new inmate
    app.post("/api/:name/:district/:no/:floor/",function(req,res){
        institution.findOne({name:req.params.name , district:req.params.district},function(err,exists){
            console.log(req.body);
            if(exists){
                var flag = 0;
                rooms=exists.rooms;
                for(var i=0;i<rooms.length;i++)
                {
                    if(rooms[i].no === req.params.no && rooms[i].floor === req.params.floor )
                    {
                        flag=1;
                        rooms[i].name = req.body.name;
                        rooms[i].age = req.body.age;
                        rooms[i].phn = req.body.phn;
                        rooms[i].address = req.body.address;
                        rooms[i].curr = req.body.curr;
                        rooms[i].prev = req.body.prev;
                        rooms[i].status = req.body.status
                        break;        
                    }
                }
                if(flag === 1){
                    institution.updateOne({name:req.params.name , district:req.params.district},
                                            {
                                                $set :{
                                                    rooms : rooms
                                                }
                                            },function(err,current){
                                                if(err)
                                                    console.log(err);
                                                else
                                                    res.send('Inmate Added');   
                                            });
                }
                else if(flag === 0){
                    res.send("Room Not Found")
                }
                
            }
            else{
                res.send("Institution doesnt exist");
            }
        })
    })


    app.listen(port, function(req,res){
        console.log("Server is Running");
    })

});
