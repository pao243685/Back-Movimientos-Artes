import { Router, Request, Response } from "express";
import { getArtworksByMovement, getArtworkById} from "../services/artworks.service";

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

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params["id"] as string);

  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }

  try {
    const artwork = await getArtworkById(id);
    if (!artwork) {
      res.status(404).json({ error: "Obra no encontrada." });
      return;
    }
    res.json({ artwork });
  } catch (error) {
    console.error("[GET /api/artworks/:id]", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;

