import { Artwork } from "../types/artwork.types";
import dotenv from "dotenv";

dotenv.config();

const AIC_BASE_URL = process.env.AIC_BASE_URL;
const FIELDS = process.env.AIC_FIELDS;
const LIMIT = process.env.AIC_LIMIT;

export async function getArtworksByMovement(movement: string): Promise<Artwork[]> {
      const url = `${AIC_BASE_URL}/artworks/search?q=${encodeURIComponent(movement)}&fields=${FIELDS}&limit=${LIMIT}`;
  
  console.log("URL que se está llamando:", url);
  const response = await fetch(
    `${AIC_BASE_URL}/artworks/search?q=${encodeURIComponent(movement)}&fields=${FIELDS}&limit=${LIMIT}`
  );

  if (!response.ok) {
    throw new Error(`Error al consultar la API externa: ${response.status}`);
  }

  const data = await response.json();

  return data.data.map((item: any) => ({
    id: item.id,
    title: item.title ?? "Sin título",
    artist: item.artist_display ?? "Artista desconocido",
    year: item.date_display ?? "—",
    movement: item.style_title ?? movement,
    imageUrl: item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`
      : null,
  }));
}