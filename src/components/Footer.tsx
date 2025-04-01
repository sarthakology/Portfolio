import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import usePortfolioData from '../hooks/usePortfolioData';

const Footer = () => {
  const { data, loading } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  if (loading || !data) return <div className="h-20 bg-gray-100 dark:bg-gray-900"></div>;

  const { name, socialLinks } = data.personal;

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              &copy; {currentYear} {name}. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </a>
            )}

            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={24} />
              </a>
            )}

            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
