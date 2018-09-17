var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/questions", function(req, res) {
    db.Question.findAll({}).then(function(dbQuestions) {
      console.log(dbQuestions);
      res.json(dbQuestions);
    });
  });
  
  // Post route for adding new question to db
  app.post("/api/questions", function(req, res) {
    console.log(req.body);
    db.Question.create({
      quest_text: req.body.quest_text,
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
