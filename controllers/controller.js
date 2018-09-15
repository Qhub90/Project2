var express = require("express");
var router = express.Router();
var question = require("../models/question");

router.get("/", function(req, res) {
      res.render("index");
});

router.get("/game/", function(req, res) {
    res.render("game");
});









module.exports = router;