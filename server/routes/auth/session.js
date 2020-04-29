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

    //Route to check if a session exists
    app.get('/api/',function(req,res){
        if(req.query.id === "User does not exist")
        {
            res.send(req.query.id);
        }
        else
        {
            store.get(req.query.id, function(err,session){
            if(err)
                console.log(err);
            else if(session)
            {
                if(session.type==='institution')
                    res.send({type:session.type, id:session.institutionId, taluk:""})
                else if(session.type === 'taluk')
                    res.send({type:session.type, id:"", taluk:session.taluk})    
                else
                    res.send({type:session.type, id:"", taluk:""})
            }
            else
                res.send("User does not exist");            
            })
        } 
    })     

        
    //Route to Delete Session
    app.get('/api/delsession',function(req,res){
        store.destroy(req.query.id, function(err){
        if(err)
            console.log(err);
        })
    })
}    