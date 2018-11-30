import React from 'react';
import { Calendar } from 'react-date-range';
const moment = require('moment');

class Booker extends React.Component {
   state={

      startDate: new Date(),
      endDate: '',
   }



  handleSelect = (range) => {
    console.log(range); // Momentjs object
  }

  render(){
    return(
      <div>
        
        <div>
          <input
          type="text"
          readOnly
          value={moment(this.state.startDate).format("MMM Do YY")}
          />
          <input
          type="text"
          readOnly
          value={this.state.endDate}
          />
        </div>


        <Calendar 
         onInit={this.handleSelect}
         onChange={this.handleSelect}
         showSelectionPreview={true}
         moveRangeOnFirstSelection={false}
         direction="horizontal"
        />
      </div>
    )
  }

}

export default Booker;