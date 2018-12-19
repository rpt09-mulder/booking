import React from 'react';
import DatePicker from "react-datepicker";
import isAfter from 'date-fns';
import axios from 'axios';
const moment = require('moment');
import "react-datepicker/dist/react-datepicker.css";


const tomorrow = moment(new Date).add(1, 'day')

class Booker extends React.Component {
   state={
      startDate: new Date(),
      endDate: tomorrow._d,
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

  //  handleChange = (date) => {
  //   this.setState({
  //     startDate: date
  //   });
  // }


  handleChangeStart = ({startDate, endDate}) =>{
      
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;


    // if user selects a date before start date (today) then the end date is today
    if(isAfter(startDate, endDate)){
        endDate = startDate
    }

    this.setState({startDate, endDate})

  }


  // Triggerts handleChange for start date
  handleChangeStart = startDate => this.handleChange(startDate)

  // Triggers handleChage for end date
  handleChangeEnd = endDate => this.handleChange(endDate)



  addMonths = (today, monthsToAdd) => {

      const maxDate = moment(today)

      return maxDate.add(monthsToAdd, 'months')._d
  }

  render(){
    return(

      <div>
      <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
      />

      <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
      />

      </div>
    )
  }

}

export default Booker;