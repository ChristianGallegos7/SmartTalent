const mongoose = require("mongoose");

const DEFAULT_URI = "mongodb://127.0.0.1:27017/smarttalent-odm";

async function connection() {
  const uri = process.env.MONGO_URI || DEFAULT_URI;

  try {
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(uri);

    console.log(`Conectado a MongoDB: ${mongoose.connection.name}`);

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB desconectado");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw new Error("No se pudo establecer la conexión con MongoDB");
  }
}

async function disconnect() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("MongoDB desconectado correctamente");
  }
}

module.exports = { connection, disconnect };
