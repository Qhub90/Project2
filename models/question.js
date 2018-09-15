module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    quest_text: DataTypes.STRING
  });
  return Question
};
