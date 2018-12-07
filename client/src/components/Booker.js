import React from 'react';
import { Calendar } from 'react-date-range';
const moment = require('moment');
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



  handleSelect = (range) => {
    console.log(range); // Momentjs object
  }

  render(){
    return(
      <div className="BookerWrapper">

        <div className="priceAndReviews">
          <h3 className="price">$57</h3><p class="per-night">per night</p>
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
    </div>
    )
  }

}

export default Booker;