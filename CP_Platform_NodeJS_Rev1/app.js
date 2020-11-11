const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var unirest = require('unirest');

//const Languages = require('./models/languages.js')

// Hide creds from repo
/*const mongoDB = process.env.MONGODB_URL;

// Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set a callback to let us know we've successfully connected
db.once('open', function () {
  console.log('Connected to DB...');
});*/


const app = express()
app.use(require("express-session")({
  secret: "Yessi is the best dog ever",
  resave: false,
  saveUninitialized: false
}))




/**END POINTS */
app.use(express.static(path.join(__dirname, 'Public')));
app.set("view engine", "ejs")

app.get('/', function (request, response) {
  response.render('mainpage');
})

app.get('/codingpage', function (request, response) {
  
    response.render('codingpage');


})

// JSON api endpoint

unirest.get('judge0.p.rapidapi.com')
  .header("X-RapidAPI-Key", 'fb0e781148msh89f403588aab478p199540jsn84ef056e595a')
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Junotech online coding is running")
})