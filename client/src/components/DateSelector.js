import React from 'react';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DateSelector.css'

const moment = require('moment')

import "react-datepicker/dist/react-datepicker.css";

class DateSelector extends React.Component{

    state={
      startDate: new Date(),
      endDate: new Date(),
    }

   addMonths = (today, monthsToAdd) => {

          const maxDate = moment(today)

          return maxDate.add(monthsToAdd, 'months')._d
          }

  modal = (
      <div className="booking-modal">
        <h3>Your Dates Have Been Booked!</h3>
      </div>
    )

    updateParentState = () => {
      this.props.handleEndDate(this.state.endDate)
      this.props.handleStartDate(this.state.startDate)
    }
    
    
    handleChangeStart = (startDate) => {
      startDate = startDate || this.state.startDate;
      let endDate = this.state.endDate;
      if(moment(startDate).isAfter(endDate)){
        endDate = startDate
        this.setState({endDate}, this.updateParentState)
      }
      this.setState({startDate}, this.updateParentState)
    };


    handleChangeEnd = (endDate) => {
      endDate = endDate || this.state.endDate;
      const startDate = this.state.startDate
      if(moment(startDate).isAfter(endDate)){
        endDate = startDate
      }
      this.setState({endDate}, this.updateParentState)
    }
 

  render(){
    
    return(
    
      <div>
      <div className="date-picker-wrapper">
      <p>Check In</p>  
      <DatePicker
          selected={this.state.startDate}
          selectsStart
          excludeDates={this.props.bookedDates}
          minDate={new Date()}
          maxDate={this.addMonths(new Date(), 5)}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
      />
      </div>

      <div className="date-picker-arrow">
      <FontAwesomeIcon icon="arrow-right" />
      </div>  

      <div className="date-picker-wrapper">
      <p>Check Out</p>    
      <DatePicker
          selected={this.state.endDate}
          selectsEnd
          excludeDates={this.props.bookedDates}
          minDate={new Date()}
          maxDate={this.addMonths(new Date(), 5)}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
      />
      </div>
      </div>
    );
  }
}

export default DateSelector;