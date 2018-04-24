const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  reg: {
    type: String,
    required: true
  }
});

module.exports = Student = mongoose.model('student', StudentSchema, 'students');