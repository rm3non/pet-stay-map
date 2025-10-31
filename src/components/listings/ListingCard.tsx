import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/lib/format';
import type { Listing } from '@/lib/types';

type ListingCardProps = {
  listing: Listing;
  onClick: () => void;
  isSelected?: boolean;
  onHover?: (listing: Listing | null) => void;
};

export function ListingCard({ listing, onClick, isSelected, onHover }: ListingCardProps) {
  const photo = listing.photos?.[0];
  const title = listing.title || 'Cozy Pet Stay';
  const price = listing.price_per_night || 0;
  const city = listing.city || 'Unknown';

  return (
    <Card
      className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-elegant ${
        isSelected ? 'ring-2 ring-primary shadow-glow' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => onHover?.(listing)}
      onMouseLeave={() => onHover?.(null)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          {photo ? (
            <img
              src={photo.url}
              alt={photo.alt || title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-secondary text-muted-foreground">
              🏠 No image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {listing.verified && (
            <Badge className="absolute right-2 top-2 animate-pulse bg-primary shadow-glow">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold">{title}</h3>
            {listing.rating !== undefined && listing.rating > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{listing.rating.toFixed(1)}</span>
                {listing.reviews_count !== undefined && listing.reviews_count > 0 && (
                  <span className="text-muted-foreground">({listing.reviews_count})</span>
                )}
              </div>
            )}
          </div>

          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{city}</span>
            {listing.distance_km !== undefined && (
              <span>• {listing.distance_km.toFixed(1)}km away</span>
            )}
          </div>

          {listing.size_supported && listing.size_supported.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {listing.size_supported.map((size) => (
                <Badge key={size} variant="secondary" className="text-xs capitalize">
                  {size}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-baseline gap-1">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-lg font-bold text-transparent">
              {formatINR(price)}
            </span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
