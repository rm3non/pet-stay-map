import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Star, MapPin, Shield, Home, Users, Wifi, Coffee, Car, CheckCircle } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [petSize, setPetSize] = useState<string>('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    if (!id) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        listing_photos (url, sort_order),
        host:users!listings_host_id_fkey (id, name, photo_url)
      `)
      .eq('id', id)
      .single();

    if (error) {
      toast.error('Failed to load listing');
      navigate('/');
    } else {
      setListing(data);
    }
    setIsLoading(false);
  };

  const handleBooking = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!dateRange?.from || !dateRange?.to || !petSize) {
      toast.error('Please select dates and pet size');
      return;
    }

    setIsSubmitting(true);
    try {
      // First, get user's pets to find a matching one
      const { data: pets } = await supabase
        .from('pets')
        .select('id')
        .eq('owner_id', user.id)
        .limit(1);

      if (!pets || pets.length === 0) {
        toast.error('Please add a pet profile first');
        navigate('/pets');
        setIsSubmitting(false);
        return;
      }

      const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
      const subtotal = nights * listing.nightly_price_inr;
      const taxes = Math.round(subtotal * 0.18); // 18% GST
      const platformFee = Math.round(subtotal * 0.05); // 5% platform fee
      const total = subtotal + taxes + platformFee;

      const { error } = await supabase
        .from('bookings')
        .insert({
          listing_id: id,
          owner_id: user.id,
          pet_id: pets[0].id,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0],
          nights,
          price_subtotal_inr: subtotal,
          taxes_inr: taxes,
          platform_fee_inr: platformFee,
          total_inr: total,
          status: 'requested',
        });

      if (error) throw error;

      toast.success('Booking request sent!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col">
        <Header onAuthClick={() => setAuthModalOpen(true)} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const photos = listing.listing_photos?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];
  const mainPhoto = photos[0]?.url || '/placeholder.svg';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        <div className="container py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div>
              <div className="rounded-lg overflow-hidden mb-6">
                <img src={mainPhoto} alt={listing.title} className="w-full h-96 object-cover" />
              </div>

              {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {photos.slice(1, 5).map((photo: any, idx: number) => (
                    <img key={idx} src={photo.url} alt="" className="rounded-lg h-24 w-full object-cover" />
                  ))}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold">{listing.title}</h1>
                    {listing.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.city}, {listing.state}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
                      <span className="font-medium">4.8</span>
                      <span>(24 reviews)</span>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">About this listing</h2>
                    <p className="text-muted-foreground">{listing.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-primary" />
                        <span>Pet-friendly home</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Max 2 pets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-primary" />
                        <span>WiFi included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coffee className="h-5 w-5 text-primary" />
                        <span>Pet supplies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-primary" />
                        <span>Parking available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Outdoor space</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
                    <div className="flex items-center gap-4">
                      <img 
                        src={listing.host?.photo_url || '/placeholder.svg'} 
                        alt={listing.host?.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{listing.host?.name}</h3>
                        <p className="text-sm text-muted-foreground">Joined 2023 · 15 reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <div className="text-3xl font-bold">₹{listing.nightly_price_inr}</div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select dates</label>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pet size</label>
                    <Select value={petSize} onValueChange={setPetSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (under 10kg)</SelectItem>
                        <SelectItem value="medium">Medium (10-25kg)</SelectItem>
                        <SelectItem value="large">Large (over 25kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Special requests (optional)</label>
                    <Textarea
                      placeholder="Any special care instructions..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button 
                    className="w-full gradient-primary shadow-elegant" 
                    onClick={handleBooking}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Request to Book'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
