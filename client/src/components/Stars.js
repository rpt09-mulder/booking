import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Stars.css'

const Stars = ({average, count}) => {
  
  const half =  (!!(average % 1));

  const starArray = [];

  for(let i = 0; i < average; i++){
    starArray.push(<FontAwesomeIcon key={i} className="star-icon" icon="star"/>)
  }
  if(half){
    starArray.push(<FontAwesomeIcon key={i++} className="star-icon" icon="half-star"/>)
  }

  return (
    <div>
      <span className="stars">
       {starArray.map(star => star)}
       </span>
       <span className="count">
        {count}
       </span>
    </div>
  )
}

export default Stars;
