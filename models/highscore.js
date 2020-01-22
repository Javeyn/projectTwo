module.exports = function(sequelize, DataTypes) {
    var Highscore = sequelize.define("Highscore", {
        score:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        difficulty:{
            type: DataTypes.STRING,
            allowNull:false
        }
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