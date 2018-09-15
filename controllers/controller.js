var express = require("express");
var router = express.Router();
var question = require("../models/question");

router.get("/", function(req, res) {
      res.render("index");
});

router.get("/game/", function(req, res) {
    res.render("game");
});

router.post("api/game/:id", function(req, res) {
    question.create(["question", ])
}









module.exports = router;