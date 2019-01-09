import React from 'react';
import './Price.css'

const Price = ({price}) => {
  return (
    <div className="price-wrapper">
      <span className="listing-price">${price}</span><span className="per-night">per night</span> 
    </div>
  )
}

export default Price;
