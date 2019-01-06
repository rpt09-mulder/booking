const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path')
const db = require('./database/db');
const cors = require('cors');
const moment = require('moment');
const morgan = require('morgan')


const app = express();
app.use(morgan('tiny'))
app.use(cors());

// Handling errors to be communicated to client
const errors = {}

// CORS Middleware
app.use(cors())

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/:id', express.static(path.join(__dirname, '../client/public')));


// Load the BookedDates Model
const BookedDates = require('./models/Listing');


// @route     GET api/dates/:id
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/booking/dates/:id', (req, res) => {

  BookedDates.findOne({listing_id: req.params.id})
    .then(listing => {

      console.log(listing)

      // if(listing === null){
      //   res.status(404).json({listingnotfound: 'No listing found'})
      // }
      // // only sending back days booked
      // const days = [];

      // listing.bookedDates.forEach((entry) => {
      //   days.push(entry.date)
      // })

      // res.json(days)
    })
 });



// @route     POST api/dates/:id
// @desc      Books date(s) to the database
// @access    Public
app.post('/booking/dates/:id', (req, res) => {

    console.log('posting')

    let startDate = moment(req.body.startDate);
    let endDate = moment(req.body.endDate);
    let guests = req.body.guests

    const days = [];
    let day = startDate;

    // while(day <= endDate){
    //   // add the guests to each day being booked
    //   day.guests = guests
    //   // push each day between end and start date into array
    //   days.push(day.toDate());
    //   // add 1 to start date to reach end date and reach base case of while loop
    //   day = day.clone().add(1, 'd');
    // }

    while(day <= endDate){
      // create an object for each day
      const bookedDay = {};
      // transform moment object to js date object and add to bookedDay object
      bookedDay.date = day.toDate();
      // add guest to each day that is beeing booked
      bookedDay.guests = guests;
      // push booked day into day array
      days.push(bookedDay)
      // add 1 to start date to reach end date and set equal to new day in order to reach base case of while loop
      day = day.clone().add(1, 'd');
    }

    BookedDates.findOne({listing_id: req.params.id})
      .then(listing => {  
        
        days.forEach(day => {

          if(day === listing.bookedDates)
          console.log(day)
          listing.bookedDates.push(day)
        })

        listing.save().then(() =>{
          res.status(201).json("Your dates have been booked")
        })
    })
});


module.exports = app



