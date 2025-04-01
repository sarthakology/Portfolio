import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import usePortfolioData from '../hooks/usePortfolioData';

const Hero = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return <div className="h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  const { name, title, bio, socialLinks } = data.personal;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm {name.split(' ')[0]}.
              <br />
              <span className="text-blue-600">{title}</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {bio}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors"
              >
                View Projects <FiArrowRight className="ml-2" />
              </Link>

              <Link
                to="/contact"
                className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Me
              </Link>
            </motion.div>

            <motion.div
              className="flex space-x-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
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
            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-2">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {title}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
