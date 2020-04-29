module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session);
    var store = new MongoDBStore({
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        collection: 'mySessions'
    });
            
    store.on('error', function(error) {
        if(err)
            console.log(error);
    });  
    
    app.use(session({
        secret: 'dasdjklsadhsadsajdalkjdjawioeuwureurbmvxcvxczdsadsadouwuuioeipewpowkasddsadm',
        resave: false,
        saveUninitialized: true,
        store:store,
        cookie: { secure:true, maxAge:1*60*60*1000 },
    }))

    var userCollection = 'user';

    var MongoPool = require("../db/db");
    MongoPool.getInstance(function (db){

        var quarantine = db.db('quarantine'),
            user  = quarantine.collection(userCollection);        
        
        //Route for Login Form
        app.post("/api/login",function(req,res){
            user.findOne({username:req.body.username, password:req.body.password},function(err,currUser){
                if(!currUser)
                {
                    res.send('User does not exist');
                }
                else if(req.query.id)
                {
                    store.get(req.query.id, function(err,session){
                        if(err)
                            console.log(err);
                        else if(!session) 
                        {
                            req.session.type = currUser.type;
                            if(currUser.type === 'institution')
                                req.session.institutionId = currUser.institutionId;
                            if(currUser.type === 'taluk')
                                req.session.taluk = currUser.taluk;    
                            req.session.save(function(err){
                            if(err)
                                console.log(err)
                            })
                        }
                        store.all(function(err,sessions){
                            res.send(sessions[sessions.length-1]._id);
                        })
                    })    
                }                    
            })
        })      
    })  
}