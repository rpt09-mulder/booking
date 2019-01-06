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

class App extends React.Component {

  state={
    startDate: '',
    endDate: '',
    guests: [],
    bookedDates: [],


    message: '',
  }


  handleStartDate = (startDate) =>{
    this.setState({startDate})
  }

  handleEndDate = (endDate) => {
    this.setState({endDate})
  }

  handleGuests = (guests) => {
    console.log(guests)
    this.setState({guests})
  }


  handleGetBookedDates = () => {

    let id = '/1';
    if (window.location.pathname !== '/') {
      id = window.location.pathname;
    }

    //http://http://localhost:3004/dates${id}
    //http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${id}
    axios.get(`http://localhost:3004/booking/dates${id}`)
    .then(result => {
      console.log(window.location.pathname)
      this.setState({
        bookedDates: result.data.bookedDates
      })
    })
    .catch(err => {
      console.log(err)
    })
    }

    handleSubmitBooking = () =>{

      let id = '/1';
      if (window.location.pathname !== '/') {
        id = window.location.pathname;
      }
    
      const startDate = moment(this.state.startDate).startOf('day')
      const endDate = moment(this.state.endDate).startOf('day')
      //http://http://localhost:3004/dates${id}
      //http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${id}
       axios.post(`http://http://localhost:3004/dates${id}`, {
          startDate: startDate,
          endDate: endDate,
          adults: this.state.adults,
          children: this.state.children,
          infants: this.state.infants
        })
        .then(result => {
  
          this.handleGetBookedDates()
          
          this.setState({
            startDate: new Date(),
            endDate: new Date(),
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
            bookedDates={this.state.bookedDates}
          />

           <Guests
           guests={this.guests}
           handleGuests={this.handleGuests}
          />

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