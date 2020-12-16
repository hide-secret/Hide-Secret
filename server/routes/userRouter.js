const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');


router.post('/login', cookieController.checkCookie, userController.checkLogin, (req, res) => res.status(200).json({}));

router.post('/signup',cookieController.checkCookie ,userController.checkAvailableUsername, userController.createUser, (req, res) => res.status(200).json({}))

router.get('/logout', cookieController.userLogOut, (req, res) => res.status(200).json({}));

module.exports = router;
