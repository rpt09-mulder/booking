const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DetailsSchema = new Schema({

  date: {
    type: Date,
    required: true
  },
  guests: {
    type: Object,
    required: true,
  },

});

module.exports = DetailsSchema = mongoose.model('bookedDates', DetailsSchema);