const _ = require('lodash')

exports.checkForConflictingDates = (listing, startDate, endDate) => {

  while(startDate <= endDate){
    if(_.find(listing.details, {'date': startDate.toDate()})){
      return true;
    } 
    startDate = startDate.clone().add(1, 'd');
  }
}


exports.bookDates = (listing, startDate, endDate, guests) => {
  return new Promise(function(resolve, reject){
  
    while(startDate <= endDate){
    
    listing.details.push({
      date: startDate.toDate(),
      guests: guests
    })
    
    startDate = startDate.clone().add(1, 'd');
    } 
    resolve()

    reject(Error('Something broke'))
    
  })
}