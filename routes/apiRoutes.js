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
      .then(function(dbQuestions) {
        res.json(dbQuestions);
      });
  });

  app.get("/api/game", function(req, res) {
    db.Game.findAll({}).then(function(dbGame) {
      console.log(dbGame);
      res.json(dbGame);
    });
  });
  

  app.post("/api/game", function(req, res) {
    console.log(req.body);
    db.Game.create({
      player: req.body.player,
    })
      .then(function(dbGame) {
        res.json(dbGame);
      });
  });
};
