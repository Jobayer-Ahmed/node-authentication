// Dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Creating app
const app = express();

// Env variables
dotenv.config({verbose: true});

// connect to mongodb
mongoose.connect('mongodb://localhost/authentication', (err) => {
	if (err) throw err;
});

// Dealing with cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "*" for public access and www.example.com for specific uses
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Express middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./routes/register'));

// Declearing Port
const port = process.env.PORT || 3000;

// Starting Port
app.listen(port, () => {
	console.log('App is running on port ' + port);
});