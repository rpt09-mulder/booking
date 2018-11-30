const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const seeder = require('./seeder')

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving Static Files
app.use(express.static(path.join(__dirname, '../client/public')));


// Call Seeder func
seeder();

// Declaring Server Port
const port = 5555;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});