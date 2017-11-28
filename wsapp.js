var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
//var ip = '192.168.1.190'
var users = [{"chatusername": "sanjay", "chatsocketid": "nil" },{"chatusername": "sahay", "chatsocketid": "nil" }]
//console.log(users[0].chatsocketid)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
 //io.emit('chat message', "Connected!");


 socket.on('data', function(j){
     try {
        j = JSON.parse(j);
     } catch(e) {
         //console.log("Err in parsing")
     }
     sid_sanjay = users[0].chatsocketid
     if(sid_sanjay!="nil"){
      //console.log(sid_sanjay)
      try {
        io.sockets.sockets[sid_sanjay].emit('data',j);
        } catch(e) {
         // error in the above string (in this case, yes)!
      }
     }   
 });

 socket.on('chat message', function(msg){
    var sid = socket.id
    if (msg.substr(0,1)=="#"){
      username = msg.substr(1,20);
      if (username == "sanjay"){
         users[0].chatsocketid = sid;
         sid_sahay = users[1].chatsocketid
         if(sid_sahay!="nil"){
           //console.log(sid_sanjay)
           io.sockets.sockets[sid_sahay].emit('chat message', msg);
         }    
      }
      if (username == "sahay"){
         users[1].chatsocketid = sid;
         //console.log(users);
      }
    }
   //console.log(users)
   io.emit('chat message', msg);
 });

 socket.on('user', function(msg){
    io.emit('chat message', msg);
    var juser = {}
    juser[name] = msg
    juser[msg] = socket.id
    console.log(aa)
 });


})

http.listen(port, function(){
  //console.log('listening on *:' + port);
});
