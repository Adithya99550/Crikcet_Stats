import { motion } from 'framer-motion';

const RankBadge = ({ rank }) => {
  const getBadgeStyles = (rank) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
          text: 'text-yellow-900',
          shadow: 'shadow-lg shadow-yellow-500/30',
          icon: '🥇',
        };
      case 2:
        return {
          bg: 'bg-gradient-to-br from-gray-200 to-gray-400',
          text: 'text-gray-700',
          shadow: 'shadow-lg shadow-gray-400/30',
          icon: '🥈',
        };
      case 3:
        return {
          bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
          text: 'text-orange-900',
          shadow: 'shadow-lg shadow-orange-500/30',
          icon: '🥉',
        };
      default:
        return {
          bg: 'bg-surface-800',
          text: 'text-gray-300',
          shadow: '',
          icon: null,
        };
    }
  };

  const styles = getBadgeStyles(rank);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20, delay: rank * 0.05 }}
      className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg ${styles.bg} ${styles.shadow}`}
    >
      {styles.icon || (
        <span className={`stat-number ${styles.text}`}>{rank}</span>
      )}
    </motion.div>
  );
};

export default RankBadge;
