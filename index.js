const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors')
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const dbName = "sharak-v4";
const uri = `mongodb+srv://admin:PASSWORD1!@cluster0.w3gsi.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const port = process.env.PORT || 6800;
const { v4: uuidv4 } = require('uuid');
var ObjectId = require('mongodb').ObjectId;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

  if (err) {
      return console.log(err);
  }


  // Specify database you want to access
  const db = client.db(dbName);
  const usersCollection = db.collection('users');
  usersCollection.createIndex( { "email": 1 }, { unique: true } )



  app.use(cors())
  app.use(express.static(path.join(__dirname, './client/build')));
  app.use(bodyParser.json({limit: '50mb', extended: true}));


  //*** Begin Routes ***//
  app.all((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:6800");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  })
  
  // Beginngin of our routes

  // ================================== Beginning Login Route ==================================
  
  app.post("/api/login", (req, res)=>{
    
    let data = {
      status:null,
      response:null,
      error:null
    }

    const email = req.body.email;
    const password = req.body.password;

    usersCollection.findOne({email:email, password:password}).then(foundUser=>{
      if(foundUser == null){
        data.status = 400;
        res.json(data)
      }
      else{
        data.status = 200;
        data.response = foundUser._id;
        res.json(data)
      }
    }).catch(err=> console.log(err))

  })

  // ================================== End of Login Route ==================================




  // ================================== Beginning Signup Route ==================================

  app.post("/api/signup", (req, res)=>{
    
    let data = {
      status:null,
      response:null,
      error:null
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // check if the user already exists
    usersCollection.findOne({"email":email}).then(foundUser=>{
      if (foundUser == null){
        // then go ahead and create the user
        usersCollection.insertOne(
          {
            "email":email, 
            "username":username, 
            "password":password,
            "userStatus":"NEUTRAL",
            "mealSwipes":14,
            "campusDirhams":500,
            "givingSwipesStatus":false,
            "givingCampusDirhamsStatus":false,
            "outGoingRequests":[],
            "incomingRequests":[]
          }, (error, response)=>{
          if(error) {
            data.status = 400;
            res.json(data)
            console.log("error")
          } 
          else {
            console.log("success")
            data.status = 200;
            let userId = response.ops[0]._id
            data.response = userId
            res.json(data)
          }
        })
      }

      else{
          data.status = 400
          res.json(data)
      }
    })

  })

  // ================================== End of Signup Route ==================================

    // ================================== Beginning get user Route ==================================

    app.get("/api/getUser/:retrievedUserId", (req, res)=>{
    
      let data = {
        status:null,
        response:null,
        error:null
      }
      let retrievedUserId = req.params.retrievedUserId;
      
      if (req.params.retrievedUserId === "null"){
        data.status = 400;
        res.json(data)
      }

      else{
        retrievedUserId = new ObjectId(retrievedUserId); // wrap in ObjectID

        usersCollection.findOne({"_id":retrievedUserId},"-password").then(foundUser=>{
          if (foundUser){
            data.status = 200;
            data.response = foundUser;
            res.json(data)
          }

          else{
            data.status = 400;
            res.json(data)
          }
        })
      }
  
    })
  
    // ================================== End of Get user Route ==================================

    // ================================== Beginning edit user Route ==================================

    app.post("/api/edit", (req, res)=>{
    
      let data = {
        status:null,
        response:null,
        error:null
      }

      let userId = ObjectId(req.body.userId);
      let givingSwipesStatus = req.body.givingSwipesStatus;
      let givingCampusDirhamsStatus = req.body.givingCampusDirhamsStatus;
      let userStatus = req.body.userStatus;



      if (givingSwipesStatus !== undefined){

          usersCollection.updateOne({"_id":userId},{ "$set": { "givingSwipesStatus": givingSwipesStatus }}, (err, resp)=>{
            if (err) throw err;
          })
      
      }

      if (givingCampusDirhamsStatus !== undefined ){
        usersCollection.updateOne({"_id":userId},{ "$set": { "givingCampusDirhamsStatus": givingCampusDirhamsStatus } })
      }
      
      if(userStatus !==undefined){
        usersCollection.updateOne({"_id":userId},{ "$set": { "userStatus": userStatus } })
      }

  
    })
  
    // ================================== End of edit user Route ==================================


// ================================== Beginning system Status route ==================================

    app.get("/api/systemStatus", (req, res)=>{

      let data = {
        status:null,
        response:null,
        error:null
      }

      data.response = {}

      usersCollection.find({"givingSwipesStatus":true}).toArray().then(foundUsers =>{
        data.response["givingSwipes"] = foundUsers;

        usersCollection.find({"givingCampusDirhamsStatus":true}).toArray().then(foundUsers=>{
          data.response["givingCampusDirhams"] = foundUsers;
          data.status = 200;
          res.json(data)
        })
      })
  
    })
  
// ================================== End of system status route ==================================



// ================================== Beginning requesting route ==================================

app.post("/api/sendRequest", (req, res)=>{

  let data = {
    status:null,
    response:null,
    error:null
  }

  data.response = {}

  let requestType = req.body.requestType;
  let requester = req.body.requester;
  let requestee = req.body.requestee;
  let amount = req.body.amount;

  requestee = ObjectId(requestee);

  usersCollection.findOne({"_id":requestee}).then(user=>{
    
    let newRequest = {
      requestType,
      requestee:user.username,
      amount,
      "status":"pending",
      "id":uuidv4()
    }

    // First the foundReuqester
    usersCollection.findOne({"email":requester}).then(foundUser=>{

      newRequest["requester"] = foundUser.username;
      
      // First fill in the outgoing request for the requester
      usersCollection.updateOne({"email":requester},{ "$push": { "outGoingRequests": newRequest }}, (err, foundReuqester)=>{
        if (err) throw err;

        // Secondly fill in incoming requests for the requestee
        usersCollection.updateOne({"_id":requestee},{ "$push": { "incomingRequests": newRequest }}, (err, resp)=>{
          if (err) throw err;
          data.status = 200;
          res.json(data)
        })
    
      })
    })

  })



})

// ================================== End of requesting route ==================================




app.get('/api/getAllRequests/:userId', (req, res) => {

  let data = {
    status:null,
    response:null,
    error:null
  }

  data.response = {}

  let userId = ObjectId(req.params.userId);

  usersCollection.findOne({"_id":userId}).then(foundUser => {
      if (foundUser !== null){         
         data.response["incomingRequests"] = foundUser.incomingRequests;
         data.response["outGoingRequests"] = foundUser.outGoingRequests;
         data.status = 200;

        res.json(data)

      }

      else{
        data.status = 400;
        res.json(data)
      }
  });

})



app.post('/api/respondingToRequest', (req, res) => {

  let data = {
    status:null,
    response:null,
    error:null
  }

  data.response = {}

  let userId = ObjectId(req.body.userId);
  let status = req.body.status;
  let requester = req.body.requester;
  let requestType = req.body.requestType;
  let amount = req.body.amount;
  let requestId = req.body.requestId;

  console.log(status)
  console.log(requestId)

  usersCollection.updateOne({
    "incomingRequests.id":requestId
  },{ "$set": { "incomingRequests.$.status": status }},false ,true);


  usersCollection.updateOne({
    "outGoingRequests.id":requestId
  },{ "$set": { "outGoingRequests.$.status": status }},false ,true);


  // add the money to the requester

  if (requestType=="swipe" && status == "accepted"){
      // subtract the money from requestee

      usersCollection.findOne({"_id":userId}).then(foundUser=>{
        if (foundUser){
          if (foundUser.mealSwipes >= amount){
            usersCollection.updateOne({"_id":userId},{"$inc":{ "mealSwipes":parseInt(-amount)}})
          }
        }
      })

      usersCollection.updateOne({"username":requester},{"$inc":{ "mealSwipes":parseInt(amount)}})

      data.status = 200;
      res.json(data)

  }


  if (requestType =="campus_dirhams" && status == "accepted"){
    usersCollection.updateOne({"_id":userId},{"$set":{}})
    
    usersCollection.findOne({"_id":userId}).then(foundUser=>{
      if (foundUser){
        if (foundUser.campusDirhams >= amount){
          usersCollection.updateOne({"_id":userId},{"$inc":{ "campusDirhams":parseInt(-amount)}})
        }
      }
    })

    usersCollection.updateOne({"username":requester},{"$inc":{ "campusDirhams":parseInt(amount)}})

    data.status = 200;
    res.json(data)

  }

  else{
    data.status = 200;
    res.json(data)
  }



})


  app.post('/test', (req, res) => {
    console.log("here")

    usersCollection.insertOne({username:"k"}, function (error, response) {
        if(error) {
            console.log('Error occurred while inserting');
           // return
        } else {
           console.log('inserted record', response.ops[0]);
          // return
        }
    });

    // usersCollection.update({username:"kev"},
    // {
    //     $set: {
    //         'dirhams': "fileURL"
    //     }
    // })

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
