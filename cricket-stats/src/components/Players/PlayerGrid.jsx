import { motion } from 'framer-motion';
import PlayerCard from './PlayerCard';

const PlayerGrid = ({ players, format, onPlayerClick }) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03 }}
        >
          <PlayerCard player={player} format={format} onClick={onPlayerClick} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlayerGrid;
