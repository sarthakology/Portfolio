import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import usePortfolioData from '../hooks/usePortfolioData';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { data, loading } = usePortfolioData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const headerClass = scrolled
    ? 'bg-white dark:bg-gray-900 shadow-md'
    : 'bg-transparent';

  if (loading || !data) return <div className="h-16 bg-gray-100 dark:bg-gray-900"></div>;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          {data.personal.name.split(' ')[0]}
          <span className="text-blue-600">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex space-x-8 mr-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              About
            </Link>
            <Link to="/experience" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Experience
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Projects
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Contact
            </Link>
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-2" />
          <button
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/experience"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
            onClick={closeMenu}
          >
            Experience
          </Link>
          <Link
            to="/projects"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
            onClick={closeMenu}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
