/**
 * Home Page (Landing Page) – VIEW
 * Refined hero, balanced typography, scroll-safe layout
 */

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Users, Zap, ArrowRight } from 'lucide-react';

import { useContributors } from '../controllers/useContributors';
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

/* ------------------------------ UI Components ------------------------------ */

const StatCard = ({
  icon: Icon,
  value,
  label,
  loading,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  loading: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="
      rounded-2xl border border-gray-200 dark:border-slate-700
      bg-white/90 dark:bg-slate-800/80
      px-8 py-8 text-center
      shadow-sm backdrop-blur
      transition hover:shadow-md
    "
  >
    <Icon className="mx-auto mb-3 h-7 w-7 text-blue-600 dark:text-blue-400" />
    <div className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
      {loading ? '—' : value}
    </div>
    <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
      {label}
    </p>
  </motion.div>
);

/* --------------------------------- View ---------------------------------- */

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { data: contributors, isLoading } = useContributors({
    repositories: [REPOSITORY_LIST[0]],
    enableAutoFetch: true,
  });

  const stats = useMemo(() => {
    if (!contributors) {
      return { totalContributors: 0, totalContributions: 0 };
    }

    return {
      totalContributors: contributors.length,
      totalContributions: contributors.reduce(
        (sum, c) => sum + c.totalContributions,
        0
      ),
    };
  }, [contributors]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* -------------------------------- Hero -------------------------------- */}
      <section className="relative grid h-full place-items-center overflow-hidden px-6">
        {/* Decorative blobs (scroll-safe) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-5xl text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-5">
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

          {/* Heading (semantic + visual fix) */}
          <motion.h1
            variants={fadeUp}
            className="
              text-[clamp(2.75rem,6vw,5.5rem)]
              font-extrabold leading-[1.05]
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
              mx-auto mt-5 max-w-2xl
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
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() => navigate('/contributors')}
              className="
                inline-flex items-center gap-2 rounded-xl
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
                inline-flex items-center gap-2 rounded-xl
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

          {/* Stats (height-controlled) */}
          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            <StatCard
              icon={Users}
              value={stats.totalContributors}
              label="Contributors"
              loading={isLoading}
            />
            <StatCard
              icon={Zap}
              value={stats.totalContributions}
              label="Contributions"
              loading={isLoading}
            />
            <StatCard
              icon={Github}
              value={REPOSITORY_LIST.length}
              label="Repositories"
              loading={false}
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};
