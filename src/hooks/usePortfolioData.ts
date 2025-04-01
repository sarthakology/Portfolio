import { useState, useEffect } from 'react';
import { PortfolioData } from '../types/PortfolioTypes';
import portfolioData from '../data/portfolio-data.json';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // In a real application, you might fetch this from an API
      // For now, we're importing it directly
      setData(portfolioData as unknown as PortfolioData);

      setLoading(false);
    } catch (err) {
      setError('Failed to load portfolio data');
      setLoading(false);
      console.error('Error loading portfolio data:', err);
    }
  }, []);

  return { data, loading, error };
};

export default usePortfolioData;
