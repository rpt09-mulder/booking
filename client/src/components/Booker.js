import React from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
const moment = require('moment');
import "react-datepicker/dist/react-datepicker.css";


class Booker extends React.Component {
   state={
      startDate: new Date(),
      endDate: new Date(),
      bookedDates: []
   }

   componentDidMount(){
      axios.get(`http://localhost:5555/booking/dates${window.location.pathname}`)
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
     axios.post(`http://localhost:5555/booking/dates${window.location.pathname}`, {
       bookedDate: this.state.startDate
     })
     .then(result => {
       console.log(result)
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

      <input onClick={this.handleSubmitBooking} type="submit" value="Book Now"/>
      </div>


    )
  }

}

export default Booker;