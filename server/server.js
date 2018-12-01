const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const db = require('./database/db')

// Handling errors to be communicated to client
const errors = {}

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));

// 


// Load the BookedDates Model
const BookedDates = require('./models/BookedDates');


// @route     GET api/posts/dates
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/api/dates', (req, res) => {
  console.log('receiving request')
  BookedDates.findOne({'listing_id': 1})
    .then(listing => {
      
      console.log('Listing', listing)
      res.json(listing)
    })
    .catch(err => {
      console.log(err)
     })
 })


// Declaring Server Port
const port = 5555;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});