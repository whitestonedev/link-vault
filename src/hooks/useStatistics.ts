
import { useState, useEffect } from 'react';

export interface LinkStatistics {
  slug: string;
  views: number;
  clicks: number;
  lastAccessed: Date;
}

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<LinkStatistics[]>([]);

  useEffect(() => {
    const savedStats = localStorage.getItem('linkStatistics');
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      setStatistics(parsed.map((stat: any) => ({
        ...stat,
        lastAccessed: new Date(stat.lastAccessed)
      })));
    }
  }, []);

  const saveStatistics = (stats: LinkStatistics[]) => {
    setStatistics(stats);
    localStorage.setItem('linkStatistics', JSON.stringify(stats));
  };

  const trackView = (slug: string) => {
    setStatistics(prev => {
      const existing = prev.find(stat => stat.slug === slug);
      const updatedStats = existing
        ? prev.map(stat => 
            stat.slug === slug 
              ? { ...stat, views: stat.views + 1, lastAccessed: new Date() }
              : stat
          )
        : [...prev, { slug, views: 1, clicks: 0, lastAccessed: new Date() }];
      
      saveStatistics(updatedStats);
      return updatedStats;
    });
  };

  const trackClick = (slug: string) => {
    setStatistics(prev => {
      const existing = prev.find(stat => stat.slug === slug);
      const updatedStats = existing
        ? prev.map(stat => 
            stat.slug === slug 
              ? { ...stat, clicks: stat.clicks + 1, lastAccessed: new Date() }
              : stat
          )
        : [...prev, { slug, views: 0, clicks: 1, lastAccessed: new Date() }];
      
      saveStatistics(updatedStats);
      return updatedStats;
    });
  };

  const getStatistics = (slug: string) => {
    return statistics.find(stat => stat.slug === slug) || {
      slug,
      views: 0,
      clicks: 0,
      lastAccessed: new Date()
    };
  };

  return {
    statistics,
    trackView,
    trackClick,
    getStatistics
  };
};
