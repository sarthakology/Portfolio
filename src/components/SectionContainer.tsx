import * as React from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className = '',
  children,
  title,
  subtitle,
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${className}`}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}

            {subtitle && (
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
