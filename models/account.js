module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len: [1 - 25]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4 - 12]
      }
    }
  });
  Account.associate = function (models) {
    Account.hasMany(models.Highscore, {
      onDelete: "cascade"
    });
  };
  return Account;
};