var express = require("express");
var router = express.Router();
var question = require("../models/question.js");

router.get("/", function (req, res) {
    question.all(function(data) {
        var hbsObject = {
            questions: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject); 
    });
});

router.post("/api/questions", function(req, res) {
    question.create([
        "question"
    ], [
        req.body.quesiton
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/questions/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    question.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404);
        } else {
        res.status(200).end();
        }
    });
});

router.delete("/api/questions/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    question.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404);
        } else {
            res.status(200).end();
        }
    });
});




module.exports = router;