/**
 * Home Page (Landing Page)
 * Hero section with key metrics and quick navigation
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Users, Zap, ArrowRight } from 'lucide-react';
import type { Contributor } from '../types/github';

const REPOSITORIES = [
  'narainkarthikv/GLIS',
  'narainkarthikv/contribution-cards',
  'narainkarthikv/fit-track',
  'narainkarthikv/sticky-memo',
  'narainkarthikv/readme-shop',
  'narainkarthikv/nmoji',
];

interface HomeProps {
  contributors: Contributor[] | null;
  isLoading: boolean;
}

export const Home: React.FC<HomeProps> = ({ contributors, isLoading }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalContributions: 0,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
        className="relative overflow-hidden py-20 md:py-32 px-4"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10 dark:opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-10 dark:opacity-20" />

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Logo and Badge */}
          <motion.div variants={item} className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap size={16} />
              Dynamic GitHub Contributors
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Celebrate the People
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              Who Build
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Dynamically pulled from GitHub. Filter, sort, and explore contributors across multiple repositories with interactive insights.
          </motion.p>

          {/* Stats Grid */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {isLoading ? '...' : value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contributors')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Explore Contributors
              <ArrowRight size={20} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/narainkarthikv"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <Github size={20} />
              View on GitHub
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Repositories Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Repositories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Contributors from these amazing projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Github size={24} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {repo.split('/')[1]}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {repo}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to explore contributors?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contributors')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
          >
            View All Contributors
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};
