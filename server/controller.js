const _ = require('lodash')

exports.checkForConflictingDates = (listing, startDate, endDate) => {

  let day = startDate;

  while(day <= endDate){
    if(_.find(listing.details, {'date': day.toDate()})){
      return true;
    } 
   day = day.clone().add(1, 'd');
  }
}


exports.bookDates = (listing, startDate, endDate, guests) => {
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