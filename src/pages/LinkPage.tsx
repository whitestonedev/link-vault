import React, { useEffect, useState, ButtonHTMLAttributes } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../components/BackgroundBeams";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { useStatistics } from "../hooks/useStatistics";
import { ArrowLeft } from "lucide-react";
import linksData from "../data/links.json";

interface LinkData {
  slug: string;
  name: string;
  link: string;
  image_link: string;
  icon_name: string;
  position: number;
}

export const LinkPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const { trackView, trackClick } = useStatistics();

  useEffect(() => {
    if (slug) {
      const found = linksData.find((link) => link.slug === slug);
      if (found) {
        setLinkData(found);
        trackView(slug);
      } else {
        navigate("/");
      }
    }
  }, [slug, navigate, trackView]);

  const handleCaptchaVerify = (token: string) => {
    if (linkData && slug) {
      setIsVerified(true);
      trackClick(slug);

      setTimeout(() => {
        window.location.href = linkData.link;
      }, 1000);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  if (!linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBeams />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
            <div className="mb-8">
              <img
                src={linkData.image_link}
                alt={linkData.name}
                className="mx-auto mb-4 rounded-xl"
              />
              <h1 className="text-2xl font-bold text-white mb-2">
                {linkData.name}
              </h1>
              <p className="text-gray-300">
                Complete a verificação de segurança para acessar o link
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <TurnstileWidget
                  onSuccess={handleCaptchaVerify}
                  onError={() => console.error("Erro no captcha")}
                  onExpired={() => setIsVerified(false)}
                />
              </div>

              {isVerified && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-lg font-medium mb-2">
                    ✓ Verificação Concluída
                  </div>
                  <div className="text-green-300 text-sm">
                    Redirecionando para {linkData.name}...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Protegido por Cloudflare Turnstile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
