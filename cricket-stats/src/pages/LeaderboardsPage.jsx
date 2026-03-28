import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormat } from '../hooks/useFormat';
import LeaderboardTabs from '../components/Leaderboards/LeaderboardTabs';
import RankingBar from '../components/Leaderboards/RankingBar';
import RankBadge from '../components/Leaderboards/RankBadge';
import playersData from '../data/players';

const LeaderboardsPage = () => {
  const { format, setFormat } = useFormat();
  const [category, setCategory] = useState('mostRuns');

  // Compute leaderboard data
  const leaderboardData = useMemo(() => {
    const data = playersData.map((player) => {
      const stats = player[`${format}Stats`] || {};
      const statMap = {
        mostRuns: 'runs',
        mostWickets: 'wickets',
        bestAverage: 'average',
        bestStrikeRate: 'strikeRate',
        bestBowlingAvg: 'average',
        mostCenturies: 'centuries',
      };
      const actualKey = statMap[category] || category;
      return {
        ...player,
        value: stats[actualKey] || 0,
        secondaryValue: undefined,
      };
    });

    // Sort based on category (descending for leaderboards)
    data.sort((a, b) => b.value - a.value);

    // Get max value for progress bars
    const maxValue = data.length > 0 ? data[0].value : 1;

    return data.slice(0, 20).map((item, index) => ({
      ...item,
      rank: index + 1,
      progress: (item.value / maxValue) * 100,
    }));
  }, [format, category]);

  const getCategoryLabel = (cat) => {
    const labels = {
      mostRuns: 'Most Runs',
      mostWickets: 'Most Wickets',
      bestAverage: 'Best Batting Average',
      bestStrikeRate: 'Best Strike Rate',
      bestBowlingAvg: 'Best Bowling Average',
      mostCenturies: 'Most Centuries',
    };
    return labels[cat] || cat;
  };

  const getStatLabel = (player) => {
    if (category === 'mostRuns') return `${player.value.toLocaleString()} runs`;
    if (category === 'mostWickets') return `${player.value} wickets`;
    if (category === 'bestAverage') return `Avg: ${player.value.toFixed(2)}`;
    if (category === 'bestStrikeRate') return `SR: ${player.value.toFixed(2)}`;
    if (category === 'bestBowlingAvg') return `Avg: ${player.value.toFixed(2)}`;
    if (category === 'mostCenturies') return `${player.value} centuries`;
    return player.value.toLocaleString();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
            Leaderboards
          </h1>
          <p className="text-gray-400 text-lg">
            Rankings and records across all formats
          </p>
        </motion.div>

        {/* Tabs */}
        <LeaderboardTabs
          format={format}
          setFormat={setFormat}
          category={category}
          setCategory={setCategory}
        />

        {/* Leaderboard */}
        <div className="mt-12 space-y-4">
          {leaderboardData.map((player, index) => (
            <motion.div
              key={`${player.id}-${format}-${category}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-6">
                {/* Rank Badge */}
                <RankBadge rank={player.rank} />

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {(() => {
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
                        const cc = countryCodes[player.country];
                        return cc ? (
                          <img
                            src={`https://flagcdn.com/w40/${cc}.png`}
                            width="28"
                            alt={player.country}
                            className="inline-block rounded-sm"
                          />
                        ) : '🏏';
                      })()}
                    </span>
                    <div>
                      <h3 className="font-bold text-white truncate">
                        {player.name}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase">
                        {player.country} • {player.role}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <RankingBar
                      value={player.value}
                      max={leaderboardData[0]?.value || 1}
                      rank={player.rank}
                    />
                  </div>

                  {/* Stat Value */}
                  <div className="text-sm text-gray-300 font-medium">
                    {getStatLabel(player)}
                  </div>
                </div>

                {/* Stats Summary (only for top 5) */}
                {player.rank <= 5 && (
                  <div className="hidden md:block text-right text-sm text-gray-400">
                    <div>Matches: {player[`${format}Stats`]?.matches || 0}</div>
                    <div>
                      {category.includes('Average') || category.includes('StrikeRate')
                        ? `Innings: ${player[`${format}Stats`]?.innings || 0}`
                        : `Innings: ${player[`${format}Stats`]?.innings || 0}`}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {leaderboardData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardsPage;
