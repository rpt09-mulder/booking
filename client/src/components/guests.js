import React from 'react';


class Guests extends React.Component {
  state= {
    adults: 2,
    children: null,
    infants: null,
    card: false
  }

  showCard = () => {
    this.setState({
      card: !this.state.card
    })
  }

  render(){
    let guestCard = null;

    if(this.state.card){
      guestCard = ( <div className="guestCard">

                      <div>
                        <h3>Adults</h3>
                      </div>
                      <div>
                         <h3>Children</h3>
                      </div>
                      <div>
                        <h3>Infants</h3>
                        
                      </div>
                    </div>)
    }

    return(
       <div>
         <div onClick={this.showCard} className="guests-display">
            <p>{this.state.adults} guests</p>
         </div>
         <div>
           {guestCard}
         </div>  
      </div>
    )
  }
}

export default Guests;