// const cookieParser = require("cookie-parser");

module.exports = {

  checkCookie (req, res, next){
    console.log('in check cookie')
    const {username, password} = req.body;
    if(req.cookies.name === username){
      console.log('found cookies ', req.cookies)
      res.redirect('http://localhost:8080/')
    }else{
      return next()
    }
  },
  userLogOut: (req, res, next) => {
    console.log("cookies: ",res.cookies)
    res.clearCookie("name")
    console.log(res.cookies)
    return next()
  },

  setCookie (req, res, next) {
    console.log('in setCookie middleware')
   //deconstruct user and pass from req.body obj
   const {username} = req.body;
  //  console.log("username", username)
   res.cookie('name', username)
     return next();
 },


}