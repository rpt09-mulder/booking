import React from 'react';
import DateSelector from './components/DateSelector';
import Guests from './components/Guests';
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import { StickyContainer, Sticky } from 'react-sticky';
import { faArrowRight, faIgloo, faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';

import './App.css'

const moment = require('moment')

library.add(faIgloo, faPlusCircle, faMinusCircle, faArrowRight)


let id = '/1';
if (window.location.pathname !== '/') {
  id = window.location.pathname;
}

class App extends React.Component {

  state={
    startDate: '',
    endDate: '',
    guests: [],
    days: [],

    errorMessage: '',
  }


  handleStartDate = (startDate) =>{
    this.setState({startDate})
  }

  handleEndDate = (endDate) => {
    this.setState({endDate})
  }

  handleGuests = (guests) => {
    this.setState({guests})
  }


  handleGetBookedDates = () => {
    //http://http://localhost:3004/dates${id}
    //http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${id}
    axios.get(`http://localhost:3004/booking/dates${id}`)
    .then(result => {
      
      const days = [];

      result.data.forEach((day) => {
        days.push(new Date(day))
      })

      this.setState({
        days: days
      })
    })
    .catch(err => {
      console.log(err)
    })
    }

    handleSubmitBooking = () =>{
      const startDate = moment(this.state.startDate).startOf('day')
      const endDate = moment(this.state.endDate).startOf('day')
      //http://http://localhost:3004/dates${id}
      //http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${id}
       axios.post(`http://localhost:3004/booking/dates${id}`, {
          startDate: startDate,
          endDate: endDate,
          guests: this.state.guests
        })
        .then(result => {
          this.handleGetBookedDates()

          console.log(result)
      
        })
        .catch(err => {
          this.setState({
            errorMessage: err.response.data.invalidDates
          })

        setTimeout(() =>{
          this.setState({
            errorMessage: ''
          })
        }, 3000)

        })
     }

    // Life Cycle Methods
    componentDidMount(){
      this.handleGetBookedDates()
    }

  render(){
    
    return(
      <div>
      <StickyContainer className="sticky-wrapper">
          <Sticky>
         { ({ style }) => (
        <div className="app-wrapper" style={style}>
          <DateSelector
            handleStartDate={this.handleStartDate}
            handleEndDate={this.handleEndDate}
            bookedDates={this.state.days}
          />

           <Guests
           guests={this.guests}
           handleGuests={this.handleGuests}
          />
          <p className="error-message">{this.state.errorMessage}</p>
          <input className="submitButton" type="submit" onClick={this.handleSubmitBooking} value="Request to Book"/>
        </div>
        )}
        </Sticky>
        <div style={{minHeight: 2000 }}></div>
      </StickyContainer>
      </div>
    )
  }
}

export default App;