const faker = require('faker');
const moment = require('moment');
const mongoose = require('mongoose');
const db = require('./database/db');

// Load Profile Model
const ReservedDates = require('./models/ReserveDates');

const seeder = () => {

  // Droping existing sample data
  ReservedDates.remove({}, ()=>{
    console.log('Removed Sample Data')
  })
// Loop for each listing
  for(let j = 1; j <= 100; j++){

    let bookedDays = []

    // Loop 
    for(let i = 0; i < 50; i++){
      let randomDate = faker.date.between('2018-12-01', '2019-06-01');
      let cleanDate = moment(randomDate).format('L')
      bookedDays.push(cleanDate)
    };
    
    const newReservedDates = new ReservedDates({
      listing_id: j,
      bookedDates: bookedDays,
    });
    
    newReservedDates.save()
  };
  console.log('Sample data has been saved to DB')
};

// Call Seeder func
seeder();






