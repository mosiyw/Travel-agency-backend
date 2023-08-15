// env.js
require("dotenv").config();

const env = {
  DB_URL: DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
};

module.exports = env;
