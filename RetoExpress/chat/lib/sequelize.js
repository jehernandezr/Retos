const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: "../data/db.sqlite",
});

sequelize.authenticate().then(() => {
  console.log("Conection has been stablished successfully");
});

module.exports = sequelize;
