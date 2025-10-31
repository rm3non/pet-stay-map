import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import type { SearchParams } from '@/lib/types';
import { cn } from '@/lib/utils';

type FiltersBarProps = {
  params: SearchParams;
  onApply: (params: Partial<SearchParams>) => void;
  onClear: () => void;
};

export function FiltersBar({ params, onApply, onClear }: FiltersBarProps) {
  const [city, setCity] = useState(params.city || 'Ahmedabad');
  const [priceRange, setPriceRange] = useState([
    params.minPrice || 500,
    params.maxPrice || 3000,
  ]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    params.size ? params.size.split(',') : []
  );
  const [verified, setVerified] = useState(params.verified || false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: params.from ? new Date(params.from) : undefined,
    to: params.to ? new Date(params.to) : undefined,
  });

  const sizes = ['small', 'medium', 'large'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleApply = () => {
    onApply({
      city,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      size: selectedSizes.length > 0 ? selectedSizes.join(',') : undefined,
      verified: verified || undefined,
      from: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      to: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    });
  };

  return (
    <div className="sticky top-16 z-40 border-b bg-background p-4">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
            </div>

            <div className="lg:col-span-2">
              <Label>Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
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

            <div className="lg:col-span-2">
              <Label>Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Label>
              <div className="pt-2">
                <Slider
                  min={500}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Label>Pet Size:</Label>
              {sizes.map((size) => (
                <Badge
                  key={size}
                  variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>

            <Badge
              variant={verified ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setVerified(!verified)}
            >
              Verified Hosts Only
            </Badge>

            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={onClear}>
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
              <Button size="sm" onClick={handleApply}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
