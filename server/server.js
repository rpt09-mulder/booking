const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));


// Load the ReserveDates Model
const ReserveDates = require('./models/ReserveDates');


// @route     GET api/posts/dates
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/api/dates', (req, res) => {
    console.log('getting dates')
})


// Declaring Server Port
const port = 5555;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});