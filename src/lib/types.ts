export type Listing = {
  id: string;
  title?: string;
  city?: string;
  price_per_night?: number;
  currency?: 'INR' | string;
  lat?: number;
  lng?: number;
  rating?: number;
  reviews_count?: number;
  pet_types?: string[];
  size_supported?: ('small' | 'medium' | 'large')[];
  photos?: { url: string; alt?: string }[];
  host?: { name?: string; avatar_url?: string };
  distance_km?: number;
  amenities?: string[];
  verified?: boolean;
};

export type SearchResponse = {
  ok: boolean;
  total?: number;
  results: Listing[];
};

export type SearchParams = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  verified?: boolean;
  from?: string;
  to?: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
};
