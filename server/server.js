const express = require('express');
var mongoDbClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 9000;
var ObjectId = require('mongodb').ObjectID;
var cors=require('cors');
app.use(cors());
app.use(express.json());

mongoDbClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, function(err, database) {
   var quarantine = database.db('quarantine'),
       user  = quarantine.collection('user'),
       institution = quarantine.collection('institution'); 


    //Route to read all Institutions
    app.get("/api/institution",function(req,res){
        institution.find({district:req.query.location}).sort({'_id':-1}).toArray(function(err,institutions){
            if(err)
                res.send(err);
            else
                res.send(institutions);    
            })
    });    
          

    
    //Route to Add new Institution
    app.post("/api/institution",function(req,res){
        institution.findOne({name:req.body.name, district:req.body.district},function(err,exists){
            if(exists == null){
                institution.insertOne({name:req.body.name,
                                        district:req.body.district,
                                        rooms:[]
                                    },function(err, currInstitution){
                    res.send({mssg:"Institution Succesfully Added",
                            current:currInstitution
                    });
                })
            }
            else
                res.send("Institution Already Exist");    
        })
    });       



    //Route to Delete Institution
    app.get("/api/institution/delete/:id" ,function(req,res){
        institution.deleteOne({"_id":ObjectId(req.params.id)});
    })

    

    //route to add new Room
    app.post("/api/:name/:district",function(req,res){
        institution.findOne({name:req.params.name, district:req.params.district},function(err,exists){
            if(exists == null){
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
            if(exists == null){
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
            if(exists !== null){
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
            if(exists != null)
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
            if(exists !== null){
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


    //Route to add new user 
    app.post("/api/useradd",function(req,res){
        user.findOne({username:req.body.username},function(err,exists){
            if(exists == null){
                user.insertOne(req.body,function(err,newUser){
                    res.send("User sucessfully added");
                })
            }
            else
                res.send("User Already Exists")    
        })
    })

    

    //Route for Login Form
    app.post("/api/login",function(req,res){
        user.findOne({username:req.body.username, password:req.body.password},function(err,currUser){
            if(currUser == null)
                res.send("null"); 
            else if(currUser.admin ==='y')
                res.send({admin:"y",name:currUser.username});
            else
                res.send({admin:"n", name:currUser.username});             
        })
    });

    app.listen(port, function(req,res){
        console.log("Server is Running");
    })

});
