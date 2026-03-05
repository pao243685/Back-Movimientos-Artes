export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  movement: string;
  imageUrl: string | null;
}

export interface ArtworkDetail {
  id: number;
  title: string;
  artist: string;
  year: string;
  movement: string;
  department: string;
  medium: string;
  dimensions: string;
  imageUrl: string | null;
}