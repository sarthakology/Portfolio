import { motion } from 'framer-motion';
import usePortfolioData from '../hooks/usePortfolioData';
import SectionContainer from './SectionContainer';

const Skills = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return <div className="py-16 bg-white dark:bg-gray-900"></div>;
  }

  const { technical, soft } = data.skills;

  return (
    <SectionContainer
      title="My Skills"
      subtitle="Here are the technologies and tools I work with, along with soft skills that help me collaborate effectively."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Technical Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {technical.map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: '#3B82F6', color: '#FFFFFF' }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Soft Skills
          </h3>

          <div className="space-y-4">
            {soft.map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: '#EBF5FF', color: '#1E40AF' }}
              >
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {skill}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default Skills;
