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

        //Route to read sngle Room in an Institution

        app.get('/api/rooms/:no',function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    let flag =0;
                    institution.findOne({'_id':ObjectId(req.query.institutionId)} , function(err, exists){
                        if(exists)
                        {
                            for(var i = 0;i<exists.rooms.length;i++)
                            {

                                if(exists.rooms[i].no === req.params.no)
                                {
                                    res.send(exists.rooms[i]);
                                    flag=1;
                                    break;
                                }
                            }
                            if(flag ===0)
                            {
                                res.send("Room not found");
                            }
                        }
                        else
                        {
                            res.send('Room not Found');
                        }
                    })
                }
            })        
        })
    })
}        