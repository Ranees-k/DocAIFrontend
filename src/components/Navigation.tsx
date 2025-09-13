import { Button } from "../components/ui/button";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('authToken');
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent tracking-tight">
              DocAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => {
                const footerSection = document.getElementById('footer');
                if (footerSection) {
                  footerSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isLoggedIn && isLoggedIn.length > 0 ? (
              <Button 
                variant="ghost" 
                onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
                className="hidden sm:flex hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 font-medium text-gray-600"
              >
                Sign Out
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/login')} 
                variant="ghost" 
                className="hidden sm:flex hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 font-medium text-gray-600"
              >
                Sign In
              </Button>
            )}
            
            <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 group">
              Get Premium
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-purple-50 text-gray-600 hover:text-purple-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-purple-100 shadow-lg overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-2'
        }`}>
          <div className={`p-6 space-y-4 transition-all duration-500 delay-100 ${
            isMenuOpen 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform -translate-y-4 opacity-0'
          }`}>
            <button 
              className="block w-full text-left text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </button>
            <button 
              className="block w-full text-left text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </button>
            <button 
              className="block w-full text-left text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </button>
            
            <div className="pt-4 border-t border-purple-100">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-purple-50 hover:text-purple-600 font-medium text-gray-600 mb-3"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Get Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
