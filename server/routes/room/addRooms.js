module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        ObjectId = require('mongodb').ObjectID;
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
                            var rooms = exists.rooms;
                            var flag=0;
                            index = -1;
                            if(req.body.no < rooms[0].no)
                            {
                                index = -1;
                            }
                            else if(parseInt(req.body.no) > parseInt(rooms[rooms.length-1].no))
                            {
                                index = rooms.length;
                            }
                            else
                            {
                                for(var i=0;i<rooms.length;i++){
                                    console.log(rooms[i].no);
                                    if(rooms[i].no === req.body.no)
                                    {
                                        flag=1;
                                        break;
                                    }
                                    else if(parseInt(req.body.no) > parseInt(rooms[i].no) && 
                                                parseInt(req.body.no)< parseInt(rooms[i+1].no)){
                                        index=i+1;
                                        break;
                                    }   
                                }
                            }    
                            if(flag===0 && index>0)
                            {
                                rooms.splice(index , 0, req.body);
                                institution
                                institution.updateOne({
                                                "_id":ObjectId(req.query.institutionId)
                                                },
                                                {$set: {
                                                    rooms:rooms,
                                                }},function(err,newRoom){
                                                    if(err)
                                                        console.log(err);
                                                    else{
                                                        res.send("Room Succesfully Added");
                                                    }    
                                                })
                            }
                            else if(flag === 1)
                            {
                                res.send("Room Already Exists");
                            }    
                            else
                            {
                                res.send("Invalid Room No")
                            }
                        }
                    })
                }            
            })
        })           
    })
}              
            