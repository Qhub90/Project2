module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      player: {
        type: DataTypes.STRING
      },
      quest1: {
        type: DataTypes.STRING
      },
      quest2: {
        type: DataTypes.STRING
      },
      ans1: {
        type: DataTypes.STRING
      },
      ans2: {
        type: DataTypes.STRING
      },
      ansv1: {
        type: DataTypes.INTEGER
      },
      ansv2: {
        type: DataTypes.INTEGER
      },
      score: {
        type: DataTypes.INTEGER
      },
    }, {
      timestamps: false
    });
    return Game;
  };
  