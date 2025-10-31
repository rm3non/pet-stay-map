import { ListingCard } from './ListingCard';
import { Skeleton } from '../ui/skeleton';
import type { Listing } from '@/lib/types';

type ListingListProps = {
  listings: Listing[];
  isLoading: boolean;
  selectedId?: string;
  onSelect: (listing: Listing) => void;
  onHover?: (listing: Listing | null) => void;
};

export function ListingList({
  listings,
  isLoading,
  selectedId,
  onSelect,
  onHover,
}: ListingListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-6xl opacity-50">🐾</div>
        <h3 className="mb-2 text-lg font-semibold">No listings found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search in a different area
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-1">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onClick={() => onSelect(listing)}
          isSelected={selectedId === listing.id}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
