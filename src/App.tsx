import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LinkPage } from "./pages/LinkPage";
import { Paths } from "./pages/Paths";
import NotFound from "./pages/NotFound";
import linksData from "./data/links.json";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paths" element={<Paths />} />
          {/* Rotas dinâmicas para cada link */}
          {linksData.map((link) => (
            <Route key={link.slug} path={`/:slug`} element={<LinkPage />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
