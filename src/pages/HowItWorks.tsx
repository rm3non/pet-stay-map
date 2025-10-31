import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Calendar, MessageSquare, Home, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import petsSearchingImage from '@/assets/pets-searching.jpg';
import petsTravelingImage from '@/assets/pets-traveling.jpg';
import petsWithHostImage from '@/assets/pets-with-host.jpg';
import petsRelaxingImage from '@/assets/pets-relaxing.jpg';

export default function HowItWorks() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent-mint/10 to-accent-coral/10 py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How PawMigos Works</h1>
              <p className="text-xl text-muted-foreground">
                Finding the perfect pet-friendly stay is simple with PawMigos
              </p>
            </div>
          </div>
        </section>

        {/* For Pet Parents */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">For Pet Parents</h2>
              
              <div className="space-y-12">
                <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <Card className="hover-scale">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-[1fr_200px] gap-6 items-center">
                        <div className="flex items-start gap-4">
                          <Search className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
                            <p className="text-muted-foreground">
                              Use our advanced search to find pet-friendly stays in your desired location. 
                              Filter by pet size, amenities, price range, and more to find the perfect match.
                            </p>
                          </div>
                        </div>
                        <img 
                          src={petsSearchingImage} 
                          alt="Pets searching" 
                          className="rounded-lg w-full h-48 object-cover animate-fade-in"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
                  <div className="w-16 h-16 rounded-full bg-accent-mint/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-accent-mint">2</span>
                  </div>
                  <Card className="hover-scale">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-[1fr_200px] gap-6 items-center">
                        <div className="flex items-start gap-4">
                          <Calendar className="h-8 w-8 text-accent-mint flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Book Your Stay</h3>
                            <p className="text-muted-foreground">
                              Select your dates, provide your pet's information, and send a booking request. 
                              View transparent pricing including all fees upfront.
                            </p>
                          </div>
                        </div>
                        <img 
                          src={petsTravelingImage} 
                          alt="Pets traveling" 
                          className="rounded-lg w-full h-48 object-cover animate-fade-in"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
                  <div className="w-16 h-16 rounded-full bg-accent-coral/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-accent-coral">3</span>
                  </div>
                  <Card className="hover-scale">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-[1fr_200px] gap-6 items-center">
                        <div className="flex items-start gap-4">
                          <MessageSquare className="h-8 w-8 text-accent-coral flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Connect with Host</h3>
                            <p className="text-muted-foreground">
                              Message your host directly to discuss special requirements, ask questions, 
                              and get to know each other before your stay.
                            </p>
                          </div>
                        </div>
                        <img 
                          src={petsWithHostImage} 
                          alt="Pets with host" 
                          className="rounded-lg w-full h-48 object-cover animate-fade-in"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-accent-gold">4</span>
                  </div>
                  <Card className="hover-scale">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-[1fr_200px] gap-6 items-center">
                        <div className="flex items-start gap-4">
                          <Home className="h-8 w-8 text-accent-gold flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Enjoy Your Stay</h3>
                            <p className="text-muted-foreground">
                              Check in and enjoy a comfortable, pet-friendly experience. Our hosts are committed 
                              to making both you and your pet feel at home.
                            </p>
                          </div>
                        </div>
                        <img 
                          src={petsRelaxingImage} 
                          alt="Pets relaxing" 
                          className="rounded-lg w-full h-48 object-cover animate-fade-in"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link to="/">
                  <Button size="lg" className="gradient-primary shadow-elegant">
                    Start Searching
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* For Hosts */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">For Hosts</h2>
              
              <div className="grid gap-8 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <CheckCircle className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">List Your Property</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a detailed listing with photos, amenities, and house rules. 
                      It's free to list and takes just minutes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <Shield className="h-10 w-10 text-accent-mint mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Get Verified</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete our simple verification process to build trust with pet parents 
                      and get featured listings.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <Calendar className="h-10 w-10 text-accent-coral mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Start Hosting</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage bookings, communicate with guests, and earn extra income 
                      while helping pet families.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Link to="/host">
                  <Button size="lg" variant="outline">
                    Become a Host
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
