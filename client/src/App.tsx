import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/navigation";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Switch>
        {isLoading || !isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route path="/about" component={About} />
          </>
        ) : (
          <>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/about" component={About} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-brain text-2xl text-indigo-400"></i>
                <span className="text-xl font-bold">EmoSense</span>
              </div>
              <p className="text-slate-400">
                Advanced AI emotion detection for better communication and understanding.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EmoSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
