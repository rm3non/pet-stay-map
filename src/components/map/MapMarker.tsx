import { OverlayView } from '@react-google-maps/api';
import { formatINR } from '@/lib/format';
import type { Listing } from '@/lib/types';

type MapMarkerProps = {
  listing: Listing;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick: () => void;
};

export function MapMarker({ listing, isSelected, isHovered, onClick }: MapMarkerProps) {
  if (listing.lat === undefined || listing.lng === undefined) return null;

  const price = listing.price_per_night || 0;

  return (
    <OverlayView
      position={{ lat: listing.lat, lng: listing.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <button
        onClick={onClick}
        className={`
          rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg transition-all
          ${
            isSelected || isHovered
              ? 'scale-110 bg-primary text-primary-foreground'
              : 'bg-background text-foreground hover:scale-105'
          }
        `}
      >
        {formatINR(price)}
      </button>
    </OverlayView>
  );
}
