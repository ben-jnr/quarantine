module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        ObjectId = require('mongodb').ObjectID;
    var store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',
        collection: 'mySessions'
    });
            
    store.on('error', function(err) {
        if(error)
            console.log(error);
    });  
   
    var MongoPool = require("../db/db");
    MongoPool.getInstance(function (db){

        var quarantine = db.db('quarantine'),
            institution =quarantine.collection('institution');

        //Route to delete room
        app.get("/api/rooms/:no/delete/" ,function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {   
                    institution.findOne({_id:ObjectId(req.query.institutionId)},function(err,exists)
                    {
                        if(exists){
                            var rooms = exists.rooms;
                            var newRooms = [];
                            for(var i=0;i<rooms.length;i++){
                                if(parseInt(rooms[i].no) !== parseInt(req.params.no))
                                    newRooms.push(rooms[i]);
                            }
                            institution.updateOne({
                                "_id":ObjectId(req.query.institutionId)
                                },
                                {$set: {
                                    rooms:newRooms,
                                }},function(err,current){
                                    if(err)
                                        console.log(err);
                                    else    
                                        res.send({mssg:"Room Successfully Deleted",
                                                rooms:newRooms});
                                }
                            )
                        }
                    })
                }
            })
        })
    })
}                
        