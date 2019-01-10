const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path')
const db = require('./database/db');
const cors = require('cors');
const moment = require('moment');
const morgan = require('morgan');
const _ = require('lodash')


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


// Load Listings Model
const Listing = require('./models/Listing');


// @route     GET api/:id
// @desc      Gets all booked dates for a listing
// @access    Public
app.get('/booking/:id', (req, res) => {

  Listing.findOne({listing_id: req.params.id})
    .then(listing => {

      if(listing === null){
        res.status(404).json({listingnotfound: 'No listing found'})
      }

      let currentListing = {};

      // Send back price of listing
      currentListing.price = listing.listing_price
      // only sending back days booked
      currentListing.days = [];

      listing.details.forEach((detail) => {
        currentListing.days.push(detail.date)
      })

      res.json(currentListing)
    })
 });



// @route     POST api/dates/:id
// @desc      Books date(s) to the database
// @access    Public
app.post('/booking/:id', (req, res) => {

    let guests = req.body.guests

    let startDate = moment(req.body.startDate);
    let endDate = moment(req.body.endDate);
    
    if(guests.adults < 1){
      res.status(400).send({invalid: 'At least one adult must be in your party'});
      return;
    }

    Listing.findOne({listing_id: req.params.id})
      .then((listing) => {

         // Check if for any conflicting dates and return 400 if a rogue date is identified
         if(checkForConflictingDates(listing, startDate, endDate)){
           res.status(400).send({invalid: 'Unfortunately this date range is unavailable'})
           return;
         } else {

          // Book dates if no rogue date has been identified
          bookDates(listing, startDate, endDate, guests)
            .then(() => {
              listing.save().then(() =>{
                res.status(201).send({validDates: 'Congrats, your dates have been booked!'})
              });
            })
         }
      });
  });



  const checkForConflictingDates = (listing, startDate, endDate) => {

    let day = startDate;

    while(day <= endDate){
      if(_.find(listing.details, {'date': day.toDate()})){
        return true;
      } 
     day = day.clone().add(1, 'd');
    }
  }


  const bookDates = (listing, startDate, endDate, guests) => {
    return new Promise(function(resolve, reject){
      
      let day = startDate;

      while(day <= endDate){
      
      listing.details.push({
        date: day.toDate(),
        guests: guests
      })
      
      day = day.clone().add(1, 'd');
      } 
      resolve()

      reject(Error('Something broke'))
      
    })
  }


module.exports = app


 




    // while(day <= endDate){
    //   // create an object for each day
    //   const bookedDay = {};
    //   // transform moment object to js date object and add to bookedDay object
    //   bookedDay.date = day.toDate();
    //   // add guest to each day that is beeing booked
    //   bookedDay.guests = guests;
    //   // push booked day into day array
    //   days.push(bookedDay)
    //   // add 1 to start date to reach end date and set 
    //    day = day.clone().add(1, 'd');
    // }

    // BookedDates.findOne({listing_id: req.params.id})
    //   .then(listing => {  

    //     console.log(listing)
        
        // days.forEach(day => {

        //   if(day === listing.bookedDates)
        //   console.log(day)
        //   listing.bookedDates.push(day)
        // })

        // listing.save().then(() =>{
        //   res.status(201).json("Your dates have been booked")
        // })
    // })
