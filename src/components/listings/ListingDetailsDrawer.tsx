import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Star, CheckCircle2, CalendarIcon, MapPin } from 'lucide-react';
import { formatINR } from '@/lib/format';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import type { Listing } from '@/lib/types';

type ListingDetailsDrawerProps = {
  listing: Listing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
};

export function ListingDetailsDrawer({
  listing,
  open,
  onOpenChange,
  isAuthenticated,
  onAuthRequired,
}: ListingDetailsDrawerProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [petSize, setPetSize] = useState<string>('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!listing) return null;

  const handleBooking = async () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (!dateRange?.from || !dateRange?.to || !petSize) {
      toast.error('Please select dates and pet size');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          fromDate: format(dateRange.from, 'yyyy-MM-dd'),
          toDate: format(dateRange.to, 'yyyy-MM-dd'),
          size: petSize,
          note,
        }),
      });

      if (!response.ok) throw new Error('Booking failed');

      toast.success('Booking request sent successfully!');
      onOpenChange(false);
      setDateRange(undefined);
      setPetSize('');
      setNote('');
    } catch (error) {
      toast.error('Failed to create booking request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{listing.title || 'Listing Details'}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Photos Carousel */}
          {listing.photos && listing.photos.length > 0 && (
            <div className="space-y-2">
              <div className="aspect-video overflow-hidden rounded-xl">
                <img
                  src={listing.photos[0].url}
                  alt={listing.photos[0].alt || listing.title}
                  className="h-full w-full object-cover"
                />
              </div>
              {listing.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {listing.photos.slice(1, 5).map((photo, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={photo.url}
                        alt={photo.alt || `Photo ${idx + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{listing.city}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{formatINR(listing.price_per_night || 0)}</span>
                  <span className="text-muted-foreground">/night</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {listing.verified && (
                  <Badge className="bg-primary">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
                {listing.rating !== undefined && listing.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                    {listing.reviews_count !== undefined && (
                      <span className="text-sm text-muted-foreground">
                        ({listing.reviews_count} reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Host */}
            {listing.host && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Avatar>
                  <AvatarFallback>
                    {listing.host.name?.charAt(0).toUpperCase() || 'H'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{listing.host.name || 'Host'}</div>
                  <div className="text-sm text-muted-foreground">Pet host</div>
                </div>
              </div>
            )}

            {/* Pet Sizes */}
            {listing.size_supported && listing.size_supported.length > 0 && (
              <div>
                <Label className="mb-2 block">Accepts pet sizes</Label>
                <div className="flex flex-wrap gap-2">
                  {listing.size_supported.map((size) => (
                    <Badge key={size} variant="secondary" className="capitalize">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div>
                <Label className="mb-2 block">Amenities</Label>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Request to Book</h3>

            <div>
              <Label>Select Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'mt-1 w-full justify-start text-left font-normal',
                      !dateRange.from && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from && dateRange?.to ? (
                      `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                    ) : (
                      'Select dates'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="pet-size">Pet Size</Label>
              <Select value={petSize} onValueChange={setPetSize}>
                <SelectTrigger id="pet-size" className="mt-1">
                  <SelectValue placeholder="Select pet size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special requirements or notes..."
                className="mt-1"
                rows={3}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleBooking}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request to Book'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
