const mongoose = require('mongoose');

const blobSchema = mongoose.Schema({
  "Username": {
    type: String,
    required: true
  },
  "Full name": {
    type: String,
    required: true
  },
  "Age": {
    type: Number,
    required: true
  },
  "Gender": {
    type: String,
    required: true
  },
  "Registration No": {
    type: String,
    required: true
  },
  "10th Board": {
    type: String,
    required: true
  },
  " 10th Boards%": {
    type: String,
    required: true
  },
  "12th Boards %": {
    type: String,
    required: true
  },
  "Marks in Physics": {
    type: String,
    required: true
  },
  "Marks in chemistry": {
    type: String,
    required: true
  },
  "Marks in Maths": {
    type: String,
    required: true
  },
  "SEM-1 POINTER": {
    type: String,
    required: true
  },
  "SEM-1 Grade (Physics)": {
    type: String,
    required: true
  },
  "SEM-1 Grade (Chemistry)": {
    type: String,
    required: true
  },
  "SEM-1 Grade (Maths)": {
    type: String,
    required: true
  },
  "Term-Test grade in SEM-1(Physics)": {
    type: String,
    required: true
  },
  "Term-Test grade in SEM-1(Chemistry)": {
    type: String,
    required: true
  },
  "Term-Test grade in SEM-1(Maths)": {
    type: String,
    required: true
  },
  "SEM-2 POINTER": {
    type: String,
    required: true
  },
  "SEM-2 Grade (PHYSICS)": {
    type: String,
    required: true
  },
  "SEM-2 Grade (CHEMISTRY)": {
    type: String,
    required: true
  },
  "SEM-2 Grade (MATHS)": {
    type: String,
    required: true
  },
  "Term-Test grade in SEM-2(PHYSICS)": {
    type: String,
    required: true
  },
  "Term-Test grade in SEM-2(CHEMISTRY)": {
    type: String,
    required: true
  },
  "Term-Test grade in SEM-2(MATHS)": {
    type: String,
    required: true
  },
  "External Coaching": {
    type: String,
    required: true
  },
  "Approx hrs used for studying(Weekly)": {
    type: String,
    required: true
  },
  "Travelling time to college": {
    type: String,
    required: true
  },
  "College attendance": {
    type: String,
    required: true
  },
  "Average health.": {
    type: String,
    required: true
  },

});

// export model
const Blob = module.exports = mongoose.model('Blob', blobSchema, 'blob');

/* // queries to 'blob' collection
module.exports.getAllData = (callback, limit) => {
  Blob.find(callback);
} */