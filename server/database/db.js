const mongoose = require('mongoose')

// Loading DB
//'mongodb://localhost/fireBnb-booking'

const mongodbUri = 'mongodb://insivika:insivika123@ds139675.mlab.com:39675/firebnb-booking'

mongoose.connect(mongodbUri, { useNewUrlParser: true });

const db = mongoose.connection;

// Connecting to DB
db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});