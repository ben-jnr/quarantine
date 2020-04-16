const express = require('express');
var mongoDbClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 9000;
var ObjectId = require('mongodb').ObjectID;
var cors=require('cors');
app.use(cors());
app.use(express.json());

mongoDbClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, function(err, database) {
   
    //Routes for Query Management
    app.get('/', function(req,res){
    	res.send("HELLO");
    });   

    app.listen(port, function(req,res){
        console.log("Server is Running");
    })

});
