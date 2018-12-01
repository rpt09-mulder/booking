const mongoose = require('mongoose')

// Loading DB
mongoose.connect('mongodb://localhost/fireBnb-booking');
const db = mongoose.connection;

// Connecting to DB
db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});
