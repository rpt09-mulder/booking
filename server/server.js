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
app.get('/api/dates/:id', (req, res) => {
  console.log('receiving request')
  BookedDates.findOne({listing_id: req.params.id})
    .then(listing => {

      if(listing === null){
        res.status(404).json({listingnotfound: 'No listing found'})
       
      }
      res.json(listing)

    })
 })


// Declaring Server Port
const port = 5555;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});