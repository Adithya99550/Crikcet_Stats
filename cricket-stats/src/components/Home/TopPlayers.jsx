import { motion } from 'framer-motion';
import AnimatedCard from '../shared/AnimatedCard';
import { useFormat } from '../../hooks/useFormat';

// Mock top players data
const mockTopPlayers = {
  test: [
    { id: 1, name: 'Joe Root', country: 'England', runs: 11567, avg: 51.35 },
    { id: 2, name: 'Steve Smith', country: 'Australia', runs: 9392, avg: 58.97 },
    { id: 3, name: 'Kane Williamson', country: 'New Zealand', runs: 8332, avg: 56.24 },
    { id: 4, name: 'Virat Kohli', country: 'India', runs: 8848, avg: 49.15 },
    { id: 5, name: 'Brendon McCullum', country: 'New Zealand', runs: 6745, avg: 45.33 },
  ],
  odi: [
    { id: 1, name: 'Sachin Tendulkar', country: 'India', runs: 18426, avg: 44.83 },
    { id: 2, name: 'Virat Kohli', country: 'India', runs: 11945, avg: 57.38 },
    { id: 3, name: 'Ricky Ponting', country: 'Australia', runs: 13704, avg: 42.03 },
    { id: 4, name: 'Sanath Jayasuriya', country: 'Sri Lanka', runs: 13430, avg: 32.36 },
    { id: 5, name: 'Shakib Al Hasan', country: 'Bangladesh', runs: 7185, avg: 37.93 },
  ],
  t20i: [
    { id: 1, name: 'Martin Guptill', country: 'New Zealand', runs: 3533, avg: 33.79 },
    { id: 2, name: 'Virat Kohli', country: 'India', runs: 3068, avg: 48.70 },
    { id: 3, name: 'Rohit Sharma', country: 'India', runs: 3024, avg: 33.21 },
    { id: 4, name: 'Babar Azam', country: 'Pakistan', runs: 3158, avg: 41.30 },
    { id: 5, name: 'David Miller', country: 'South Africa', runs: 2091, avg: 36.14 },
  ],
};

const TopPlayers = () => {
  const { format } = useFormat();
  const players = mockTopPlayers[format] || mockTopPlayers.test;

  const getCountryFlag = (country) => {
    const countryCodes = {
      India: 'in',
      Australia: 'au',
      England: 'gb-eng',
      'New Zealand': 'nz',
      'Sri Lanka': 'lk',
      Bangladesh: 'bd',
      Pakistan: 'pk',
      'South Africa': 'za',
    };
    const cc = countryCodes[country];
    return cc ? (
      <img
        src={`https://flagcdn.com/w40/${cc}.png`}
        width="28"
        alt={country}
        className="inline-block mx-auto rounded-sm"
      />
    ) : '🏏';
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Top Run Scorers</h2>
          <p className="section-subtitle">
            Leading run-getters in {format === 'test' ? 'Test' : format === 'odi' ? 'ODI' : 'T20I'} cricket
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AnimatedCard className="p-4 text-center group cursor-pointer">
                <div className="text-3xl mb-2">#{index + 1}</div>
                <div className="text-3xl mb-3">{getCountryFlag(player.country)}</div>
                <div className="font-bold text-white mb-1">{player.name}</div>
                <div className="text-xs text-gray-400 mb-3">{player.country}</div>
                <div className="flex justify-between text-sm text-gray-300 border-t border-white/10 pt-3">
                  <span>{player.runs.toLocaleString()} runs</span>
                  <span className="text-primary-400">{player.avg}</span>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPlayers;
