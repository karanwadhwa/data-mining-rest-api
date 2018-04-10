const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const constants = require('./constants');

const app = express();

// db connection
mongoose.connect(`mongodb://${constants.DB_USER}:${constants.DB_PASSWORD}@ds223019.mlab.com:23019/${constants.DB_NAME}`);
const db = mongoose.connection;

//Models
const Training = require('./models/blob');
const Testing = require('./models/testing');

// Check db connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});


// express routes
app.get('/', (req, res) => {
  res.send('TATTI');
});

// blob route - gets all data from training collection
app.get('/api/training/blob', function(req, res,next){
  Training.find({}, function(err, data){
    if(err){
      console.log(err);
    }else{
      res.json(data);
    }
  });
});

// gets complete student details corresponding to the reg no in the request
app.get('/api/training/reg=:reg', function(req, res,next){
  Training.findOne({ "Registration No": req.params.reg }, function(err, data){
    if(err){
      console.log(err);
    }else{
      res.json(data);
    }
  });
});



app.listen(9000);
console.log('Running on port 9000');