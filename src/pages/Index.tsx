import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Users, Award, Search, Calendar, MessageSquare, Home, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import heroPetsImage from '@/assets/hero-pets-happy.jpg';
import petsSearchingImage from '@/assets/pets-searching.jpg';
import petsTravelingImage from '@/assets/pets-traveling.jpg';
import petsWithHostImage from '@/assets/pets-with-host.jpg';
import petsRelaxingImage from '@/assets/pets-relaxing.jpg';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const faqs = [
    {
      q: 'What types of pets are allowed?',
      a: 'Most of our listings welcome dogs and cats of all sizes. Some hosts also accommodate small pets like rabbits or birds. Check the listing details for specific pet policies.',
    },
    {
      q: 'Are there any additional fees for pets?',
      a: 'All pricing is transparent and shown upfront. Some hosts may charge a pet deposit (refundable) or cleaning fee. These are clearly displayed before you book.',
    },
    {
      q: 'How much does it cost to list my property?',
      a: 'Listing your property is completely free. We only charge a small service fee (5%) when you successfully complete a booking.',
    },
    {
      q: 'How do I get verified as a host?',
      a: 'Our verification process includes identity verification, property photos, and a quick video call. It typically takes 1-2 business days.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets popular in India.',
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Cancellation policies vary by listing. Common options include flexible (full refund up to 24 hours before check-in) and moderate (full refund up to 5 days before check-in).',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-accent-mint/10 to-accent-coral/10 py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroPetsImage} 
              alt="Happy pets enjoying their stay" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Pet-Friendly Stays Across India
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
                Travel stress-free with your furry friends. Find verified, comfortable homes for your pets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Link to="/search">
                  <Button size="lg" className="gradient-primary shadow-elegant w-full sm:w-auto">
                    <Search className="mr-2 h-5 w-5" />
                    Start Searching
                  </Button>
                </Link>
                <Link to="/host">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Become a Host
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
                <p className="text-lg text-muted-foreground">
                  Founded in 2024, PawMigos was born from a simple idea: every pet deserves a comfortable home, 
                  especially when traveling. We've built India's first dedicated platform connecting pet owners 
                  with verified, pet-friendly accommodations.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                <Card className="hover-scale">
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

                <Card className="hover-scale">
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

                <Card className="hover-scale">
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

                <Card className="hover-scale">
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

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
              
              <div className="space-y-8">
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
                              Filter by pet size, amenities, price range, and more.
                            </p>
                          </div>
                        </div>
                        <img 
                          src={petsSearchingImage} 
                          alt="Finding the perfect pet-friendly stay" 
                          className="rounded-lg w-full h-48 object-cover"
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
                          alt="Booking your pet-friendly accommodation" 
                          className="rounded-lg w-full h-48 object-cover"
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
                              Message your host directly to discuss special requirements and ask questions 
                              before your stay.
                            </p>
                          </div>
                        </div>
                        <img 
                          src={petsWithHostImage} 
                          alt="Connecting with your pet-friendly host" 
                          className="rounded-lg w-full h-48 object-cover"
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
                          alt="Pets enjoying their comfortable stay" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link to="/search">
                  <Button size="lg" className="gradient-primary shadow-elegant">
                    <Search className="mr-2 h-5 w-5" />
                    Start Searching
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* For Hosts Section */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Host</h2>
                <p className="text-lg text-muted-foreground">
                  Share your pet-friendly space and earn extra income while helping pet families
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3 mb-12">
                <Card className="hover-scale">
                  <CardContent className="pt-6">
                    <CheckCircle className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">List Your Property</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a detailed listing with photos, amenities, and house rules. 
                      It's free to list and takes just minutes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-scale">
                  <CardContent className="pt-6">
                    <Shield className="h-10 w-10 text-accent-mint mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Get Verified</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete our simple verification process to build trust with pet parents 
                      and get featured listings.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-scale">
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

              <div className="text-center">
                <Link to="/host">
                  <Button size="lg" variant="outline">
                    Become a Host
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Find answers to common questions about PawMigos
                </p>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="text-center mt-8">
                <Link to="/faq">
                  <Button variant="outline">View All FAQs</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-accent-mint/10 to-accent-coral/10">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Find Your Pet's Perfect Stay?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of happy pet parents who trust PawMigos for their travels
              </p>
              <Link to="/search">
                <Button size="lg" className="gradient-primary shadow-elegant">
                  <Search className="mr-2 h-5 w-5" />
                  Start Searching Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
