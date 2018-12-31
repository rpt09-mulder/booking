import React from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Guests from './guests';

const moment = require('moment')

import "react-datepicker/dist/react-datepicker.css";

class Booker extends React.Component {
   state={
      startDate: new Date(),
      endDate: new Date(),
      bookedDates: [],
      message: ''
   }

   handleGetBookedDates = () => {

    let id = '/1';
    if (window.location.pathname !== '/') {
      id = window.location.pathname;
    }
    //http://booking-dev2.us-west-1.elasticbeanstalk.com
    axios.get(`http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${id}`)
    .then(result => {
      this.setState({
        bookedDates: result.data.bookedDates
      })
    })
    .catch(err => {
      console.log(err)
    })
   }



  handleSubmitBooking = () =>{
    
    const startDate = moment(this.state.startDate).startOf('day')
    const endDate = moment(this.state.endDate).startOf('day')

     axios.post(`http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${window.location.pathname}`, {
        startDate: startDate,
        endDate: endDate
      })
      .then(result => {

        this.handleGetBookedDates()
        
        this.setState({
          startDate: new Date(),
          endDate: new Date(),
          message: result.data
        })

        setTimeout(() =>{
          this.setState({
            message: ''
          })
        }, 3000)

      })
      .catch(err => {
        console.log(err)
      })
   }


   addMonths = (today, monthsToAdd) => {

    const maxDate = moment(today)

    return maxDate.add(monthsToAdd, 'months')._d
    }


  // Triggerts handleChange for start date
  handleChangeStart = (startDate) => {

    startDate = startDate || this.state.startDate;

    let endDate = this.state.endDate;

    if(moment(startDate).isAfter(endDate)){
      endDate = startDate
      this.setState({endDate})
    }

    this.setState({startDate})
  
  };

  // Triggers handleChage for end date
  handleChangeEnd = (endDate) => {


    endDate = endDate || this.state.endDate;

    const startDate = this.state.startDate

    if(moment(startDate).isAfter(endDate)){
      endDate = startDate
    }

    this.setState({endDate})

  }

  componentDidMount(){
    this.handleGetBookedDates()
  }

  render(){

    const modal = (

      <div className="booking-modal">
        <h3>Your Dates Have Been Booked!</h3>
      </div>

    )

    return(
    
      <div>
      <DatePicker
          selected={this.state.startDate}
          selectsStart
          excludeDates={this.state.bookedDates}
          minDate={new Date()}
          maxDate={this.addMonths(new Date(), 5)}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
      />

      <DatePicker
          selected={this.state.endDate}
          selectsEnd
          excludeDates={this.state.bookedDates}
          minDate={new Date()}
          maxDate={this.addMonths(new Date(), 5)}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
      />

      <Guests />

      <div>
        <button onClick={this.handleSubmitBooking}>Book Dates</button>
      </div>

      {this.state.message !== '' ? (
        modal
      ) : ''}
      </div>
    )
  }

}

export default Booker;