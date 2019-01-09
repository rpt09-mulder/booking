import React from 'react';
import DateSelector from './components/DateSelector';
import Guests from './components/Guests';
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import faker from 'faker';
import moment from 'moment';
import Overview from './components/Overview'
import { StickyContainer, Sticky } from 'react-sticky';
import { faStarHalf, faStar, faArrowRight, faIgloo, faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';





import './App.css'

library.add(faStarHalf, faStar, faIgloo, faPlusCircle, faMinusCircle, faArrowRight)

let id = '/1';
if (window.location.pathname !== '/') {
  id = window.location.pathname;
}

let URL = 'http://booking-dev2.us-west-1.elasticbeanstalk.com/booking';

if(process.env.NODE_ENV === 'development'){
   URL = 'http://localhost:3004/booking'
} 


class App extends React.Component {

  state={
    startDate: '',
    endDate: '',
    guests: [],
    days: [],
    price: null,

    successMessage: null,
    errorMessage: '',
  }


  // Life Cycle Methods
  componentDidMount(){
    this.handleGetBookedDates()
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

    console.log(URL)
    axios.get(URL + `${id}`)
    .then(result => {
      
      const days = [];

      result.data.days.forEach((day) => {
        days.push(new Date(day))
      })
      
      this.setState({
        days: days,
        price: result.data.price
      })
    })
    .catch(err => {
      console.log(err)
    })
    }

    handleSubmitBooking = () =>{
      const startDate = moment(this.state.startDate).startOf('day')
      const endDate = moment(this.state.endDate).startOf('day')
       axios.post(URL + `${id}`, {
          startDate: startDate,
          endDate: endDate,
          guests: this.state.guests
        })
        .then(result => {
          this.handleGetBookedDates()
          this.setState({
            successMessage: result.data.validDates
          })

          setTimeout(() =>{
            this.setState({
              successMessage: ''
            })
          }, 3000)
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


  render(){

    let successModal = null;
    
    if(this.state.successMessage){

      successModal = (
        <div className="success-modal">
          
          <div className="success-message">{this.state.successMessage}</div>
    
        </div>)
    } 
    
    return(
      <div>
      <StickyContainer className="sticky-wrapper">
          <Sticky>
         { ({ style }) => (
        <div className="app-wrapper" style={style}>

          {successModal}
          <Overview price={this.state.price}/>
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