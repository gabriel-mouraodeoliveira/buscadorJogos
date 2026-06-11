import "dotenv/config";

import express from "express";
import cors from "cors";

import gameRoutes from "./routes/gameRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ai", aiRoutes);
app.use("/games", gameRoutes);

app.listen(3000, () => {
  console.log("API rodando na porta 3000 🚀");
});