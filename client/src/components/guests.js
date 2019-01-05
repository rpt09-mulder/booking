import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Guests.css'


class Guests extends React.Component {
  state= {
    card: false
  }

  showCard = () => {
    this.setState({
      card: true
    })
  }

  componentDidMount() {
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
    }
  }

  render(){
    let guestCard = null;

    if(this.state.card){
      guestCard = ( <div className="guestCard" ref={this.setWrapperRef}>

                    <div className="guest-card-choice">
                        <h3>Adults</h3>
                        <div className="guest-icon" onClick={this.props.increaseAdultCount}>
                          <FontAwesomeIcon icon="plus-circle" />
                        </div>

                        <div className="guest-card-number">
                            {this.props.adults}
                        </div>

                        <div className="guest-icon" onClick={this.props.decreaseAdultCount}>
                           <FontAwesomeIcon icon="minus-circle" />
                        </div>

                     </div>
                     <div className="guest-card-choice">
                         <h3>Children</h3>
                          <div className="guest-icon" onClick={this.props.increaseChildCount}>
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>

                          <div className="guest-card-number">
                              {this.props.children}
                          </div>

                          <div className="guest-icon" onClick={this.props.decreaseChildCount}>
                            <FontAwesomeIcon icon="minus-circle" />
                          </div>
                      </div>
                      <div className="guest-card-choice">
                        <h3>Infants</h3>
                        <div className="guest-icon" onClick={this.props.increaseInfantCount}>
                          <FontAwesomeIcon icon="plus-circle" />
                        </div>

                        <div className="guest-card-number">
                            {this.props.infants}
                        </div>

                        <div className="guest-icon" onClick={this.props.decreaseInfantCount}>
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
              <p className="guest-choice">{this.props.adults} adults,</p>
              <p className="guest-choice">{this.props.children} children,</p>
              <p className="guest-choice">{this.props.infants} infants</p>
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