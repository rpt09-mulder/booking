const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const app = express();

// Handling errors to be communicated to client
const errors = {}

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));


// Load the BookedDates Model
const BookedDates = require('./models/BookedDates');


// @route     GET api/posts/dates
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/api/dates', (req, res) => {
  console.log(req.params.id)
  BookedDates.findOne({listing_id: 1})
    .then(dates => {
      console.log(dates)
    })
    .catch(err => res.status(404).json({listingnotfound: 'No listing found' }))
})


// Declaring Server Port
const port = 5555;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});