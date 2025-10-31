import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/pawmigos-logo.png';

type HeaderProps = {
  onAuthClick: () => void;
};

export function Header({ onAuthClick }: HeaderProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-24 items-center justify-between px-4 sm:h-28">
        <div className="flex items-center gap-6">
          <img 
            src={logo} 
            alt="PawMigos - Connecting pet lovers everywhere" 
            className="h-20 w-auto sm:h-24 mix-blend-multiply"
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                title="Sign out"
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button onClick={onAuthClick} className="gradient-primary shadow-elegant">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
