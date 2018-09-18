module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Players", {
      player_name: {
        type: DataTypes.STRING
      },
      games_played: {
        type: DataTypes.INTEGER
      }
    }, {
      timestamps: false
    });
    return Player;
  };