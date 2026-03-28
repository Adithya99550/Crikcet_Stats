import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
      src={`https://flagcdn.com/w80/${cc}.png`}
      width="64"
      alt={country}
      className="inline-block rounded-sm"
    />
  ) : '🏏';
};

const formatLabel = (stat) => {
  if (!stat) return '-';
  if (typeof stat === 'number') return stat.toLocaleString();
  return stat;
};

const PlayerModal = ({ player, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!player) return null;

  const formats = ['test', 'odi', 't20i'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card p-8 z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className="text-7xl">{getCountryFlag(player.country)}</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{player.name}</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg text-sm font-medium capital">{player.role}</span>
                  <span className="px-3 py-1 rounded-lg text-sm font-medium bg-white/5 text-gray-300">
                    {player.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats by Format */}
            <div className="space-y-6">
              {formats.map((format) => {
                const stats = player[`${format}Stats`];
                if (!stats || stats.matches === 0) return null;

                const formatNames = {
                  test: { label: 'Test', icon: '🏏' },
                  odi: { label: 'ODI', icon: '⚡' },
                  t20i: { label: 'T20I', icon: '🔥' },
                };
                const fmt = formatNames[format];

                return (
                  <motion.div
                    key={format}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{fmt.icon}</span>
                      <h3 className="text-xl font-bold">{fmt.label} Statistics</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Matches</div>
                        <div className="text-xl font-bold stat-number">{formatLabel(stats.matches)}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Innings</div>
                        <div className="text-xl font-bold stat-number">{formatLabel(stats.innings)}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Runs</div>
                        <div className="text-xl font-bold stat-number text-blue-400">{formatLabel(stats.runs)}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Wickets</div>
                        <div className="text-xl font-bold stat-number text-red-400">{formatLabel(stats.wickets)}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Average</div>
                        <div className="text-xl font-bold stat-number text-accent-400">{stats.average || '-'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Strike Rate</div>
                        <div className="text-xl font-bold stat-number text-green-400">{stats.strikeRate || '-'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Centuries</div>
                        <div className="text-xl font-bold stat-number text-yellow-400">{stats.centuries || stats.hundreds || 0}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Fifties</div>
                        <div className="text-xl font-bold stat-number">{stats.fifties || 0}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Best Score</div>
                        <div className="text-xl font-bold stat-number">{stats.bestScore || '-'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Best Bowling</div>
                        <div className="text-xl font-bold stat-number">{stats.bestBowling || '-'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">Catches</div>
                        <div className="text-xl font-bold stat-number">{formatLabel(stats.catches)}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-400 mb-1">5-Wicket Hauls</div>
                        <div className="text-xl font-bold stat-number">{formatLabel(stats.fiveWickets)}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerModal;
