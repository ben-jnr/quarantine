module.exports = function(app)
{
    const session = require('express-session'),
        MongoDBStore = require('connect-mongodb-session')(session),
        bcrypt = require('bcryptjs'),
        salt = bcrypt.genSaltSync(10);
    var store = new MongoDBStore({
	 uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',  // do not change the IP !!!
        collection: 'mySessions'
    });
            
    store.on('error', function(error) {
        if(error)
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
            console.log("Request: Login");
            user.findOne({username:req.body.username},function(err,currUser){
                console.log("Login: currUser ", currUser, " err ", err);
                if(currUser)
                {
                    if(bcrypt.compareSync(req.body.password, currUser.password))
                    {
                        if(req.query.id)
                        {
                            store.get(req.query.id, function(err,session){
                                if(err)
                                {
                                    console.log(err);
                                    res.send('Invalid Credentials');
                                }    
                                else if(!session) 
                                {
                                    req.session.type = currUser.type;
                                    req.session.name = currUser.username;
                                    if(currUser.type === 'institution')
                                        req.session.institutionId = currUser.institutionId;
                                    if(currUser.type === 'taluk')
                                        req.session.taluk = currUser.taluk;    
                                    req.session.save(function(err){
                                    if(err)
                                    {
                                        console.log(err)
                                        res.send('Invalid Credentials');
                                    }
                                    })
                                }
                                store.all(function(err,sessions){
                                    if(err)
                                    {
                                        console.log(err);
                                        res.send('Invalid Credentials');
                                    }    
                                    res.send(sessions[sessions.length-1]._id);
                                })
                            })    
                        }
                        else{
                            console.log("Login: query.id not found");
                        }                 
                    }
                    else
                    {
                        console.log("Login: invalid password, curr user", currUser);
                        res.send('Invalid Credentials');
                    }
                }
                else
                {
                    console.log("Login: invalid username");
                    res.send('Invalid Credentials');
                }
            })
        })      
    })  
}
