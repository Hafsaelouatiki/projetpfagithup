import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import VeterinarianDashboard from "./pages/VeterinarianDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Events from "./pages/Events";
import AppointmentBooking from "./pages/AppointmentBooking";
import Services from "./pages/Services";
import Ventes from "./pages/Ventes";
import Panier from "./pages/Panier";
import Paiement from "./pages/Paiement";
import Facture from "./pages/Facture";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar panier={panier} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/veterinarian-dashboard" element={<VeterinarianDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/appointments" element={<AppointmentBooking />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/ventes"
                  element={
                    <Ventes
                      panier={panier}
                      setPanier={setPanier}
                      total={total}
                      setTotal={setTotal}
                    />
                  }
                />
                <Route path="/panier" element={<Panier panier={panier} total={total} />} />
                <Route
                  path="/paiement"
                  element={
                    <Paiement
                      selectedDate={null}
                      selectedTime={null}
                      selectedPet={null}
                      selectedService={null}
                      selectedVet={null}
                      typePaiement="store"
                    />
                  }
                />
                <Route path="/facture" element={<Facture />} />
                <Route path="/veterinaire" element={<VeterinarianDashboard />} />
                <Route path="/patient" element={<PatientDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
