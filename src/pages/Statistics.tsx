
import React from 'react';
import { BackgroundBeams } from '../components/BackgroundBeams';
import { useStatistics } from '../hooks/useStatistics';
import { ArrowLeft, Eye, MousePointer, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import linksData from '../data/links.json';

export const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const { statistics } = useStatistics();

  const handleBackClick = () => {
    navigate('/');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const totalViews = statistics.reduce((sum, stat) => sum + stat.views, 0);
  const totalClicks = statistics.reduce((sum, stat) => sum + stat.clicks, 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBeams />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Estatísticas</h1>
            <div></div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total de Visualizações</p>
                  <p className="text-2xl font-bold text-white">{totalViews}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total de Cliques</p>
                  <p className="text-2xl font-bold text-white">{totalClicks}</p>
                </div>
                <MousePointer className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-white">
                    {totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0}%
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Estatísticas por Link</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-medium">Link</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Visualizações</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Cliques</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Conversão</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Último Acesso</th>
                  </tr>
                </thead>
                <tbody>
                  {linksData.map((link) => {
                    const stat = statistics.find(s => s.slug === link.slug) || {
                      slug: link.slug,
                      views: 0,
                      clicks: 0,
                      lastAccessed: new Date()
                    };
                    
                    const conversionRate = stat.views > 0 ? (stat.clicks / stat.views) * 100 : 0;

                    return (
                      <tr key={link.slug} className="border-t border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={link.image_link}
                              alt={link.name}
                              className="w-8 h-8 rounded"
                            />
                            <span className="text-white font-medium">{link.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300">{stat.views}</td>
                        <td className="p-4 text-gray-300">{stat.clicks}</td>
                        <td className="p-4 text-gray-300">{conversionRate.toFixed(1)}%</td>
                        <td className="p-4 text-gray-300 text-sm">
                          {formatDate(stat.lastAccessed)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
