var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/questions", function(req, res) {
    db.Question.findAll({}).then(function(dbQuestions) {
      console.log(dbQuestions);
      res.json(dbQuestions);
    });
  });
  

  // Create a new example
  app.post("/api/questions", function(req, res) {
    db.Author.create(req.body).then(function(dbQuestions) {
      res.json(dbQuestions);
    });
  });
};
