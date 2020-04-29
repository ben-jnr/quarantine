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
            institution =quarantine.collection('institution'),
            user = quarantine.collection('user');

        //Route to add an institution
        app.post('/api/institution/add',function(req,res){
            store.get(req.query.id, function(err,session){
                if(err || !session)
                {
                    res.send('connection closed');
                } 
                else if(session)
                {
                    institution.findOne({username:req.body.name},function(err,exists){
                        if(exists){
                            res.send('institution already exists') 
                        }
                        else
                        {
                            user.findOne({username:req.body.name}, function(err, userExists)
                            {
                                if(userExists)
                                    res.send('institution already exists');
                                else
                                {
                                    institution.insertOne(req.body, function(err, newInstitution){
                                        if(err)console.log(err);
                                        else
                                        {
                                            user.insertOne({username:req.body.name, password:'password',
                                            type:'institution' , institutionId:newInstitution.ops[0]._id },function(err, newUser){
                                                if(err)console.log(err);
                                                else
                                                {
                                                    res.send({mssg:"institution successfully added",
                                                        data:newInstitution})
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }) 
                } 
            })       
        })
    })    
}