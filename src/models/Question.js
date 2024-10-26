const Sequelize = require("sequelize");
const sequelize = require("../config/database/connection");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
  }
);

module.exports = Question;
