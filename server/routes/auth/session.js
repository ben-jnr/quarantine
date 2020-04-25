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
                    res.send({type:session.type, id:session.institutionId})
                else
                    res.send({type:session.type, id:""})
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