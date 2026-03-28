import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFormat } from '../hooks/useFormat';
import SearchBar from '../components/Players/SearchBar';
import PlayerFilters from '../components/Players/PlayerFilters';
import PlayerGrid from '../components/Players/PlayerGrid';
import PlayerModal from '../components/Players/PlayerModal';
import playersData from '../data/players';

const PlayersPage = () => {
  const { format } = useFormat();
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('runs');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    let result = [...playersData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.country.toLowerCase().includes(query)
      );
    }

    // Format filter
    if (formatFilter !== 'all') {
      result = result.filter((p) =>
        p[`${formatFilter}Stats`]?.matches > 0
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      result = result.filter((p) => p.role === roleFilter);
    }

    // Sorting
    result.sort((a, b) => {
      const aStats = a[`${format}Stats`] || {};
      const bStats = b[`${format}Stats`] || {};
      const aVal = aStats[sortBy] || 0;
      const bVal = bStats[sortBy] || 0;

      if (sortOrder === 'asc') {
        return aVal - bVal;
      }
      return bVal - aVal;
    });

    return result;
  }, [searchQuery, formatFilter, roleFilter, sortBy, sortOrder, format]);

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
            Players
          </h1>
          <p className="text-gray-400 text-lg">
            Browse and explore cricketers across all formats
          </p>
        </motion.div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search players by name or country..."
          />
          <PlayerFilters
            formatFilter={formatFilter}
            setFormatFilter={setFormatFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* Results count */}
        <div className="mb-6 text-gray-400">
          Showing {filteredPlayers.length} players
          {formatFilter !== 'all' && ` in ${formatFilter}`}
        </div>

        {/* Player Grid */}
        {filteredPlayers.length > 0 ? (
          <PlayerGrid
            players={filteredPlayers}
            format={format}
            onPlayerClick={setSelectedPlayer}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No players found</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Player Modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          format={format}
          isOpen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};

export default PlayersPage;
