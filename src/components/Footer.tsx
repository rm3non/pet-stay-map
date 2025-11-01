import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">PawMigos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              India's trusted platform for pet-friendly accommodations. Find the perfect home for your furry friends.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Hosts</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/host" className="text-muted-foreground hover:text-primary transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="/host/guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Hosting Guide
                </Link>
              </li>
              <li>
                <Link to="/host/safety" className="text-muted-foreground hover:text-primary transition-colors">
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PawMigos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
