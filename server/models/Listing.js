const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Details Schema
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

//BookedDates Schema
const ListingSchema = new Schema({

    listing_id: {
      type: Number,
      required: true
    },
    details: [DetailsSchema]

});


module.exports = Listing = mongoose.model('listing', ListingSchema);