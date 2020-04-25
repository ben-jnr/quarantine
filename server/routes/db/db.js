var MongoClient = require('mongodb').MongoClient;

var option = {
    useUnifiedTopology:true
};

function MongoPool(){}
var p_db;

function initPool(cb){
'mongodb://127.0.0.1:27017'
MongoClient.connect('mongodb://127.0.0.1:27017', option, function(err, db) {
    if (err) throw err;
    p_db = db;
    if(cb && typeof(cb) == 'function')
        cb(p_db);
  });
  return MongoPool;
}
MongoPool.initPool = initPool;

function getInstance(cb){
  if(!p_db){
    initPool(cb)
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_db);
  }
}
MongoPool.getInstance = getInstance;

module.exports = MongoPool;