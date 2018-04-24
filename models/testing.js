const mongoose = require('mongoose');

const testingSchema = mongoose.Schema({
  "name": {
    type: String,
    required: true
  },
  "email": {
    type: String,
    required: true
  },
  "reg": {
    type: String,
    required: true
  },
  "age": {
    type: Number,
    required: true
  },
  "gender": {
    type: String,
    required: true
  },
  "tenBoard": {
    type: String,
    required: true
  },
  "ten": {
    type: String,
    required: true
  },
  "twelve": {
    type: String,
    required: true
  },
  "twPhy": {
    type: String,
    required: true
  },
  "twChem": {
    type: String,
    required: true
  },
  "twMath": {
    type: String,
    required: true
  },
  "TTPhy1": {
    type: String,
    required: true
  },
  "TTChem1": {
    type: String,
    required: true
  },
  "TTMath1": {
    type: String,
    required: true
  },
  "Phy1": {
    type: String,
    required: true
  },
  "Chem1": {
    type: String,
    required: true
  },
  "Math1": {
    type: String,
    required: true
  },
  "SEM1": {
    type: String,
    required: true
  },
  "TTPhy2": {
    type: String,
    required: true
  },
  "TTChem2": {
    type: String,
    required: true
  },
  "TTMath2": {
    type: String,
    required: true
  },
  "Phy2": {
    type: String,
    required: true
  },
  "Chem2": {
    type: String,
    required: true
  },
  "Math2": {
    type: String,
    required: true
  },
  "coaching": {
    type: String,
    required: true
  },
  "travel": {
    type: String,
    required: true
  },
  "attendance": {
    type: String,
    required: true
  },
  "health": {
    type: String,
    required: true
  }
});

// export model
const Testing = module.exports = mongoose.model('Testing', testingSchema, 'testing');