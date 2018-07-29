var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var sd = require('silly-datetime');
var os = require('os');
const gauge = require('cpu-gauge');
var cpu = gauge.start();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/F2.html');
});

app.get('/jquery.js', function(req, res){
  console.log(1)
  res.sendFile(__dirname + '/jquery.js');

});

app.get('/socket.io.js', function(req, res){
  console.log(1)
  res.sendFile(__dirname + '/socket.io.js');

});

function sum (m,n){
  　　var num = Math.floor(Math.random()*(m - n) + n);
  　　return num
  }


  
msg={
  time: '',
  FreeMem: 0,
  load: 0
}

  io.on('connection', function(socket){
setInterval(function(){
  msg.FreeMem =Math.floor((1-os.freemem()/os.totalmem())*100)
  msg.load = Math.floor(cpu.usage().percent*100)
  msg.time = sd.format(new Date(), 'HH:mm:ss');
  console.log(msg)
  socket.emit('chat message',msg);
},3000)

  });


// var dataNum =  [0,0,0];

// io.on('connection', function(socket){
//  console.log('connected')
    
//  setInterval(function(){
//   dataNum[0] = sum(1,40)
//   dataNum[1] = sum(1,40)
//   dataNum[2] = 100-(dataNum[0]+dataNum[1])
//   socket.emit('chat message',dataNum);
//   console.log(dataNum)
// }, 3000);
//});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
