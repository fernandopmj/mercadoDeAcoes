import express from "express";
import cors from "cors";
import userRoutes from "./routers/userRoutes";
import stockRoutes from "./routers/stockRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", stockRoutes);

// Default endpoint /
app.get("/", (req, res) => {
  res.send("🔥 API de mercado de ações está funcionando! 🔥");
});

//Qualquer rota nao tratada.
app.use((_, res) => {
  res.status(404).send("Route not found");
});

// Iniciar o servidor
app.listen(process.env.API_PORT, () => {
  console.log("🔥 Listening on port " + process.env.API_PORT);
});
