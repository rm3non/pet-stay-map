import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MapMarker } from './MapMarker';
import { Skeleton } from '../ui/skeleton';
import type { Listing } from '@/lib/types';

const AHMEDABAD_CENTER = { lat: 23.0225, lng: 72.5714 };

type MapProps = {
  listings: Listing[];
  selectedId?: string;
  hoveredId?: string;
  onMarkerClick: (listing: Listing) => void;
};

export function Map({ listings, selectedId, hoveredId, onMarkerClick }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY || '',
  });

  if (!isLoaded) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={AHMEDABAD_CENTER}
      zoom={12}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {listings.map((listing) => {
        if (listing.lat === undefined || listing.lng === undefined) return null;
        
        return (
          <MapMarker
            key={listing.id}
            listing={listing}
            isSelected={selectedId === listing.id}
            isHovered={hoveredId === listing.id}
            onClick={() => onMarkerClick(listing)}
          />
        );
      })}
    </GoogleMap>
  );
}
