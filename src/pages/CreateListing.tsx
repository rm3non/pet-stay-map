import { useState } from 'react';
import { Header } from '@/components/Header';
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
      const { data, error } = await supabase
        .from('listings')
        .insert({
          host_id: user.id,
          title: formData.title,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          nightly_price_inr: parseInt(formData.nightly_price_inr),
          deposit_inr: parseInt(formData.deposit_inr) || 0,
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
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

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
