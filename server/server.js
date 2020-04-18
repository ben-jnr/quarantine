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
       institution = quarantine.collection('institution'),
       room = quarantine.collection('room');  

        

    //Route to read all Institutions
    app.get("/admin/institution",function(req,res){
        institution.find().sort({'_id':-1}).toArray(function(err,institutions){
            if(err)
                res.send(err);
            else
                res.send(institutions);    
            })
    });    
          

    
    //Route to Add new Institution
    app.post("/admin/institution",function(req,res){
        institution.findOne({name:req.body.name, district:req.body.district},function(err,exists){
            if(exists == null){
                institution.insertOne({name:req.body.name,
                                        district:req.body.district},function(err, currInstitution){
                    res.send({mssg:"Institution Succesfully Added",
                            current:currInstitution
                    });
                })
            }
            else
                res.send("Institution Already Exist");
        })
        institution.findOne({name:req.body.name},function(err,exists){});
    });       



    //Route to Delete Institution
    app.get("/admin/institution/delete/:id" ,function(req,res){
        institution.deleteOne({"_id":ObjectId(req.params.id)});
        })

    


    //Route to add new user 
    app.post("/admin/useradd",function(req,res){
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
    app.post("/login",function(req,res){
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
