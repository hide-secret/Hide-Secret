const cookieParser = require("cookie-parser");

module.exports = {

  checkCookie (req, res, next){
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


}