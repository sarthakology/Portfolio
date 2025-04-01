import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import usePortfolioData from '../hooks/usePortfolioData';
import SectionContainer from './SectionContainer';

const FeaturedProjects = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return <div className="py-16 bg-gray-100 dark:bg-gray-900"></div>;
  }

  const featuredProjects = data.projects.filter(project => project.featured);

  return (
    <SectionContainer
      title="Featured Projects"
      subtitle="Here are some of my recent projects that showcase my skills and experience."
      className="bg-gray-50 dark:bg-gray-800"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FiExternalLink className="mr-1" /> Live Demo
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FiGithub className="mr-1" /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/projects"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          View All Projects
        </Link>
      </div>
    </SectionContainer>
  );
};

export default FeaturedProjects;
