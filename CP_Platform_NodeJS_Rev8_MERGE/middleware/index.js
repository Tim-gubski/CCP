const middlewareObj={}

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash("error", "You need to be logged in to do it.")
  res.redirect ("/login")
}



module.exports = middlewareObj