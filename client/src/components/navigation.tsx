import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <i className="fas fa-brain text-2xl text-indigo-600"></i>
            <span className="text-xl font-bold text-slate-800">EmoSense</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${location === '/' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>
              Home
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className={`transition-colors ${location === '/dashboard' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>
                Dashboard
              </Link>
            )}
            <Link href="/about" className={`transition-colors ${location === '/about' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>
              About
            </Link>
            
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || 'User'} />
                  <AvatarFallback>
                    {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-700">
                <i className="fab fa-google mr-2"></i>Sign In
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-slate-200"
        >
          <div className="px-4 py-2 space-y-2">
            <Link href="/" className="block py-2 text-slate-600 hover:text-indigo-600">
              Home
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="block py-2 text-slate-600 hover:text-indigo-600">
                Dashboard
              </Link>
            )}
            <Link href="/about" className="block py-2 text-slate-600 hover:text-indigo-600">
              About
            </Link>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="outline" className="w-full mt-2">
                Sign Out
              </Button>
            ) : (
              <Button onClick={handleLogin} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700">
                <i className="fab fa-google mr-2"></i>Sign In
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
