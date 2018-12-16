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
      axios.get('http://localhost:5555/api/dates/:id')
   }

   handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  render(){
    return(
      <div>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
      </div>
    )
  }

}

export default Booker;