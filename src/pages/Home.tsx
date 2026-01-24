/**
 * Home Page (Landing Page) – VIEW
 * Refined hero, balanced typography, scroll-safe layout
 */

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Users, Zap, ArrowRight } from 'lucide-react';

import { useGlobalStats } from '../controllers/useGlobalStats';
import { REPOSITORY_LIST } from '../constants/repositories';

/* ----------------------------- Motion Variants ---------------------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

/* ------------------------------ UI Components ------------------------------ */

const VerticalStatCard = ({
  icon: Icon,
  value,
  label,
  loading,
  color = 'blue',
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  loading: boolean;
  color?: 'blue' | 'purple' | 'emerald';
}) => {
  const colorMap = {
    blue: 'from-blue-500/20 to-blue-600/10 dark:from-blue-500/30 dark:to-blue-600/20 border-l-4 border-l-blue-500',
    purple: 'from-purple-500/20 to-purple-600/10 dark:from-purple-500/30 dark:to-purple-600/20 border-l-4 border-l-purple-500',
    emerald: 'from-emerald-500/20 to-emerald-600/10 dark:from-emerald-500/30 dark:to-emerald-600/20 border-l-4 border-l-emerald-500',
  };

  const iconColorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
  };

  return (
    <motion.div
      variants={slideInRight}
      whileHover={{ x: 8, scale: 1.02 }}
      className={`
        relative rounded-xl backdrop-blur-sm
        bg-gradient-to-br ${colorMap[color]}
        px-6 py-6
        border border-gray-200/30 dark:border-slate-700/30
        shadow-sm transition
        hover:shadow-md
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-white/20 dark:bg-black/20 ${iconColorMap[color]}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {loading ? '—' : value.toLocaleString()}
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-0.5">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------------- View ---------------------------------- */

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { stats, isLoading } = useGlobalStats();

  return (
    <main className="relative w-full min-h-screen overflow-y-auto">
      {/* -------------------------------- Hero -------------------------------- */}
      <section className="relative min-h-screen w-full overflow-hidden px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full place-items-center">
            {/* Left Section - Hero Content */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="relative text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-5 flex justify-center lg:justify-start">
                <span
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-blue-300/40 dark:border-blue-800/40
                    bg-blue-100/70 dark:bg-blue-900/30
                    px-4 py-2 text-xs font-semibold
                    text-blue-700 dark:text-blue-300
                  "
                >
                  <Zap size={14} />
                  Dynamic GitHub Contributors
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="
                  text-[clamp(2.5rem,5vw,4.5rem)]
                  font-extrabold leading-[1.1]
                  tracking-tight text-gray-900 dark:text-white
                "
              >
                Celebrate the
                <span className="block text-blue-600 dark:text-blue-400">
                  People Who Build
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="
                  mt-5 max-w-xl
                  text-base sm:text-lg
                  leading-relaxed
                  text-gray-600 dark:text-gray-400
                "
              >
                Discover, filter, and explore contributors dynamically pulled from
                GitHub across multiple open-source repositories.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col gap-3 sm:flex-row justify-center lg:justify-start"
              >
                <button
                  onClick={() => navigate('/contributors')}
                  className="
                    inline-flex items-center justify-center lg:justify-start gap-2 rounded-xl
                    bg-blue-600 px-8 py-3.5
                    text-sm sm:text-base font-semibold text-white
                    shadow-md transition
                    hover:bg-blue-700 hover:shadow-lg
                  "
                >
                  Explore Contributors
                  <ArrowRight size={18} />
                </button>

                <a
                  href="https://github.com/narainkarthikv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center lg:justify-start gap-2 rounded-xl
                    border border-gray-300 dark:border-slate-700
                    bg-gray-900 dark:bg-slate-900
                    px-8 py-3.5
                    text-sm sm:text-base font-semibold text-white
                    shadow-sm transition
                    hover:bg-gray-800 dark:hover:bg-slate-800
                  "
                >
                  <Github size={18} />
                  View on GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* Right Section - Stats Cards Vertically Stacked */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="relative w-full max-w-sm space-y-4"
            >
              <VerticalStatCard
                icon={Users}
                value={stats?.uniqueContributorCount ?? 0}
                label="Unique Contributors"
                loading={isLoading}
                color="blue"
              />
              <VerticalStatCard
                icon={Zap}
                value={stats?.totalContributions ?? 0}
                label="Total Contributions"
                loading={isLoading}
                color="purple"
              />
              <VerticalStatCard
                icon={Github}
                value={stats?.totalRepositories ?? REPOSITORY_LIST.length}
                label="Repositories"
                loading={isLoading}
                color="emerald"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};
