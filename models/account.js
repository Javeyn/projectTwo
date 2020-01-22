module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });
    Account.associate = function(models) {
        Account.hasMany(models.Highscore, {
          onDelete: "cascade"
        });
    };    
    return Account;
};