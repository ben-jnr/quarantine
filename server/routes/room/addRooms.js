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

        //Route to add Rooms to an Institution
        app.post("/api/rooms/add",function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    institution.findOne({"_id":ObjectId(req.query.institutionId)},function(err,exists){
                        if(!exists){
                            res.send("Hotel does not Exist"); 
                        }
                        else
                        {
                            var flag=0;
                            var rooms = exists.rooms;
                            var room = req.body;
                            for(var i=0;i<rooms.length;i++)
                            {
                                if(rooms[i].no===room.no)
                                {
                                    flag=1;
                                    break;
                                }    
                            }
                            if(flag===0)
                            {
                                rooms.push(room);
                                institution.updateOne({
                                    "_id":ObjectId(req.query.institutionId)
                                    },
                                    {$set: {
                                        rooms:rooms,
                                    }},function(err,newRoom){
                                        if(err)
                                            console.log(err);
                                        else{
                                                let arr = [];
                                                arr.push(room);
                                                res.send({mssg:"Room Succesfully Added",room:arr});    
                                            }
                                        }
                                )
                            }
                            else
                            {
                                res.send("Room Exists");
                            }            
                                    
                        }
                    })
                }            
            })
        })           
    })
}              
            