module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        ObjectId = require('mongodb').ObjectID;
    var store = new MongoDBStore({
        uri: 'mongodb://18.223.108.131:27017/connect_mongodb_session_test',
        collection: 'mySessions'
    });
            
    store.on('error', function(err) {
        if(err)
            console.log(err);
    });  

    
    var MongoPool = require("../db/db");
    MongoPool.getInstance(function (db){

        var quarantine = db.db('quarantine'),
            institution =quarantine.collection('institution');

        //Route to read all Rooms in an Institution
        app.get("/api/rooms",function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    institution.findOne({"_id":ObjectId(req.query.institutionId)},function(err,exists){
                        if(err)
                            console.log(err);
                        else if(!exists){
                            res.send("No such Institution");
                        }
                        else{
                            res.send((exists.rooms));
                        }    
                    })
                }        
            })
        })
    })    
}    