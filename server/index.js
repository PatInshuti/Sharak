const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors')
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const dbName = "sharak-v1";
const port = 6800;


MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

  if (err) {
      return console.log(err);
  }


  // Specify database you want to access
  const db = client.db(dbName);
  const usersCollection = db.collection('users');

  app.use(cors())
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(bodyParser.json({limit: '50mb', extended: true}));


  //*** Begin Routes ***//
  app.all((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:6800");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  })


  app.post('/test', (req, res) => {
    console.log("here")

    //
    usersCollection.insertOne({username:""}, function (error, response) {
        if(error) {
            console.log('Error occurred while inserting');
           // return
        } else {
           console.log('inserted record', response.ops[0]);
          // return
        }
    });

    usersCollection.update({username:"kev"},
    {
        $set: {
            'dirhams': "fileURL"
        }
    })

  })

  // Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Sharak server running at http://localhost:${port}`);
    console.log(`MongoDB Connected: ${uri}`);
  })

});
