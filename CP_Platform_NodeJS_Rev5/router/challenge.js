const express = require('express');
const request = require('request');
const middlewareObj = require('../middleware/index.js');
const router = express.Router({ mergerParams: true });
const Problem = require('../models/problem.js')


var languages = require('../Public/js/compile-languages.json')
var result


// COMPLILE CODE!

router.post("/sendCode",function(req,res){
  //CODE AUGMENTATION
  var code = req.body.code
  if(languages.find(element => element.id == req.body.lang).starter_replace!=""){
    code = indent(code,1)
    code = languages.find(element => element.id == req.body.lang).starter + code + languages.find(element => element.id == req.body.lang).ender
  }else{
    code = code.replace(languages.find(element => element.id == req.body.lang).starter_replace,languages.find(element => element.id == req.body.lang).starter) + languages.find(element => element.id == req.body.lang).ender
  }

  console.log(code)
  sendCode(req,res,code,req.body.lang)
})

router.get("/view",function(req,res){
  var message

  //REPLACE THIS WITH DB CORRECT ANSWER
  var answer = "4 6 0 8 12"
  //===================================

  if(result.replace(/\s+/g, "") == answer.replace(/\s+/g, "")){
    message = "Code Correct"
  } else{
    message = "Wrong Answer"
  }
  res.render("view", {result:result, message:message})
})


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
router.get("/:id", 
// middlewareObj.isLoggedIn, 
function (req, res) {
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


function sendCode(req,res, code, lang, callback){
  console.log(languages)
  var program = {
      script : code,
      
      //REPLACE THIS WITH DB TEST INPUT
      stdin:"5\n1 3\n2 4\n0 0\n3 5\n2 10\n",
      //===============================

      language: languages.find(element => element.id == lang).jdoodleName,
      versionIndex: "0",
      clientId: "1aa782187897f6a178108a3cb0cb8e9",
      clientSecret:"59a5c63fb21d6286c219f2bd1cee296c221b2f9d4f1b45cefd7cad62c06eb00e"
  };
  request({
      url: 'https://api.jdoodle.com/v1/execute',
      method: "POST",
      json: program
  },
  function (error, response, body) {
      // console.log(error + '\n' + response && response.statusCode + '\n' + body)

      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
      // console.log('body:', body);
      result = body.output
      res.redirect("/view")

  });
}

function indent(str, numOfIndents, opt_spacesPerIndent) {
  str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('\t'));
  numOfIndents = new Array(opt_spacesPerIndent + 1 || 0).join(' '); // re-use
  return opt_spacesPerIndent
    ? str.replace(/^\t+/g, function(tabs) {
        return tabs.replace(/./g, numOfIndents);
    })
    : str;
}

module.exports = router