import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Stars.css'

const Stars = ({average, count}) => {
  
  const half =  (!!(average % 1));

  const starArray = [];

  let i = 0;

  for(; i < average; i++){
    starArray.push(<FontAwesomeIcon key={i} className="star-icon" icon="star"/>)
  }
  if(half){
    starArray.pop()
    starArray.push(<FontAwesomeIcon key={i++} className="star-icon" icon="star-half"/>)
  }

  return (
    <div>
       <a className="stars" href="#reviews">
       {starArray.map(star => star)}
       </a>
       <span className="count">
        {count}
       </span>
    </div>
  )
}

export default Stars;
