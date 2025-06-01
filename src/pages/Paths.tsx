import React, { useState } from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import linksData from "../data/links.json";
import { ExternalLink, Copy, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

export const Paths: React.FC = () => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const navigate = useNavigate();

  const copyToClipboard = (slug: string) => {
    const url = `${window.location.origin}/#/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBeams />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-8">
            <div className="relative mb-6">
              <button
                onClick={() => navigate("/")}
                className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
                Links Disponíveis
              </h1>
            </div>

            <AnimatePresence>
              {copiedSlug && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Alert className="mb-4 bg-green-500/20 border-green-500/30">
                    <AlertDescription className="text-green-400">
                      Link copiado para a área de transferência!
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3 sm:space-y-4">
              {linksData.map((link) => (
                <div
                  key={link.slug}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-white font-medium">{link.name}</h2>
                      <p className="text-gray-400 text-sm">/{link.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        {link.visible ? "Visível" : "Oculto"}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(link.slug)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 
                                   text-gray-400 rounded-lg transition-colors text-sm"
                        >
                          {copiedSlug === link.slug ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span className="hidden sm:inline">
                            {copiedSlug === link.slug ? "Copiado!" : "Copiar"}
                          </span>
                        </button>
                        <a
                          href={`/#/${link.slug}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 
                                   text-blue-400 rounded-lg transition-colors text-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ir</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
