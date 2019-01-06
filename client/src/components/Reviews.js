import React, { Component } from 'react';
import axios from 'axios';



class Reviews extends Component {

  componentDidMount(){
    axios.get('http://firebnb-reviews.8di9c2yryn.us-east-1.elasticbeanstalk.com/ratings/1')
      .then((result) => {
        console.log(result)
      })
  }

  render() {
    return (
      <div>
        Reviews
      </div>
    )
  }
}


export default Reviews;

