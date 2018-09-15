// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm");

var question = {
  all: function(cb) {
    orm.all("questions", function(res) {
        cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("questions", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("questions", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("questions", condition, function(res) {
        cb(res);
    });
  }
};

// Export the database functions for the controller (burgerController.js).
module.exports = question;
