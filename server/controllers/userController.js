const db = require('../Database/Database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  createUser: (req, res, next) => {
    let {username, password} = req.body;
    let passwordQuery = "INSERT INTO users (username, password) VALUES ($1, $2)";
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err){
        console.log(err);
        return next(err);
      }
      // Store hash in your password DB.
    db.query(passwordQuery, [username, hash])
    .then(() => {
      res.cookie('name', username)
      next()})
    .catch(err => {
      console.log(err);
      next(err)
    })
  })
  },

  userLogOut: (req, res, next) => {
    console.log("cookies: ",res.cookies)
    res.clearCookie("name")
    console.log(res.cookies)
    return next()
  },

  checkAvailableUsername: (req, res, next) => {
    let {username} = req.body;
    let userNameQuery = "SELECT username FROM users WHERE (username) = $1";
    db.query(userNameQuery, [username])
    .then(data => {
      if(data.rows.length !== 0){
        return next('Username already exists')
      } 
      return next()
    })
    .catch (err => {
      return next(err)
    })
  },

  checkLogin: (req, res, next) => {
    console.log('in check login controller')
    let {username, password} = req.body;
    let query = 'SELECT * FROM users WHERE username = ($1)';
    db.query(query, [username])
    .then(data => {
      bcrypt.compare(password, data.rows[0].password, (err, result) => {
        if(err) return next(err);
        //password matches
        res.cookie('name', username)
        res.locals.userInfo = data.rows
        return next();
      })
    })
  }
}