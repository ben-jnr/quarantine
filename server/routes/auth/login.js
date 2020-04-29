module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session);
    var store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',  // do not change the IP !!!
        collection: 'mySessions'
    });
            
<<<<<<< HEAD
    store.on('error', function(err) {
        if(err)
            console.log(err);
=======
    store.on('error', function(error) {
        if(error)
            console.log(error);
>>>>>>> d8d71a502bcf2e0220d33353c0a3ce74f83e3c1a
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