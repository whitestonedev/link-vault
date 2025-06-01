import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { TurnstileWidget } from "./TurnstileWidget";
import { useStatistics } from "../hooks/useStatistics";

interface LinkButtonProps {
  slug: string;
  name: string;
  link: string;
  imageLink: string;
  iconName?: keyof typeof Icons;
  iconLink?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  slug,
  name,
  link,
  imageLink,
  iconName,
  iconLink,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { trackView, trackClick } = useStatistics();

  // Busca o ícone dinamicamente
  const IconComponent = iconName
    ? (Icons[iconName] as React.ComponentType<{ className?: string }>)
    : null;

  const handleButtonClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      trackView(slug);
    }
  };

  const handleCaptchaSuccess = (token: string) => {
    setIsVerified(true);
    trackClick(slug);

    // Simula validação do token e redireciona
    setTimeout(() => {
      window.open(link, "_blank");
      setIsExpanded(false);
      setIsVerified(false);
    }, 500);
  };

  const handleCaptchaError = () => {
    console.error("Erro no captcha");
  };

  const handleCaptchaExpired = () => {
    setIsVerified(false);
  };

  return (
    <motion.div
      layout
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        layout
        onClick={handleButtonClick}
        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 
                 hover:bg-white/20 transition-all duration-300 text-white group
                 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {iconLink ? (
              <img src={iconLink} alt={name} className="w-8 rounded" />
            ) : IconComponent ? (
              <IconComponent className="w-6 h-6 text-blue-400" />
            ) : (
              <img src={imageLink} alt={name} className="w-6 h-6 rounded" />
            )}
            <span className="font-medium">{name}</span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icons.ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="text-center">
              <h3 className="text-white font-medium mb-4">
                Verificação de Segurança
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                Complete a verificação para acessar {name}
              </p>

              <div className="flex justify-center mb-4">
                <TurnstileWidget
                  onSuccess={handleCaptchaSuccess}
                  onError={handleCaptchaError}
                  onExpired={handleCaptchaExpired}
                />
              </div>

              {isVerified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-400 text-sm"
                >
                  ✓ Verificado! Redirecionando...
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
