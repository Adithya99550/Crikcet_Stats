import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';

const CTAButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <Link
        to="/players"
        className="btn-primary flex items-center justify-center gap-2"
      >
        <Users className="w-5 h-5" />
        <span>View Players</span>
      </Link>
      <Link
        to="/leaderboards"
        className="btn-secondary flex items-center justify-center gap-2"
      >
        <Trophy className="w-5 h-5" />
        <span>View Leaderboards</span>
      </Link>
    </motion.div>
  );
};

export default CTAButtons;
