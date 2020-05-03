module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session);
    const store = new MongoDBStore({
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

        //route to get Taluk and LAC wise Count
        
        app.get('/api/count', function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    var count = {}; 
                    institution.find().toArray(function(err,inst){
                        if(err)
                            console.log(err);
                        else
                        {
                            if(req.query.choice !='')
                            {    
                                for(var i=0;i<inst.length;i++)
                                {
                                    var roomsCount = 0, readyRooms = 0, usableRooms =0, bedsCount = 0, readyBeds=0, usableBeds=0;
                                    roomsCount = inst[i].rooms.length;
                                    for(var j =0; j<roomsCount;j++)
                                    {
                                        bedsCount = bedsCount + parseInt(inst[i].rooms[j].beds);     
                                        if(inst[i].rooms[j].ready === 'yes')
                                        {
                                            readyRooms++;
                                            readyBeds = readyBeds + parseInt(inst[i].rooms[j].beds);
                                        }
                                        if(inst[i].rooms[j].ready === 'yes' && inst[i].rooms[j].status === 'no')
                                        {
                                            usableRooms++;
                                            usableBeds = usableBeds + parseInt(inst[i].rooms[j].beds);
                                        }    
                                    } 
                                    if(count[inst[i][req.query.choice]])
                                    {
                                        count[inst[i][req.query.choice]] = [count[inst[i][req.query.choice]][0]+1 , count[inst[i][req.query.choice]][1]+roomsCount, 
                                                count[inst[i][req.query.choice]][2]+readyRooms, count[inst[i][req.query.choice]][3]+usableRooms
                                                ,count[inst[i][req.query.choice]][4]+bedsCount, count[inst[i][req.query.choice]][5]+readyBeds, 
                                                count[inst[i][req.query.choice]][6]+usableBeds];
                                    }
                                    else
                                        count[inst[i][req.query.choice]]= [1, roomsCount, readyRooms, usableRooms, 
                                            bedsCount, readyBeds, usableBeds];        
                                }
                            }    
                            res.send(count);   
                        }    
                    });
                }          
            })    
        })
    })
}   