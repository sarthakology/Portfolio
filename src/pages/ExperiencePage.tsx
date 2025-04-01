import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import usePortfolioData from '../hooks/usePortfolioData';
import SectionContainer from '../components/SectionContainer';

const ExperiencePage = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  const { experience } = data;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <SectionContainer
        title="Professional Experience"
        subtitle="My journey in the tech industry and the skills I've developed along the way."
      >
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-900"></div>

          <div className="space-y-16">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.company + exp.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-6 h-6 rounded-full bg-blue-600"></div>

                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative border-t-4 border-blue-600">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-gray-600 dark:text-gray-300 text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>{exp.startDate} - {exp.endDate}</span>
                      </div>

                      <div className="flex items-center">
                        <FiMapPin className="mr-1" />
                        <span>{exp.location}</span>
                      </div>

                      <div className="flex items-center">
                        <FiBriefcase className="mr-1" />
                        <span>{exp.mode}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                            >
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ExperiencePage;
