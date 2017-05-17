var mongoose  = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open",function(){
  console.log("Connection Established");
});

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 var mongourl = 'mongodb://test:test@ds139801.mlab.com:39801/sim';
 mongoose.Promise = global.Promise;
module.exports =  mongoose.connect(mongourl, options);