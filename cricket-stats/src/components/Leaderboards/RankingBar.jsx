import { motion } from 'framer-motion';

const RankingBar = ({ value, max, color = 'primary', rank }) => {
  const percentage = (value / max) * 100;

  const colors = {
    primary: 'from-primary-500 to-blue-500',
    accent: 'from-accent-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
  };

  const bgColors = {
    primary: 'bg-primary-500/20',
    accent: 'bg-accent-500/20',
    blue: 'bg-blue-500/20',
  };

  return (
    <div className="relative">
      {/* Background bar */}
      <div className={`h-3 rounded-full overflow-hidden ${bgColors[color]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${colors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay: rank * 0.1, ease: 'easeOut' }}
        />
      </div>
      {/* Animated glow on top */}
      <motion.div
        className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${colors[color]} opacity-50 blur-sm`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, delay: rank * 0.1, ease: 'easeOut' }}
      />
    </div>
  );
};

export default RankingBar;
