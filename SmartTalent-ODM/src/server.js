require("dotenv").config();
const { connection } = require("./Infraestructura/database/MongoDB");
const buildApp = require("./app");

const PORT = process.env.PORT || 3001;

async function main() {
  await connection();

  const app = buildApp();

  app.listen(PORT, () => {
    console.log(`Servidor ODM escuchando en http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Error al iniciar el servidor:", err);
  process.exit(1);
});
