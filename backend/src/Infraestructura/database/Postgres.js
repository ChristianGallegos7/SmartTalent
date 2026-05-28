const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bolsa_empleo", "postgres", "1234", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado");
  } catch (error) {
    console.error("Error PostgreSQL:", error);
    throw error;
  }
};

module.exports = { sequelize, connection };