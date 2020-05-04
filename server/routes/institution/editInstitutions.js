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
        
        //Route to edit institution info

        app.post('/api/institution/edit',function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    console.log('editInstitutions : session does not exist');
                    res.send('connection closed');
                } 
                else if(session)
                {
                    institution.findOne({'_id':ObjectId(req.query.institutionId)},function(err,exists){  
                        if(err)
                        {
                            console.log('editInstitution :'+err);
                        }
                        else
                        {    
                            if(!exists)
                            {
                                console.log("editInstitutions : Institution does not exist");
                                res.send('Institution does not exist')
                            }
                            else
                            {
                                institution.updateOne({
                                    "_id":ObjectId(req.query.institutionId)},
                                    {$set: {
                                        rooms:tempRooms,
                                    }},function(err,newRoom){
                                        if(err)
                                        {
                                            console.log('editInstitutions :'+err);
                                        }
                                        else
                                        {
                                            console.log('editInstitutions : Room Successfully Updated');
                                            res.send("Room Successfully Updated")
                                        }
                                        }
                                )
                            }
                        }    
                    })
                }
            })
        })
    })
}                    