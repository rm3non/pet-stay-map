import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Home, MapPin, DollarSign } from 'lucide-react';
import { z } from 'zod';

const listingSchema = z.object({
  title: z.string().trim().min(10, 'Title must be at least 10 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().trim().min(50, 'Description must be at least 50 characters').max(2000, 'Description must be less than 2000 characters'),
  address: z.string().trim().min(10, 'Address must be at least 10 characters').max(200, 'Address must be less than 200 characters'),
  city: z.string().trim().min(2, 'City must be at least 2 characters').max(50, 'City must be less than 50 characters'),
  state: z.string().trim().min(2, 'State must be at least 2 characters').max(50, 'State must be less than 50 characters'),
  nightly_price_inr: z.number().int('Price must be a whole number').positive('Price must be positive').max(100000, 'Price must be less than ₹100,000'),
  deposit_inr: z.number().int('Deposit must be a whole number').nonnegative('Deposit cannot be negative').max(50000, 'Deposit must be less than ₹50,000'),
  lat: z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude'),
  lng: z.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude'),
});

export default function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    nightly_price_inr: '',
    deposit_inr: '',
    lat: '',
    lng: '',
  });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validationResult = listingSchema.safeParse({
        title: formData.title,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        nightly_price_inr: parseFloat(formData.nightly_price_inr) || 0,
        deposit_inr: parseFloat(formData.deposit_inr) || 0,
        lat: parseFloat(formData.lat) || 0,
        lng: parseFloat(formData.lng) || 0,
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message);
        setIsSubmitting(false);
        return;
      }

      const validated = validationResult.data;

      const { data, error } = await supabase
        .from('listings')
        .insert({
          host_id: user.id,
          title: validated.title,
          description: validated.description,
          address: validated.address,
          city: validated.city,
          state: validated.state,
          nightly_price_inr: validated.nightly_price_inr,
          deposit_inr: validated.deposit_inr,
          lat: validated.lat,
          lng: validated.lng,
          status: 'active',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Listing created successfully!');
      navigate('/host');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create listing');
    }
    setIsSubmitting(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        <div className="container max-w-3xl py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/host')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
            <p className="text-muted-foreground">Share your space with pet owners</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Listing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Listing Title*</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    placeholder="e.g., Cozy Pet-Friendly Home with Garden"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Describe your space and what makes it great for pets..."
                    rows={5}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      placeholder="Mumbai"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State*</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => updateFormData('state', e.target.value)}
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address*</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="Street address"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Latitude*</Label>
                    <Input
                      id="lat"
                      required
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) => updateFormData('lat', e.target.value)}
                      placeholder="19.0760"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lng">Longitude*</Label>
                    <Input
                      id="lng"
                      required
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) => updateFormData('lng', e.target.value)}
                      placeholder="72.8777"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Nightly Price (₹)*</Label>
                    <Input
                      id="price"
                      required
                      type="number"
                      min="0"
                      value={formData.nightly_price_inr}
                      onChange={(e) => updateFormData('nightly_price_inr', e.target.value)}
                      placeholder="1500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deposit">Deposit (₹)</Label>
                    <Input
                      id="deposit"
                      type="number"
                      min="0"
                      value={formData.deposit_inr}
                      onChange={(e) => updateFormData('deposit_inr', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/host')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 gradient-primary shadow-elegant"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Listing'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
