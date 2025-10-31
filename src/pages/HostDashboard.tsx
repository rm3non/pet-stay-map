import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Home, Calendar, DollarSign, Star } from 'lucide-react';

export default function HostDashboard() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('host_id', user?.id);

    if (!error && data) {
      setListings(data);
    }
    setIsLoading(false);
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Host Dashboard</h1>
              <p className="text-muted-foreground">Manage your listings and bookings</p>
            </div>
            <Button className="gradient-primary shadow-elegant" asChild>
              <Link to="/host/listing/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Listing
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.filter(l => l.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">{listings.length === 0 ? 'No active listings' : 'Active listings'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹0</div>
                <p className="text-xs text-muted-foreground">Total earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">No reviews yet</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : listings.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                      <p className="text-muted-foreground mb-4">Create your first listing to start hosting</p>
                      <Button className="gradient-primary shadow-elegant" asChild>
                        <Link to="/host/listing/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Listing
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground">{listing.city}, {listing.state}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-lg font-bold">₹{listing.nightly_price_inr}/night</span>
                            <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                              {listing.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No booking requests</h3>
                <p className="text-muted-foreground">Requests will appear here once guests book your listings</p>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Calendar coming soon</h3>
                    <p className="text-muted-foreground">Manage your availability here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
