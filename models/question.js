module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    quest_text: {
      type: DataTypes.STRING
    },
    tag1: {
      type: DataTypes.STRING
    },
    tag2: {
      type: DataTypes.STRING
    },
    tag3: {
      type: DataTypes.STRING
    },
    tag4: {
      type: DataTypes.STRING
    },
    tag5: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: false
  });
  return Question
};
