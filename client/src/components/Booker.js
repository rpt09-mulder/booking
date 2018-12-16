import React from 'react';
<<<<<<< HEAD
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

  componentDidMount(){
   this.handleGetBookedDates()
  }


  handleSubmitBooking = () =>{
     axios.post(`http://localhost:5555/booking/dates${window.location.pathname}`, {
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
=======
const moment = require('moment');
import axios from 'axios';
import './Booker.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';

class Booker extends React.Component {
   state={
    startDate: null,
    endDate: null,
    focusedInput: null,
   }

  handleSelect = () => {
    
    axios.post(`http://localhost:5555/booking/dates${window.location.pathname}`, {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }) 
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log(window.location.pathname)
>>>>>>> master
  }

  render(){
    return(
<<<<<<< HEAD
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


=======
      <div className="BookerWrapper">

        <div className="priceAndReviews">
          <h3 className="price">$57</h3><p className="per-night">per night</p>
          <div className="reviews">
            reviews
          </div>
        </div>
        <div className="Booker">
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
          />
        </div>
        <div>
          <input type="submit" onClick={() => this.handleSelect()}/>
        </div>
    </div>
>>>>>>> master
    )
  }

}

export default Booker;