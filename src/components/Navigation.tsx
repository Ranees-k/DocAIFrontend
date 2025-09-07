import { Button } from "../components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
// import { ThemeToggle } from "../components/ThemeToggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('authToken');
  const navigate = useNavigate();
  console.log(isLoggedIn);

  return (
    <nav className="fixed top-0 bg left-0 right-0 z-50 glass-morphism border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-glow">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-3xl font-bold text-gradient tracking-tight">
              DocAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium story-link">
              Features
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium story-link">
              Pricing
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium story-link">
              About
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* <ThemeToggle /> */}
            {isLoggedIn && isLoggedIn.length > 0 ? (
              <Button 
                variant="ghost" 
                onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
                className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium"
              >
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate('/login')} variant="ghost" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium">
              Sign In
            </Button>
            )}
            <Button className="bg-black hover:shadow-glow hover:scale-105 transition-all duration-500 px-4 sm:px-6 font-bold rounded-2xl text-sm sm:text-base animate-glow">
              Get Premium
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-morphism border-t border-primary/20 animate-fade-in">
            <div className="p-4 space-y-4">
              <a 
                href="#features" 
                className="block text-foreground/80 hover:text-primary transition-all duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block text-foreground/80 hover:text-primary transition-all duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="block text-foreground/80 hover:text-primary transition-all duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <Button variant="ghost" className="w-full justify-start hover:bg-primary/10 hover:text-primary font-medium">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}