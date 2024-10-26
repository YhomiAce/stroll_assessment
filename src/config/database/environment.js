require("dotenv").config();
module.exports = {
  development: {
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    dialect: process.env.DIALECT,
  },
  production: {
    host: process.env.RDS_DB_HOST,
    database: process.env.RDS_POSTGRES_DB,
    username: process.env.RDS_POSTGRES_USER,
    password: process.env.RDS_POSTGRES_PASSWORD,
    port: process.env.RDS_POSTGRES_PORT,
    dialect: process.env.DIALECT,
  },
};

