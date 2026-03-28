import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Trophy, TrendingUp } from 'lucide-react';
import CTAButtons from './CTAButtons';
import Hero3DBackground from './Hero3DBackground';

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <Hero3DBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Men's International Cricket</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Cricket</span>
            <br />
            <span className="text-white">Statistics Hub</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Explore comprehensive career statistics for 80+ international cricketers
            across <span className="text-white font-semibold">Test</span>,{' '}
            <span className="text-white font-semibold">ODI</span>, and{' '}
            <span className="text-white font-semibold">T20I</span> formats.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
          >
            <div className="glass-card p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary-400" />
              <div className="text-2xl font-bold">80+</div>
              <div className="text-xs text-gray-400 uppercase">Players</div>
            </div>
            <div className="glass-card p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-accent-400" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-gray-400 uppercase">Formats</div>
            </div>
            <div className="glass-card p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold">Live</div>
              <div className="text-xs text-gray-400 uppercase">Updates</div>
            </div>
          </motion.div>

          {/* CTA */}
          <CTAButtons />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
