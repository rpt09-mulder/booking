const mongoose = require('mongoose');
let mongo_uri;
// Loading DB
if(process.env.NODE_ENV === 'development'){
  const keys = require('../config/keys')
  mongo_uri = keys.mongodbUri
} else {
  mongo_uri = process.env.mongo_uri
}


mongoose.connect(mongo_uri, { useNewUrlParser: true });

const db = mongoose.connection;

// Connecting to DB
db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});