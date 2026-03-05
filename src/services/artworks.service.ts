import { Artwork, ArtworkDetail} from "../types/artwork.types";
import dotenv from "dotenv";

dotenv.config();

const MET_BASE_URL = process.env.MET_BASE_URL!;
const LIMIT = parseInt(process.env.MET_LIMIT || "0");

async function fetchArtworkById(id: number): Promise<Artwork | null> {
  try {
    const response = await fetch(`${MET_BASE_URL}/objects/${id}`);
    if (!response.ok) return null;

    const item = await response.json();

    if (!item.primaryImage) return null;

    return {
      id: item.objectID,
      title: item.title ?? "Sin título",
      artist: item.artistDisplayName || "Artista desconocido",
      year: item.objectDate || "—",
      movement: item.classification || "",
      imageUrl: item.primaryImageSmall || item.primaryImage,
    };
  } catch {
    return null;
  }
}

const MOVEMENT_QUERIES: Record<string, string> = {
  Renaissance: "renaissance painting",
  Baroque: "baroque painting",
  Impressionism: "impressionism painting",
};

export async function getArtworksByMovement(movement: string): Promise<Artwork[]> {
  const query = MOVEMENT_QUERIES[movement] || movement;

  const searchResponse = await fetch(
    `${MET_BASE_URL}/search?q=${encodeURIComponent(query)}&hasImages=true`
  );

  if (!searchResponse.ok) {
    throw new Error(`Error al buscar obras: ${searchResponse.status}`);
  }

  const searchData = await searchResponse.json();

  if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
    return [];
  }

  const ids: number[] = searchData.objectIDs.slice(0, LIMIT * 2);

  const results = await Promise.all(ids.map(fetchArtworkById));

  return results
    .filter((a): a is Artwork => a !== null)
    .slice(0, LIMIT);
}


export async function getArtworkById(id: number): Promise<ArtworkDetail | null> {
  const response = await fetch(`${MET_BASE_URL}/objects/${id}`);
  if (!response.ok) return null;

  const item = await response.json();

  return {
    id: item.objectID,
    title: item.title ?? "Sin título",
    artist: item.artistDisplayName || "Artista desconocido",
    year: item.objectDate || "—",
    movement: item.classification || "—",
    department: item.department || "—",
    medium: item.medium || "—",
    dimensions: item.dimensions || "—",
    imageUrl: item.primaryImage || item.primaryImageSmall || null,
  };
}