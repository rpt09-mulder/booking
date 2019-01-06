const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Load the BookedDates Model
const Details = require('./Details');

const BookedDatesSchema = new Schema({

    listing_id: {
      type: Number,
      required: true
    },
    bookedDates: {
      type: Array,
      required: true,
    },

});


module.exports = BookedDates = mongoose.model('bookedDates', BookedDatesSchema);