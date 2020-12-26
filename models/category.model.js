const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: false
};

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, schemaOptions);


module.exports = mongoose.model('Category', categorySchema);
