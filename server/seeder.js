const faker = require('faker');
const db = require('./database/db');
const moment = require('moment')

// Load Listings Model
const Listing = require('./models/Listing');


const seeder = () => {

  // Droping existing sample data
  Listing.deleteMany({}, () => {


    for(let j = 1; j <= 100; j++){

      let details = [];

      for(let i = 1; i <= 50; i++){

        let d = faker.date.between('2018-01-01', '2019-09-30');
        const newD = moment(d).startOf('day')
        
        detail = {
          date: newD,
          guests: {
            adults: faker.random.number({'min': 1, 'max': 3}),
            children: faker.random.number({'min': 0, 'max': 3}),
            infants: faker.random.number({'min': 0, 'max': 3}),
          }
        }
        details.push(detail)
      }

      const newListing = new Listing({

        listing_id: j,

        details: details,

        listing_price: faker.commerce.price(50, 100)
      }) 

     newListing.save((err) => {
        if(err){
          console.log(err)
        }
      })
    }
 })
}

// Call Seeder func
seeder();






