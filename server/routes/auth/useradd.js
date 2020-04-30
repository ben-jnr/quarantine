module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        bcrypt = require('bcryptjs'),
        salt = bcrypt.genSaltSync(10);
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
                            var hash = bcrypt.hashSync(req.body.password, salt);
                            if(req.body.type === 'taluk')
                                data = {username:req.body.username , password:hash, type:req.body.type, taluk:req.body.taluk, creator:session.name};
                            else
                                data = {username:req.body.username , password:hash, type:req.body.type, creator:session.name};    
                            user.insertOne(data,function(err,newUser){
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