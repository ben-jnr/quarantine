module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session);
    var store = new MongoDBStore({
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        collection: 'mySessions'
    });
            
    store.on('error', function(error) {
        if(err)
            console.log(error);
    });  

    
    var MongoPool = require("../db/db");
    MongoPool.getInstance(function (db){

        var quarantine = db.db('quarantine'),
            user  = quarantine.collection('user'),
            institution =quarantine.collection('institution');
    
        //Route to add new user 
        app.post("/api/useradd",function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session) 
                    res.send('connection closed');
                else if(session)
                {
                    user.findOne({username:req.body.username},function(err,exists){
                        if(!exists){
                            if(req.body.type === 'institution')
                            {
                                institution.findOne({name:req.body.institution, district:req.body.district},function(error,exists){
                                    if(exists)
                                        res.send("Institution Exists");
                                    else
                                    {
                                        var rooms=[];
                                        for(var i=1;i<=req.body.no;i++)
                                        {
                                            var roomData = {no:i , status:"no", name:"" }
                                            rooms.push(roomData);
                                        }
                                        institution.insertOne({ name:req.body.institution,
                                                                district:req.body.district,
                                                                rooms:rooms
                                                                },function(err, currInstitution){
                                            if(err)
                                                console.log(err);
                                            user.insertOne({username:req.body.username,
                                                            password:req.body.password,
                                                            type:req.body.type,
                                                            institutionId:currInstitution.ops[0]._id
                                                        },function(err,newUser){
                                                            if(err)
                                                                console.log(err);
                                                            res.send("User successfully added")
                                                        })
                                        })
                                    }    
                                })
                            }
                            else
                            {
                                user.insertOne(req.body,function(err,newUser){
                                    if(err)
                                        console.log(err);
                                    res.send("User successfully added");
                                })
                            }    
                        }
                        else
                            res.send("User Already Exists")    
                    })
                }
            })        
        })    
    })
}                