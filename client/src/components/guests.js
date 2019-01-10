import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Guests.css'


class Guests extends React.Component {
  state= {
    card: false,
    adults: 1,
    children: 0,
    infants: 0,
  }


updateParentState = () => {
  const guests = Object.assign(this.state, {})

  this.props.handleGuests(guests)
}
  
showCard = () => {
  this.setState({
    card: true
  })
}

componentDidMount() {
  this.updateParentState()
  document.addEventListener('mousedown', this.handleClickOutside);
}

componentWillUnmount() {
  document.removeEventListener('mousedown', this.handleClickOutside);
}

setWrapperRef = (node) => {
  this.wrapperRef = node;
}

handleClickOutside = (event) => {
  if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    this.setState({
      card: false
    })
    this.updateParentState()
  }
}

// Adults
increaseAdultCount = () => {
  this.setState((prevState) => ({
    adults: prevState.adults + 1
  }))
}

decreaseAdultCount = () => {
  if(this.state.adults > 1){
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
  

  render(){
    let guestCard = null;

    if(this.state.card){
      guestCard = ( <div className="guestCard" ref={this.setWrapperRef}>

                    <div className="guest-card-choice">
                        <h3>Adults</h3>
                        <div className="guest-icon" onClick={this.increaseAdultCount}>
                          <span className="icon-wrapper"><FontAwesomeIcon icon="plus-circle" /></span>
                        </div>

                        <div className="guest-card-number">
                            {this.state.adults}
                        </div>
                        <div className="guest-icon" onClick={this.decreaseAdultCount}>
                           <FontAwesomeIcon icon="minus-circle" />
                        </div>

                     </div>
                     <div className="guest-card-choice">
                         <h3>Children</h3>
                          <div className="guest-icon" onClick={this.increaseChildCount}>
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>

                          <div className="guest-card-number">
                              {this.state.children}
                          </div>

                          <div className="guest-icon" onClick={this.decreaseChildCount}>
                            <FontAwesomeIcon icon="minus-circle" />
                          </div>
                      </div>
                      <div className="guest-card-choice">
                        <h3>Infants</h3>
                        <div className="guest-icon" onClick={this.increaseInfantCount}>
                          <FontAwesomeIcon icon="plus-circle" />
                        </div>

                        <div className="guest-card-number">
                            {this.state.infants}
                        </div>

                        <div className="guest-icon" onClick={this.decreaseInfantCount}>
                           <FontAwesomeIcon icon="minus-circle" />
                        </div>

                      </div>
                    </div>)
    }

    return(
      <div className="guest-card-outer-wrapper">
        <p>Guests</p>
        <div className="guest-card-wrapper">
          <div onClick={this.showCard} className="guests-display">
              <p className="guest-choice">{this.state.adults} adults,</p>
              <p className="guest-choice">{this.state.children} children,</p>
              <p className="guest-choice">{this.state.infants} infants</p>
          </div>
          <div>
            {guestCard}
          </div>  
        </div>
      </div>
    )
  }
}

export default Guests;