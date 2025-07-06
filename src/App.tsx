
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Services from "./pages/Services";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen w-full">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="transition-all duration-300 ease-in-out">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <div className="animate-fade-in">
                      <Dashboard />
                    </div>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/invoices" 
                element={
                  <AuthGuard>
                    <div className="animate-fade-in">
                      <Invoices />
                    </div>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/customers" 
                element={
                  <AuthGuard>
                    <div className="animate-fade-in">
                      <Customers />
                    </div>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/services" 
                element={
                  <AuthGuard>
                    <div className="animate-fade-in">
                      <Services />
                    </div>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <AuthGuard>
                    <div className="animate-fade-in">
                      <Reports />
                    </div>
                  </AuthGuard>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
