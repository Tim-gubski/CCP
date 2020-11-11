const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var unirest = require('unirest');
const fs = require('fs');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const excelMongo = require('excel-to-mongoDB');
const bodyParser =require ('body-parser');
const request = require('request');
const flash = require("connect-flash");
const methodOverride = require('method-override')


/**MODELS */
const Languages = require('./models/languages.js')
const Problem = require('./models/problem.js')

/**INITIAL SET UP */
const app = express()
app.use(bodyParser.urlencoded ({extended:true}));
app.use(express.static(path.join(__dirname, 'Public')));
app.set("view engine", "ejs")
app.use(flash())
app.use(methodOverride("_method"))

// requiring routes
const problemRouter = require('./router/challenge');
const { render } = require('ejs');

/****************************************************************************** MONGO DB CONNECTION********************************************************** */
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to DB...');
});





/*****************************************************************************AUTHENTICATION*/
app.use(require("express-session")({
  secret: "Yessi is the best dog ever",
  resave: false,
  saveUninitialized: false
}))



/********************************************************************************END POINTS */
      
app.get('/', function (request, response) {
  response.render('index');
})

/******************************************************************************* CONNECT TO API */

/************************************ */


app.use(problemRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Junotech online coding is running")
})