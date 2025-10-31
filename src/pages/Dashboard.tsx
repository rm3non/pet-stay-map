import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Heart, Settings, Home, PawPrint } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your bookings and listings</p>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="pets">My Pets</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Upcoming Stay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold">Cozy Pet Haven</p>
                      <p className="text-sm text-muted-foreground">Mumbai, Maharashtra</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Jan 15-20, 2025</span>
                      </div>
                      <Badge>Confirmed</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Pending Request</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold">Sunny Pet Paradise</p>
                      <p className="text-sm text-muted-foreground">Bangalore, Karnataka</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Feb 10-15, 2025</span>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Button variant="outline" asChild>
                  <Link to="/">Browse more listings</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pets" className="space-y-4">
              <div className="text-center py-12">
                <PawPrint className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Manage your pets</h3>
                <p className="text-muted-foreground mb-4">Add and manage pet profiles for bookings</p>
                <Button variant="outline" asChild>
                  <Link to="/pets">Manage Pets</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">Start exploring and save your favorite listings</p>
                <Button variant="outline" asChild>
                  <Link to="/">Browse listings</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
