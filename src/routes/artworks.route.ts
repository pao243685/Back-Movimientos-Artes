import { Router, Request, Response } from "express";
import { getArtworksByMovement } from "../services/artworks.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
      console.log("Query recibida:", req.query); 
  const movement = req.query.movement as string;

  if (!movement) {
    res.status(400).json({ error: "El parámetro 'movement' es requerido." });
    return;
  }

  try {
    const artworks = await getArtworksByMovement(movement);
    res.json({ artworks });
  } catch (error) {
    console.error("GET /api/artworks", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;