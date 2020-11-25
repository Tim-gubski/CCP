// import mongoose
const mongoose = require("mongoose");
// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// Import seed data
const dbSeed = require('./seeds/problem.js');

// Define model
const Problem = require('./models/problem')

// /*******************************/
// /* Mongoose/MongoDB Connection */
// /*******************************/

const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
  Problem.insertMany(dbSeed, function(error, animal) {
    console.log('Data import completed.')
    mongoose.connection.close();
  });
});