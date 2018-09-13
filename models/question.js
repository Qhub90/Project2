// Import the ORM to create functions that will interact with the database.
var Qorm = require("../config/Qorm");

var question = {
  all: function(cb) {
    Qorm.all("questions", function(res) {
        cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    Qorm.create("questions", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    Qorm.update("questions", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    Qorm.delete("questions", condition, function(res) {
        cb(res);
    });
  }
};

// Export the database functions for the controller (burgerController.js).
module.exports = question;
