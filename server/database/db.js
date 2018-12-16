const mongoose = require('mongoose')

// Loading DB
<<<<<<< HEAD
mongoose.connect('mongodb://localhost/fireBnb-booking', { useNewUrlParser: true });
=======
<<<<<<< HEAD
mongoose.connect('mongodb://localhost/fireBnb-booking', { useNewUrlParser: true });
=======
mongoose.connect('mongodb://localhost/fireBnb-booking');
>>>>>>> b49d326a004eda1fcf4178c2b7e952bc5663f027
>>>>>>> master
const db = mongoose.connection;

// Connecting to DB
db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});
<<<<<<< HEAD
=======
<<<<<<< HEAD



=======
>>>>>>> b49d326a004eda1fcf4178c2b7e952bc5663f027
>>>>>>> master
