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
app.use((req, res) => {
  res.status(404);
});

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running: ${HOSTNAME}:${PORT}`);
});
