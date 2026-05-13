import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/games", gameRoutes);

app.listen(3000, () => {
  console.log("API rodando na porta 3000 🚀");
});