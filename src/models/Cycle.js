const { DataTypes } = require("sequelize");
const sequeliseConnection = require("../config/database/connection");
const Question = require("./Question");

const Cycle = sequeliseConnection.define(
  "Cycle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Question",
        key: "id",
      },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { tableName: "cycles", timestamps: false }
);

Cycle.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question"
});

module.exports = Cycle;
