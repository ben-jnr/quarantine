module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        bcrypt = require('bcryptjs');
    var store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',  // do not change the IP !!!
        collection: 'mySessions'
    });
            
    store.on('error', function(error) {
        if(error)
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
                            user.insertOne(req.body,function(err,newUser){
                                if(err)
                                    console.log(err);
                                    res.send("User successfully added");
                            })
                        }
                        else
                            res.send("User Already Exists")    
                    })    
                }
            })        
        })    
    })
}                
