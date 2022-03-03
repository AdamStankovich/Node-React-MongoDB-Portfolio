const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 443;
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://USERNAME:PASSWORD@MONGODB"; // this line has sensitive information that is removed for opensource
app.use(express.json({
  type: ['application/json', 'text/plain']
}));


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for the built React app running on heroku
app.use(express.static(path.resolve(__dirname, '../client/build')));

// post email/message
app.post('/', function(req, res) { 
  res.set('Access-Control-Allow-Origin', '*'); 
  const body = req.body;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("capstone");
    dbo.collection("messages").insertOne(body, function(err, res) {
      if (err) throw err;
      console.log("1 document sent");
      db.close();
    });
  });
});

// post login credentials
app.post('/Login', function(req, response) { 
  response.set('Access-Control-Allow-Origin', '*'); 
  const body = req.body;
  var username = null;
  var password = null;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("capstone");
    dbo.collection("users").findOne({}, function(err, res) {
      if (err) throw err;
      username = res.username;
      password = res.password;
      if (body.username == username && body.password == password) {
        response.json({
          success : true
        });
      }
      else {
        response.json({
          success : false
        });
      }
      db.close();
    });
  });
});


// admin page msgs get req
app.get('/getmessages', function(req, response) { 
  response.set('Access-Control-Allow-Origin', '*');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("capstone");
    dbo.collection("messages").find({}).toArray(function(err, res) {
      if (err) throw err;
      response.json(res);
      db.close();
    });
  });
});

// admin page logs get req
app.get('/getlogs', function(req, response) { 
  response.set('Access-Control-Allow-Origin', '*');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("capstone");
    dbo.collection("logs").find({}).toArray(function(err, res) {
      if (err) throw err;
      response.json(res);
      db.close();
    });
  });
});

// return all GET requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));

  // capture user information from GET requests
  // browser
  var userAgent = req.header("user-agent");
  //operatingsystem
  var userPlatform = req.header("sec-ch-ua-platform");
  //ip
  var userIP = req.header("x-forwarded-for");
  //time
  var userTime = Date.now();


  // log object to insert into db
  var log = {
    useragent: userAgent,
    platform: userPlatform,
    ip: userIP,
    time: userTime,
  };

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("capstone");
    dbo.collection("logs").insertOne(log, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

