import { motion } from 'framer-motion';
import { formatNumber } from '../../utils/formatters';

const getCountryFlag = (country) => {
  const countryCodes = {
    India: 'in',
    Australia: 'au',
    England: 'gb-eng',
    'New Zealand': 'nz',
    Pakistan: 'pk',
    'South Africa': 'za',
    'Sri Lanka': 'lk',
    Bangladesh: 'bd',
    Afghanistan: 'af',
    'West Indies': 'wi',
    Ireland: 'ie',
    Netherlands: 'nl',
    Scotland: 'gb-sct',
    Zimbabwe: 'zw',
  };
  const cc = countryCodes[country];
  return cc ? (
    <img
      src={`https://flagcdn.com/w40/${cc}.png`}
      width="28"
      alt={country}
      className="inline-block rounded-sm"
    />
  ) : '🏏';
};

const getRoleColor = (role) => {
  const colors = {
    Batter: 'text-blue-400',
    Bowler: 'text-red-400',
    'All-rounder': 'text-green-400',
    'Wicket-keeper': 'text-yellow-400',
  };
  return colors[role] || 'text-gray-400';
};

const PlayerCard = ({ player, format, onClick }) => {
  const stats = player[`${format}Stats`] || {};

  return (
    <motion.div
      layoutId={`player-${player.id}`}
      onClick={() => onClick(player)}
      className="glass-card-hover cursor-pointer p-5 group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{getCountryFlag(player.country)}</div>
          <div>
            <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">
              {player.name}
            </h3>
            <p className="text-xs text-gray-400 uppercase">{player.country}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold uppercase ${getRoleColor(player.role)}`}>
          {player.role}
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Matches</span>
          <span className="stat-number text-white">{stats.matches || 0}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Runs</span>
          <span className="stat-number text-blue-400">{formatNumber(stats.runs || 0)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Wickets</span>
          <span className="stat-number text-red-400">{formatNumber(stats.wickets || 0)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Average</span>
          <span className="stat-number text-accent-400">{stats.average || 0}</span>
        </div>
        {(format === 'odi' || format === 't20i') && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Strike Rate</span>
            <span className="stat-number text-green-400">{stats.strikeRate || 0}</span>
          </div>
        )}
      </div>

      {/* Hover indicator */}
      <motion.div
        className="mt-4 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
        initial={false}
      >
        <span>Click for details</span>
        <span className="text-lg">→</span>
      </motion.div>
    </motion.div>
  );
};

export default PlayerCard;
