module.exports = function(sequelize, DataTypes) {
    var Highscore = sequelize.define("Highscore", {
        score: DataTypes.INTEGER
    });
    Highscore.associate = function(models) {
        Highscore.belongsTo(models.Account, {
          foreignKey: {
            allowNull: false
          }
        });
    };    
    return Highscore;
};