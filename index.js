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
const Student = require('./models/student');

// Check db connection
db.once('open', function () {
  console.log('Connected to MongoDB');
});

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// express routes
app.get('/', (req, res) => {
  res.send('TATTI');
});

app.post('/api/user/login', function (req, res, next) {
  Testing.findOne(req.body, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/student/registration', function (req, res, next) {
  req.checkBody('email', 'Enter a valid email id').notEmpty().isEmail();
  req.checkBody('reg', 'Enter your registration number').notEmpty().isInt();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) res.status(400).send(errors);
  else {
    let newStudent = new Student({
      email: req.body.email,
      reg: req.body.reg
    });

    newStudent.save()
      .then(student => res.status(201).json(student))
      .catch(err => console.log(err));
  }
});

// blob route - gets all data from training collection
app.get('/api/training/blob', function (req, res, next) {
  Training.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// gets complete student details (from training collection)
// corresponding to the reg no in the request
app.get('/api/training/reg=:reg', function (req, res, next) {
  Training.findOne({ "Registration No": req.params.reg }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// blob route - gets all data from testing collection
app.get('/api/testing/blob', function (req, res, next) {
  Testing.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// gets complete student details (from testing collection)
// corresponding to the reg no in the request
app.get('/api/testing/reg=:reg', function (req, res, next) {
  Testing.findOne({ "reg": req.params.reg }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/testing/new', (req, res, next) => {
  req.checkBody('name', 'Name is required to create a new user').notEmpty();
  req.checkBody('email', 'A valid email id is required to create a new user').notEmpty().isEmail();
  req.checkBody('reg', 'A valid registration number is required to create a new user').notEmpty().isInt();
  req.checkBody('age', 'Your age is required to create a new user').notEmpty().isInt();
  req.checkBody('gender', 'Your gender is required to create a new user').notEmpty();

  //Get Errors
  let errors = req.validationErrors();

  if (errors) {
    //res.status(400).send(errors);
  } else {

  }

  Testing.findOne({ 'personal.email': req.body.email }, (err, data) => {
    if (err) throw err;
    if (!data) {
      let newStudent = new Testing({
        personal: {
          name: req.body.name,
          email: req.body.email,
          reg: req.body.reg,
          age: req.body.age,
          gender: req.body.gender
        },
        academic: {
          flag: false
        }
      });

      newStudent.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.status(201).send('new student created');
        }
      });

    } else if (data) {
      res.status(400).send('User already exists, POST /api/testing/update to update academic details');
    }
  });
});

app.post('/api/testing/update', (req, res, next) => {
  req.checkBody('email', 'email required').notEmpty().isEmail();
  req.checkBody('tenBoard', 'Select your Secondary School Board').notEmpty();
  req.checkBody('ten', 'Enter your 10th grade marks').notEmpty().isInt();
  req.checkBody('twelve', 'Enter your 12th grade marks').notEmpty().isInt();
  req.checkBody('twPhy', 'Enter the marks you scored in 12th Boards Physics').notEmpty().isInt();
  req.checkBody('twChem', 'Enter the marks you scored in 12th Boards Chemistry').notEmpty().isInt();
  req.checkBody('twMath', 'Enter the marks you scored in 12th Boards Maths').notEmpty().isInt();
  req.checkBody('TTPhy1', 'Enter the TERM TEST grade you scored in Applied Physics 1').notEmpty();
  req.checkBody('TTChem1', 'Enter the TERM TEST  grade you scored in Applied Chemistry 1').notEmpty();
  req.checkBody('TTMath1', 'Enter the TERM TEST grade you scored in Applied Mathematics 1').notEmpty();
  req.checkBody('Phy1', 'Enter the FINAL grade you scored in Applied Physics 1').notEmpty();
  req.checkBody('Chem1', 'Enter the FINAL grade you scored in Applied Chemistry 1').notEmpty();
  req.checkBody('Math1', 'Enter the FINAL grade you scored in Applied Mathematics 1').notEmpty();
  req.checkBody('SEM1', 'Enter your Semester 1 Pointer').notEmpty().isInt();
  req.checkBody('TTPhy2', 'Enter the TERM TEST grade you scored in Applied Physics 2').notEmpty();
  req.checkBody('TTChem2', 'Enter the TERM TEST  grade you scored in Applied Chemistry 2').notEmpty();
  req.checkBody('TTMath2', 'Enter the TERM TEST  grade you scored in Applied Mathematics 2').notEmpty();
  req.checkBody('Phy2', 'Enter Applied Physics 2 predicted grade').notEmpty();
  req.checkBody('Chem2', 'Enter Applied Chemistry 2 predicted grade').notEmpty();
  req.checkBody('Math2', 'Enter Applied Mathematics 2 predicted grade').notEmpty();
  req.checkBody('coaching', 'Did you attend any external coaching classes?').notEmpty();
  req.checkBody('travel', 'Enter your travel time to college').notEmpty();
  req.checkBody('attendance', 'Enter your attendance range').notEmpty();
  req.checkBody('health', 'How would you rate your general health?').notEmpty();

  let errors = req.validationErrors();

  const updatedStudent = {
    academic: {
      flag: true,
      tenBoard: req.body.tenBoard,
      ten: req.body.ten,
      twelve: req.body.twelve,
      twPhy: req.body.twPhy,
      twChem: req.body.twChem,
      twMath: req.body.twMath,
      TTPhy1: req.body.TTPhy1,
      TTChem1: req.body.TTChem1,
      TTMath1: req.body.TTMath1,
      Phy1: req.body.Phy1,
      Chem1: req.body.Chem1,
      Math1: req.body.Math1,
      SEM1: req.body.SEM1,
      TTPhy2: req.body.TTPhy2,
      TTChem2: req.body.TTChem2,
      TTMath2: req.body.TTMath2,
      Phy2: req.body.Phy2,
      Chem2: req.body.Chem2,
      Math2: req.body.Math2,
      coaching: req.body.coaching,
      travel: req.body.travel,
      attendance: req.body.attendance,
      health: req.body.health,
    }
  }

  if (errors) {
    res.status(401).send(errors);
  } else {

    Testing.update({ 'personal.email': req.body.email }, updatedStudent, (err, raw) => {
      if (err) res.send(err);
      else res.send(raw);
    });
  }

});

app.listen(9000);
console.log('Running on port 9000');
