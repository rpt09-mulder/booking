const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const db = require('./database/db');

const app = express();
app.use(cors());

// Handling errors to be communicated to client
const errors = {}

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));

// Load the BookedDates Model
const BookedDates = require('./models/BookedDates');


// @route     GET api/dates/:id
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/booking/dates/:id', (req, res) => {
  
  BookedDates.findOne({listing_id: req.params.id})
    .then(listing => {
      if(listing === null){
        res.status(404).json({listingnotfound: 'No listing found'})
      }
      res.json(listing)
    })
 });


// @route     POST api/dates/:id
// @desc      Books date(s) to the database
// @access    Public
app.post('/booking/dates/:id', (req, res) => {

    console.log(req.params.id)

    BookedDates.findOne({listing_id: req.params.id})
      .then(listing => {  

        console.log(listing)
    })
});


module.exports = app
