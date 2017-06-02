
module.exports = function(server){

const io   = require('socket.io')(server);

//socket connected
io.on('connection', (socket) => {
  console.log('user connected');

  //socket Disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //private Socket
  socket.on('private message', function(from, msg, time){
        console.log(from, msg, time);
  })
  
  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});    
  });
});

  return io;
};