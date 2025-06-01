import React, { useEffect, useState } from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import { LinkButton } from "../components/LinkButton";
import linksData from "../data/links.json";
import { useStatistics } from "../hooks/useStatistics";
import * as Icons from "lucide-react";

interface LinkData {
  slug: string;
  name: string;
  link: string;
  image_link: string;
  icon_name?: keyof typeof Icons;
  icon_link?: string;
  position: number;
  visible: boolean;
}

export const Home: React.FC = () => {
  const [sortedLinks, setSortedLinks] = useState<LinkData[]>([]);
  const { trackView } = useStatistics();

  useEffect(() => {
    // Ordena os links por position, colocando links sem position válida no final
    const sorted = [...linksData]
      .filter((link) => link.visible)
      .sort((a, b) => {
        const posA = typeof a.position === "number" ? a.position : Infinity;
        const posB = typeof b.position === "number" ? b.position : Infinity;
        return posA - posB;
      });

    setSortedLinks(sorted);
    trackView("home");
  }, [trackView]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBeams />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="https://statics.whitestonedev.com.br/site/wsd_logo.png"
              alt="WhiteStone Dev"
              className="w-[300px] mx-auto mb-6 drop-shadow-2xl"
            />

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                WhiteStone Dev
              </h1>
              <p className="text-lg text-gray-300 max-w-[350px] mx-auto leading-relaxed">
                Conecte-se conosco através dos nossos canais oficiais.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            {sortedLinks.map((linkData) => (
              <LinkButton
                key={linkData.slug}
                slug={linkData.slug}
                name={linkData.name}
                link={linkData.link}
                imageLink={linkData.image_link}
                iconName={linkData.icon_name}
                iconLink={linkData.icon_link}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} WhiteStone Dev. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
