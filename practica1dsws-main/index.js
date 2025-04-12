const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const gestosRoutes = require("./backend/routes/gestosroutes");

app.use(cors());
app.use(express.json());
app.use("/api/gestos", gestosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

