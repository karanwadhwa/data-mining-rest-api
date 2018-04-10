const mongoose = require('mongoose');
const express = require('express');

const constants = require('./constants');

const app = express();

// db connection
mongoose.connect(`mongodb://${constants.DB_USER}:${constants.DB_PASSWORD}@ds223019.mlab.com:23019/${constants.DB_NAME}`);
const db = mongoose.connection;

//Models
let Blob = require('./models/blob');

// Check db connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});


// express routes
app.get('/', (req, res) => {
  res.send('TATTI');
});

// blob route - gets all data from blob collection
app.get('/api/blob', function(req, res,next){
  Blob.find({}, function(err, data){
    if(err){
      console.log(err);
    }else{
      res.json(data);
    }
  });
});

app.get('/api/reg=:reg', function(req, res,next){
  Blob.findOne({ "Registration No": req.params.reg }, function(err, data){
    if(err){
      console.log(err);
    }else{
      res.json(data);
    }
  });
});

app.listen(9000);
console.log('Running on port 9000');