require("dotenv").config();
const Sequelize = require("sequelize");
const config = require("./environment")[process.env.NODE_ENV];


const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    raw: true,
    port: config.port,
    seederStorage: process.env.SEEDER_STORAGE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database establised");
  })
  .catch(err => {
    console.error(`Unable to connect to database: ${err}`);
  });

module.exports = sequelize;
