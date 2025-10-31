import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Award } from 'lucide-react';
import heroPetsImage from '@/assets/hero-pets-happy.jpg';

export default function About() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-accent-mint/10 to-accent-coral/10 py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroPetsImage} 
              alt="Happy pets" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About PawMigos</h1>
              <p className="text-xl text-muted-foreground animate-fade-in">
                We're on a mission to make travel stress-free for pet parents across India
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  Founded in 2024, PawMigos was born from a simple idea: every pet deserves a comfortable home, 
                  especially when traveling. We've built India's first dedicated platform connecting pet owners 
                  with verified, pet-friendly accommodations.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Pet-First</h3>
                    <p className="text-sm text-muted-foreground">
                      Every decision we make puts pets and their comfort first
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent-mint/20 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-accent-mint" />
                    </div>
                    <h3 className="font-semibold mb-2">Verified Hosts</h3>
                    <p className="text-sm text-muted-foreground">
                      All hosts are thoroughly vetted for safety and quality
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent-coral/20 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-accent-coral" />
                    </div>
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of pet parents who trust PawMigos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-accent-gold" />
                    </div>
                    <h3 className="font-semibold mb-2">Excellence</h3>
                    <p className="text-sm text-muted-foreground">
                      Committed to providing exceptional experiences
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-accent-mint/5">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">Our Impact</h3>
                  <div className="grid gap-6 md:grid-cols-3 text-center">
                    <div>
                      <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                      <p className="text-muted-foreground">Happy Pets</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-accent-mint mb-2">500+</div>
                      <p className="text-muted-foreground">Verified Listings</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-accent-coral mb-2">50+</div>
                      <p className="text-muted-foreground">Cities Covered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
