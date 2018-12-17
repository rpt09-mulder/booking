import React from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
const moment = require('moment');
import "react-datepicker/dist/react-datepicker.css";


class Booker extends React.Component {
   state={
      startDate: new Date(),
      endDate: new Date(),
      bookedDates: [],
      message: ''
   }

   handleGetBookedDates = () => {
    console.log('window', window.location.pathname)
    axios.get(`http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${window.location.pathname}`)
    .then(result => {
      this.setState({
        bookedDates: result.data.bookedDates
      })
    })
    .catch(err => {
      console.log(err)
    })
   }

  componentDidMount(){
   this.handleGetBookedDates()
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

   handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  addMonths = (today, monthsToAdd) => {

      const maxDate = moment(today)

      return maxDate.add(monthsToAdd, 'months')._d
  }

  render(){
    return(
      <div>
      <DatePicker
        selected={this.state.startDate}
        minDate={new Date()}
        maxDate={this.addMonths(new Date(), 5)}
        onChange={this.handleChange}
        excludeDates={this.state.bookedDates}
      />

      <p>{this.state.message}</p>

      <input onClick={this.handleSubmitBooking} type="submit" value="Book Now"/>
      </div>


    )
  }

}

export default Booker;