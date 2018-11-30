const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReservedDatesSchema = new Schema({

    listing_id: {
      type: Number,
      required: true
    },
    bookedDates: {
      type: Array,
      required: true,
    }

});

module.exports = ReservedDates = mongoose.model('reservedDates', ReservedDatesSchema);