import React from 'react';
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
  }

  render(){
    return(
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
    )
  }

}

export default Booker;