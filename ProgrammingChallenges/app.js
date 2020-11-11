var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

var request = require('request');

var app = express()
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use(flash())


var result = "";

app.get("/",function(req,res){
    res.render("index.ejs")
})

app.post("/sendCode",function(req,res){
    sendCode(req,res,req.body.code,"python3")
})

app.get("/view",function(req,res){
    console.log(result)
    res.render("view.ejs", {result:result})
})


app.listen(port,function(){
    console.log("Started")
})



function sendCode(req,res, code, lang, callback){
    var program = {
        script : code,
        language: lang,
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