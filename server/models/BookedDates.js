const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookedDatesSchema = new Schema({

    listing_id: {
      type: Number,
      required: true
    },
    bookedDates: {
      type: Array,
      required: true,
    }

});

module.exports = BookedDates = mongoose.model('bookedDates', BookedDatesSchema);