import React from 'react';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DateSelector.css'

const moment = require('moment')

import "react-datepicker/dist/react-datepicker.css";

const DateSelector = (props) => {

   const addMonths = (today, monthsToAdd) => {

          const maxDate = moment(today)

          return maxDate.add(monthsToAdd, 'months')._d
          }

    const modal = (
      <div className="booking-modal">
        <h3>Your Dates Have Been Booked!</h3>
      </div>
    )
    


    return(
    
      <div>
      <div className="date-picker-wrapper">
      <p>Check In</p>  
      <DatePicker
          selected={props.startDate}
          selectsStart
          excludeDates={props.bookedDates}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 5)}
          startDate={props.startDate}
          endDate={props.endDate}
          onChange={props.handleChangeStart}
      />
      </div>

      <div class="date-picker-arrow">
      <FontAwesomeIcon icon="arrow-right" />
      </div>  

      <div className="date-picker-wrapper">
      <p>Check Out</p>    
      <DatePicker
          selected={props.endDate}
          selectsEnd
          excludeDates={props.bookedDates}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 5)}
          startDate={props.startDate}
          endDate={props.endDate}
          onChange={props.handleChangeEnd}
      />
      </div>
      </div>
    );


}

export default DateSelector;