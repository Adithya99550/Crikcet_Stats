import { motion } from 'framer-motion';

const tabs = [
  { id: 'test', label: 'Test', icon: '🏏' },
  { id: 'odi', label: 'ODI', icon: '⚡' },
  { id: 't20i', label: 'T20I', icon: '🔥' },
];

const categories = [
  { id: 'mostRuns', label: 'Most Runs' },
  { id: 'mostWickets', label: 'Most Wickets' },
  { id: 'bestAverage', label: 'Best Batting Average' },
  { id: 'bestStrikeRate', label: 'Best Strike Rate' },
  { id: 'bestBowlingAvg', label: 'Best Bowling Average' },
  { id: 'mostCenturies', label: 'Most Centuries' },
];

const LeaderboardTabs = ({ format, setFormat, category, setCategory }) => {
  return (
    <div className="space-y-6">
      {/* Format Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex glass-card p-1 rounded-xl">
          {tabs.map((tab) => {
            const isActive = format === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setFormat(tab.id)}
                className={`relative px-6 py-3 rounded-lg font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="leaderboard-format-tab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => {
          const isActive = category === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="leaderboard-category-tab"
                  className="absolute inset-0 bg-primary-500/20 border border-primary-500/30 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardTabs;
