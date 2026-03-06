import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artworksRouter from "./routes/artworks.route";

dotenv.config();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MET_BASE_URL = process.env.MET_BASE_URL;

if (!MET_BASE_URL) {
  console.error("Falta la variable de entorno MET_BASE_URL");
  process.exit(1);
}

const app = express();

const allowedOrigins = FRONTEND_URL 

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api/artworks", artworksRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err);
});