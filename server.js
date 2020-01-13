// Requires Socket.io and MongoDB to be installed.
const io = require('socket.io')(3000)
console.log('[Server running on port 3000]')
var MongoClient = require('mongodb').MongoClient;
const users ={}

//create db
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//create collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("messages", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });

// Inserts name, received from socket in variable.
io.on('connection', socket => {
    socket.on('new-user', name =>{
        users[socket.id] = name
    })

      // Broadcast to all other clients
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message', { message: message, name: users [socket.id] })

        //insterts message into collection
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myobj = { message: message};
            dbo.collection("customers").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
    })
})