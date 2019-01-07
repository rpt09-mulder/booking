import React, { Component } from 'react';
import Stars from './Stars';
import Price from './Price';
import axios from 'axios';



class Reviews extends Component {

  state={
    reviewsCount: null,
    reviewsAverage: null,
  }

  componentDidMount(){
    axios.get('http://firebnb-reviews.8di9c2yryn.us-east-1.elasticbeanstalk.com/ratings/26')
      .then((result) => {
        this.setState({
          reviewsCount: result.data.numReviews,
          reviewsAverage: result.data.avgRating
        })
      })
  }

  render() {

    const { reviewsAverage, reviewsCount } = this.state;

    return (
      <div className="reviews-wrapper">
          <Price />
          <Stars average={reviewsAverage} count={reviewsCount}/>
      </div>
    )
  }
}


export default Reviews;

