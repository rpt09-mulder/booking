const mongoose = require('mongoose');
const keys = require('../config/keys')

// Loading DB

mongoose.connect(keys.mongodbUri, { useNewUrlParser: true });

const db = mongoose.connection;

// Connecting to DB
db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});