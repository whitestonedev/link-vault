
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBeams />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="mb-6">
              <h1 className="text-6xl font-bold text-white mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Página não encontrada
              </h2>
              <p className="text-gray-300">
                A página que você está procurando não existe ou foi movida.
              </p>
            </div>
            
            <button
              onClick={handleBackClick}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 
                       text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
