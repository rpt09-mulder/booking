const faker = require('faker');
const db = require('./database/db');


// Load Listings Model
const Listing = require('./models/Listing');


const seeder = () => {

  // Droping existing sample data
  Listing.deleteMany({}, () => {


    for(let j = 1; j <= 100; j++){

      let details = [];

      for(let i = 1; i <= 50; i++){
        detail = {
          date: faker.date.between('2018-01-01', '2019-12-30'),
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

        details: details
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






  //   // Droping existing sample data
  //   BookedDates.deleteMany({}, () => {
      
  //     console.log('Removed Sample Data')

  //     // Loop for and create 1 listing
  //     for(let j = 1; j <= 100; j++){

  //     // for each listing create 50 dates and 50 guests objects with random guest counts
  //     for(let i = 0; i < 50; i++){

  //       let date = faker.date.between('2018-01-01', '2019-12-30');



  //     };

  //     const newBookedDates = new BookedDates({
  //       listing_id: j,
  //       details: new Details({

  //       }),

  //     });
      
  //     newBookedDates.save((err) => {
  //       if(err){
  //         console.log(err)
  //       }
  //     })
      
  //   };
  //   console.log('Sample data has been saved to DB')
  // })




