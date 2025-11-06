import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Atendimento from "./pages/Atendimento";
import Pacientes from "./pages/Pacientes";
import Prontuarios from "./pages/Prontuarios";
import Configuracoes from "./pages/Configuracoes";
import ConfiguracoesConta from "./pages/ConfiguracoesConta";
import ConfiguracoesConvenios from "./pages/ConfiguracoesConvenios";
import Auth from "./pages/Auth";
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
          <Route path="/cadastro" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/prontuarios" element={<Prontuarios />} />
          <Route path="/configuracoes/clinica" element={<Configuracoes />} />
          <Route path="/configuracoes/clinica/convenios" element={<ConfiguracoesConvenios />} />
          <Route path="/configuracoes/conta" element={<ConfiguracoesConta />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
