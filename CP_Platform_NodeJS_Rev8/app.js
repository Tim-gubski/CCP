const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const request = require('request');
const flash = require("connect-flash");

const methodOverride = require('method-override')


/**MODELS */
const User = require('./models/user')
const Problem = require('./models/problem.js')


/**INITIAL SET UP */
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.set("view engine", "ejs")
app.use(flash())
app.use(methodOverride("_method"))

// requiring routes
const problemRouter = require('./router/challenge');
const auth = require('./router/auth');
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
  secret: "Online coding challenge is on",
  resave: false,
  saveUninitialized: false
}))

// Always need when working with passwords
app.use(passport.initialize());
app.use(passport.session())
// reading, encoding and uncoding the the login information
passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next()
})


/********************************************************************************END POINTS */

/******************************************************************************* CONNECT TO API */

/***********************************CONNECTING TO ROUTES* */

app.use(auth)
app.use(problemRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Junotech online coding is running")
})