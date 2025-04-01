import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import usePortfolioData from '../hooks/usePortfolioData';
import SectionContainer from '../components/SectionContainer';

const AboutPage = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  const { personal, education } = data;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <SectionContainer title="About Me">
        <div className="grid md:grid-cols-3 gap-8">
        <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
              <div className="relative aspect-square rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center mb-4">
                <div className="text-7xl text-white font-bold">
                  <img src="https://firebasestorage.googleapis.com/v0/b/fir-44d31.appspot.com/o/project%2FIMG_8676.jpg?alt=media&token=7b4963e4-eedd-4296-8127-ecf09154d3ae" className="relative aspect-square rounded-xl" alt="" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{personal.name}</h2>
              <p className="text-blue-600 dark:text-blue-400 mb-4">{personal.title}</p>

              <div className="text-gray-600 dark:text-gray-300">
                <p>{personal.location}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {personal.bio}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Name</h3>
                  <p className="text-gray-800 dark:text-white">{personal.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="text-gray-800 dark:text-white">{personal.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Location</h3>
                  <p className="text-gray-800 dark:text-white">{personal.location}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="text-gray-800 dark:text-white">{personal.phone}</p>
                </div>
              </div>
            </div>

            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <FiDownload className="mr-2" /> Download Resume
              </a>
            )}
          </motion.div>


        </div>
      </SectionContainer>

      <SectionContainer
        title="Education"
        className="bg-gray-50 dark:bg-gray-800"
      >
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution + edu.degree}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">
                    {edu.institution}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {edu.location}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default AboutPage;
