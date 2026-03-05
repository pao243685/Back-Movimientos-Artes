import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artworksRouter from "./routes/artworks.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/artworks", artworksRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err);
});