import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import usePortfolioData from '../hooks/usePortfolioData';
import SectionContainer from '../components/SectionContainer';

const ProjectsPage = () => {
  const { data, loading } = usePortfolioData();
  const [filter, setFilter] = useState<string>('all');

  if (loading || !data) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(
      data.projects.flatMap(project => project.technologies)
    )
  );

  // Filter projects based on selected technology
  const filteredProjects = filter === 'all'
    ? data.projects
    : data.projects.filter(project => project.technologies.includes(filter));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <SectionContainer
        title="My Projects"
        subtitle="A collection of projects I've worked on, showcasing my skills and experience."
      >
        {/* Filter Options */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            Filter by Technology:
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              } transition-colors`}
            >
              All
            </button>

            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No projects found with the selected technology.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default ProjectsPage;
