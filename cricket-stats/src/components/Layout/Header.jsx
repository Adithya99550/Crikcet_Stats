import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, Trophy, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/players', icon: Users, label: 'Players' },
    { path: '/leaderboards', icon: Trophy, label: 'Leaderboards' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              Cricket
            </motion.div>
            <span className="text-sm text-gray-400 hidden sm:inline">Stats</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {active && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary-500/20 border border-primary-500/30 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg glass-card"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-primary-500/20 text-white border border-primary-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;
