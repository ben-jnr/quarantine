module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        ObjectId = require('mongodb').ObjectID;
    var store = new MongoDBStore({
        uri: 'mongodb://18.223.108.131:27017/connect_mongodb_session_test',
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
    
        //Route to Delete Institution
        app.get("/api/institution/delete/:institutionId" ,function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session) 
                    res.send('connection closed');
                else if(session)
                {
                    institution.deleteOne({"_id":ObjectId(req.params.institutionId),function(err){
                        if(err)
                            console.log(err)
                        }    
                    });
                    user.deleteOne({"institutionId":ObjectId(req.params.institutionId),function(err){
                        if(err)
                            console.log(err)
                        }    
                    }); 
                }
            })
        })
    })
}               




