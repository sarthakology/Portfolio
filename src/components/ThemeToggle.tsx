import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme.tsx';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 ${className}`} />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === 'dark'
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

export default ThemeToggle;
