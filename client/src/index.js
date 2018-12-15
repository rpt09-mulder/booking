import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

window.Booking = App;


console.log('leslie', document)

ReactDOM.render(
  <App />,
  document.getElementById('booking')
);


