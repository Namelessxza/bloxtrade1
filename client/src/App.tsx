import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import TradeListing from "./pages/TradeListing";
import Dashboard from "./pages/Dashboard";
import MyTrades from "./pages/MyTrades";
import CreateTrade from "./pages/CreateTrade";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-trades" element={<MyTrades />} />
      <Route path="/create-trade" element={<CreateTrade />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/trade/:id" element={<TradeListing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
