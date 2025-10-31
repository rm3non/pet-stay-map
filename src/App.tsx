import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";
import HostDashboard from "./pages/HostDashboard";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import ManagePets from "./pages/ManagePets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/host/listing/new" element={<CreateListing />} />
          <Route path="/pets" element={<ManagePets />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
