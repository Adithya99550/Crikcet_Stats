import { motion } from 'framer-motion';
import { useFormat } from '../../hooks/useFormat';
import AnimatedCard from '../shared/AnimatedCard';
import AnimatedNumber from '../shared/AnimatedNumber';
import { formatNumber } from '../../utils/formatters';

// Mock data - will be replaced with actual computed stats from database
const mockStats = {
  test: {
    mostRuns: { player: 'Joe Root', value: 11567, label: 'Most Runs' },
    mostWickets: { player: 'James Anderson', value: 704, label: 'Most Wickets' },
    bestAverage: { player: 'Sir Don Bradman', value: 99.94, label: 'Best Avg' },
    bestStrikeRate: { player: ' Jacques Kallis', value: 45.97, label: 'Best SR' },
  },
  odi: {
    mostRuns: { player: 'Sachin Tendulkar', value: 18426, label: 'Most Runs' },
    mostWickets: { player: 'Muttiah Muralitharan', value: 534, label: 'Most Wickets' },
    bestAverage: { player: 'Ryan ten Doeschate', value: 67.00, label: 'Best Avg' },
    bestStrikeRate: { player: 'Andre Russell', value: 130.40, label: 'Best SR' },
  },
  t20i: {
    mostRuns: { player: 'Martin Guptill', value: 3533, label: 'Most Runs' },
    mostWickets: { player: 'Shakib Al Hasan', value: 149, label: 'Most Wickets' },
    bestAverage: { player: 'Virat Kohli', value: 48.70, label: 'Best Avg' },
    bestStrikeRate: { player: 'Colin Munro', value: 156.00, label: 'Best SR' },
  },
};

const FeaturedStats = () => {
  const { format } = useFormat();
  const stats = mockStats[format] || mockStats.test;

  const statCards = Object.values(stats);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Featured Statistics</h2>
          <p className="section-subtitle">
            Top performers in {format === 'test' ? 'Test' : format === 'odi' ? 'ODI' : 'T20I'} cricket
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AnimatedCard className="p-6 text-center group">
                <div className="text-sm text-gray-400 mb-3">{stat.label}</div>
                <div className="text-4xl font-bold mb-2 stat-number gradient-text-accent">
                  {typeof stat.value === 'number' && stat.value > 1000 ? (
                    <AnimatedNumber value={stat.value} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.player}
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStats;
