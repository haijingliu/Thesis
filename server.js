var io = require('socket.io'),
var connect = require('connect'),
var Twit =reuqire(''),
ws = reuqire('ws'),
net =require('net');





var T = new Twit({

consumer_key:'6SkM9IsTat4QpQX0c52NM1bCg',
consumer_secret:'WLt3Ydd273rEu9ru4KNwScYb4FG37rYddwzA2BmR1YM8vJ4STQ',
access_token:'720038761-sQUahzS4Yi6kXJ0tsJPHRKlP4NuGIAoPvbDBz936',
access_token_secret:'Oe3Sm8AXRsO1pyPo4ZPLpqUUxr8Vkahlj2oaOqw9IzjZK'
	});

//--- websocket to wifly vars ----
var NET_PORT = 9001;
var WS_PORT = 9002;

var sensorData;
var message = {
  "data": ''
}

var newValue,
  oldValue,
  diff; //set variables which holds messages from arduino zPin data

var TWIT_SOCKET; //emit twitt
var LATEST_TWEET;
var tweetCount = 0; //initialize tweet

var app = connect().use(connect.static('public')).listen(3000); 
//runs this node app on port3000, connect holds the client


//----- TWITTER ------
//socket.io 
var twitter_data = io.listen(app);

twitter_data.sockets.on('connection', function (twitter_socket) {
  TWIT_SOCKET = twitter_socket;
  twitter_socket.emit('entrance',  {message: 'Welcome'});
  var stream = T.stream('statuses/filter', { track: 'I WISH' })

  twitter_data.set('log level', 1); /*** uncomment to see all tweets in terminal ,closing debug status***/

  stream.on('tweet', function (tweet) { //tweet has arrived from twitter
    if(tweet.geo){
      LATEST_TWEET = tweet; //set LATEST when it HAS GEO
      tweetCount++;
      console.log("received tweet #"+tweetCount); 
      //twitter_socket.emit('update', tweet);
    }
  }) //twit comes in

  twitter_socket.on('disconnect', function  () {
    twitter_data.sockets.emit('exit', {message: 'Someone has disconnected.'});
  });

});
 
 
//----- netsockets ------
var socket;
var clients = [];
var server = net.createServer(function (socket) {
  socket.name = socket.remoteAddress + ":" + socket.remotePort;
  clients.push(socket);
  socket.write("HTTP/1.1 101", function () {
    console.log('[CONN] New connection: ' + socket.name + ', total clients: ' + clients.length);
  });
  socket.setEncoding('utf8');
  socket.on('error', function (data) {
    console.log(data);
  });
  socket.on('end', function () {
    console.log('[END] Disconnection: ' + socket.name + ', total clients: ' + clients.length);
  });

  socket.on('data', function (data) { //data has come from SENSOR

    console.log('[RECV from ' + socket.remoteAddress + "] " + data);
    oldValue = newValue;
    newValue = data;
    diff = Math.abs(newValue) - Math.abs(oldValue);
    console.log(Math.abs(newValue) + '-' + Math.abs(oldValue));
    message.data = diff;
    console.log('[SAVED] ' + JSON.stringify(message.data));

    if(LATEST_TWEET !== 'undefined' && message.data > 7){
      console.log(">>> SENSOR TRIGGERED TWEET: "+JSON.stringify(LATEST_TWEET));
      TWIT_SOCKET.emit('update', LATEST_TWEET);
    }
  });
});

server.listen(NET_PORT, function () {
  console.log("[INIT] Server running on port", NET_PORT);
});
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: WS_PORT
  });

wss.on('connection', function (ws) {
  // ws.send(JSON.stringify(message));
  setInterval(function () {
    updateXData(ws)
  }, 500); //delay in ms how often you want to receive data from sensor
});


function updateXData(ws) {
  var newMessage = {
    "data": ""
  }
  newMessage.data = message.data
  ws.send(JSON.stringify(newMessage));
}