const express = require('express');
const middlewareObj = require('../middleware/index.js');
const router = express.Router({ mergerParams: true });
const Problem = require('../models/problem.js')


// GET route show everything we have
router.get("/problem", function (req, res) {
  Problem.find(function (err, problem) {
    if (err) {
      console.log(err)
    } else {
      res.render("problems/index", { gallery: problem });
    }
  })
})

// create a new challenge for kids

router.post("/problem", function (req, res) {
  // CREATE A NEW  challenge
  const name = req.body.name;
  const time = req.body.time;
  const problem = req.body.problem;
  const input = req.body.input;
  const output = req.body.output;



  const newChallenge = {
    name: name,
    time: time,
    problem: problem,
    input: input,
    output: output
  };
  console.log(req.user)
  Problem.create(newChallenge, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('problem')
    }
  })
})

// NEW ROUTES //  there is a form to fill up and send to POST to create a new problem in the DB
router.get("/problem/new", function (req, res) {
  res.render("problems/new")
})

// SHOW route show one problem each
router.get("/:id", middlewareObj.isLoggedIn, function (req, res) {
  Problem.findById(req.params.id, function (error, oneproblem) {
    res.render("codingpage", { specific: oneproblem })
  })
})

// EDIT problem
router.get("/:id/edit", function (req, res) {
  Problem.findById(req.params.id, function (err, foundProblem) {
    res.render("problems/edit", { problem: foundProblem })
  })
})

// UPDATE problem
router.put("/:id", function (req, res) {
  //find an update a correct problem
  Problem.findByIdAndUpdate(req.params.id, req.body.problem, function (err, updatedProblem) {
    if (err) {
      res.redirect("problem")
    } else {
      res.redirect("/" + req.params.id)
    }
  })
  //redirect to show page
})

// DESTROY problem
router.delete("/:id", function (req, res) {
  Problem.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("problem")
    } else {
      res.redirect("problem")
    }
  })
})


module.exports = router