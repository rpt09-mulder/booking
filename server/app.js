const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path')
const db = require('./database/db');
const cors = require('cors');
const moment = require('moment');
const morgan = require('morgan');
const controller = require('./controller')



const app = express();
app.use(morgan('tiny'))
app.use(cors());

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
        res.status(404).json({invalid: 'No listing found'})
      }

      let  currentListing = {};

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
    
    if(guests.adults < 1){
      res.status(400).send({invalid: 'At least one adult must be in your party'});
      return;
    }

    let startDate = moment(req.body.startDate);
    let endDate = moment(req.body.endDate);

    Listing.findOne({listing_id: req.params.id})
      .then((listing) => {

         // Check if for any conflicting dates and return 400 if a rogue date is identified
         if(controller.checkForConflictingDates(listing, startDate, endDate)){
           res.status(400).send({invalid: 'Unfortunately this date range is unavailable'})
           return;
         } else {

          // Book dates if no rogue date has been identified
          controller.bookDates(listing, startDate, endDate, guests)
            .then(() => {
              listing.save().then(() =>{
                res.status(201).send({validDates: 'Congrats, your dates have been booked!'})
              });
            })
         }
      });
  });




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
