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

        //Route to read a single institution
        app.get("/api/institution/view",function(req,res){ 
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    institution.findOne({_id:ObjectId(req.query.institutionId)},function(err,institution){
                        if(err)
                            console.log('singleInstitution :'+err);
                        if(!institution)
                            console.log('singleInstitution : institution doesnt exist')
                        else    
                            res.send(institution);    
                    })   
                }        
            });
        })
    })
}            