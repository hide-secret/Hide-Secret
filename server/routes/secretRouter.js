const express = require("express");
const secretController = require("../controllers/secretController");
const router = express.Router();

//get all secret route
router.get("/", secretController.getAllSecrets, (req, res) => {
  res.status(200).json(res.locals.secrets);
});

//post a secret route
router.post("/", secretController.postNewSecret, (req, res) => {
  res.status(200).json({});
});

//get all secret stash route
router.post("/stash", secretController.getUserStash, (req, res) => {
  res.status(200).json(res.locals.stash);
});

//update score and remove message from createdSecret table and
//create same secret in stash table with user who found secret id
router.patch("/", secretController.deleteAndStashSecret, (req, res) => {
  res.status(200).json({});
});

module.exports = router;
