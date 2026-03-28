import { motion } from 'framer-motion';

const StatRing = ({ value, max, label, color = 'primary' }) => {
  const percentage = (value / max) * 100;
  const strokeDashoffset = 283 - (percentage / 100) * 283;

  const colors = {
    primary: 'var(--color-primary-500)',
    accent: 'var(--color-accent-500)',
    blue: 'var(--color-blue-500)',
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colors[color]}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="283"
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold stat-number">{value}</span>
        <span className="text-xs text-gray-400 uppercase">{label}</span>
      </div>
    </div>
  );
};

export default StatRing;
