/**
 * Home Page (Landing Page)
 * Hero section with key metrics and quick navigation
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Users, Zap, ArrowRight } from 'lucide-react';
import { useContributors } from '../hooks/useContributors';
import { REPOSITORIES } from '../App';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalContributions: 0,
  });

  const { data: contributors, isLoading } = useContributors({
    repositories: [REPOSITORIES[0]],
    enableAutoFetch: true,
  });

  useEffect(() => {
    if (contributors) {
      const totalContributors = contributors.length;
      const totalContributions = contributors.reduce(
        (sum, c) => sum + c.totalContributions,
        0
      );

      setStats({
        totalContributors,
        totalContributions,
      });
    }
  }, [contributors]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
        className="relative w-full overflow-hidden py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-400 rounded-full blur-3xl opacity-10 dark:opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-400 rounded-full blur-3xl opacity-10 dark:opacity-15 pointer-events-none" />

        <div className="relative w-full max-w-6xl mx-auto text-center">
          <motion.div variants={item} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              <Zap size={14} className="sm:w-4 sm:h-4" />
              Dynamic GitHub Contributors
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2"
          >
            Celebrate the People
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Who Build
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
          >
            Dynamically pulled from GitHub. Filter, sort, and explore contributors across multiple repositories with interactive insights.
          </motion.p>

          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              {
                icon: Users,
                value: stats.totalContributors,
                label: 'Contributors',
              },
              {
                icon: Zap,
                value: stats.totalContributions,
                label: 'Contributions',
              },
              {
                icon: Github,
                value: REPOSITORIES.length,
                label: 'Repositories',
              },
            ].map(({ icon: Icon, value, label }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 dark:text-blue-400 mb-3 sm:mb-4 mx-auto" />
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {isLoading ? '...' : value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contributors')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Explore Contributors
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/narainkarthikv"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
              View on GitHub
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              Featured Repositories
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
              Contributors from these amazing projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {REPOSITORIES.map((repo, idx) => (
              <motion.a
                key={repo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                href={`https://github.com/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Github size={20} className="sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                    {repo.split('/')[1]}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {repo}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to explore contributors?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contributors')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            View All Contributors
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};
