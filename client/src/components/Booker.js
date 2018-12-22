import React from 'react';
import DatePicker from "react-datepicker";
import { isAfter } from 'date-fns';
import axios from 'axios';
import Moment from 'react-moment';

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
     axios.post(`http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${window.location.pathname}`, {
        newBookedDate: this.state.startDate
      })
      .then(result => {

        this.handleGetBookedDates()
        
        this.setState({
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

    console.log('startDate', startDate)

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

    console.log('endDate', endDate)

    endDate = endDate || this.state.endDate;

    const startDate = this.state.startDate

    if(moment(startDate).isAfter(endDate)){
      console.log('true')
      endDate = startDate
    }

    this.setState({endDate})

  }

  componentDidMount(){
    this.handleGetBookedDates()
  }

  render(){
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

      </div>
    )
  }

}

export default Booker;