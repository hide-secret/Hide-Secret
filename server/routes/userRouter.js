const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

router.post('/login', cookieController.checkCookie, userController.checkLogin, cookieController.setCookie, (req, res) => res.status(200).json(res.locals.userInfo));

router.post('/signup',cookieController.checkCookie ,userController.checkAvailableUsername, userController.createUser, (req, res) => res.status(200).json({message: "Success!"}))

router.get('/logout', cookieController.userLogOut, (req, res) => res.status(200).json({}));

module.exports = router;
