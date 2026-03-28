import { motion } from 'framer-motion';

const formats = [
  { value: 'all', label: 'All Formats' },
  { value: 'test', label: 'Test' },
  { value: 'odi', label: 'ODI' },
  { value: 't20i', label: 'T20I' },
];

const roles = [
  { value: 'all', label: 'All Roles' },
  { value: 'Batter', label: 'Batter' },
  { value: 'Bowler', label: 'Bowler' },
  { value: 'All-rounder', label: 'All-rounder' },
  { value: 'Wicket-keeper', label: 'Wicket-keeper' },
];

const sortOptions = [
  { value: 'runs', label: 'Most Runs' },
  { value: 'wickets', label: 'Most Wickets' },
  { value: 'average', label: 'Best Average' },
  { value: 'strikeRate', label: 'Best Strike Rate' },
];

const PlayerFilters = ({
  formatFilter,
  setFormatFilter,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="space-y-4">
      {/* Row 1: Search already above */}

      {/* Row 2: Main filters */}
      <div className="flex flex-wrap gap-3">
        {/* Format Filter */}
        <div className="relative">
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="glass-card px-4 py-2.5 pr-10 text-white appearance-none cursor-pointer hover:bg-white/10 transition-all outline-none"
          >
            {formats.map((f) => (
              <option key={f.value} value={f.value} className="bg-surface-900">
                {f.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Role Filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="glass-card px-4 py-2.5 pr-10 text-white appearance-none cursor-pointer hover:bg-white/10 transition-all outline-none"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value} className="bg-surface-900">
                {r.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort By */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="glass-card px-4 py-2.5 pr-10 text-white appearance-none cursor-pointer hover:bg-white/10 transition-all outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value} className="bg-surface-900">
                {s.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort Order */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="glass-card px-4 py-2.5 flex items-center gap-2 hover:bg-white/10 transition-all"
        >
          <span>{sortOrder === 'desc' ? '↓ High to Low' : '↑ Low to High'}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PlayerFilters;
