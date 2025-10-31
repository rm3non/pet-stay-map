import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-2xl font-bold text-transparent">
            🐾 PawMigos
          </h1>
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
