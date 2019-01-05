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

    bookedDates: [],

    message: '',
    adults: 0,
    children: 0,
    infants: 0,
  }


  handleStartDate = (startDate) =>{
    this.setState({
      startDate: startDate
    })
  }

  handleEndDate = (endDate) => {
    this.setState({
      endDate: endDate
    })
  }

  handleGetDates = () => {
    
  }


  handleGetBookedDates = () => {

    let id = '/1';
    if (window.location.pathname !== '/') {
      id = window.location.pathname;
    }
    //http://http://localhost:3004/dates${id}
    //http://booking-dev2.us-west-1.elasticbeanstalk.com/booking/dates${id}
    axios.get(`http://http://localhost:3004/dates${id}`)
    console.log('Getting')
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

  
    // Guest Logic
    // Adults
    increaseAdultCount = () => {
      this.setState((prevState) => ({
        adults: prevState.adults + 1
      }))
    }
    
    decreaseAdultCount = () => {
      if(this.state.adults > 0){
        this.setState((prevState) => ({
          adults: prevState.adults - 1
        }))
      }
    }
  
    // Children
    increaseChildCount = () => {
      this.setState((prevState) => ({
        children: prevState.children + 1
      }))
    }
  
    decreaseChildCount = () => {
      if(this.state.children > 0){
        this.setState((prevState) => ({
          children: prevState.children - 1
        }))
      }
    }
  
    // Infants
    increaseInfantCount = () => {
      this.setState((prevState) => ({
        infants: prevState.infants + 1
      }))
    }
  
    decreaseInfantCount = () => {
      if(this.state.infants > 0){
        this.setState((prevState) => ({
          infants: prevState.infants - 1
        }))
      }
    }
  

    // Life Cycle Methods
    // componentDidMount(){
    //   this.handleGetBookedDates()
    // }

    
  

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
          />

           <Guests 
           // Variables
           adults={this.state.adults}
           children={this.state.children}
           infants={this.state.infants}
           // Methods
           increaseAdultCount={this.increaseAdultCount}
           decreaseAdultCount={this.decreaseAdultCount}
           increaseChildCount={this.increaseChildCount}
           decreaseChildCount={this.decreaseChildCount}
           increaseInfantCount={this.increaseInfantCount}
           decreaseInfantCount={this.decreaseInfantCount}
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