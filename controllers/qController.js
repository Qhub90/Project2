var express = require("express");
var router = express.Router();
var question = require("../models/question");

router.get("/", function(req, res) {
    question.all(function(data) {
      var hbsObject = {
        question: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

router.post("/api/questions", function(req, res) {
    question.create([
        "question"
    ], [
        req.body.question
    ], function(result) {
        // Send back the ID of the new q
        res.json({ id: result.insertId });
    });
});


module.exports = router;