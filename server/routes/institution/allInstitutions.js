module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        ObjectId = require('mongodb').ObjectID;
    var store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',
        collection: 'mySessions'
    });
            
    store.on('error', function(error) {
        if(error)
            console.log(error);
    });  

    
    var MongoPool = require("../db/db");
    MongoPool.getInstance(function (db){

        var quarantine = db.db('quarantine'),
            institution =quarantine.collection('institution');

        //Route to read all Institutions
        app.get("/api/institution",function(req,res){ 
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    if(req.query.institutionId === "")
                    {
                        institution.find({taluk:req.query.taluk, village:req.query.village}).sort({'_id':-1}).toArray(function(err,institutions){
                            if(err)
                                res.send(err);
                            else
                                res.send(institutions);    
                        })
                    }
                    else
                    {
                        institution.find({_id:ObjectId(req.query.institutionId)}).sort({'_id':-1}).toArray(function(err,institutions){
                            if(err)
                                res.send(err);
                            else
                                res.send(institutions);    
                        })
                    }    
                }        
            });
        })
    })
}            