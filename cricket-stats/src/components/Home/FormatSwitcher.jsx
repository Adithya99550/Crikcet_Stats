import { useFormat } from '../../hooks/useFormat';
import { motion } from 'framer-motion';

const formats = [
  { id: 'test', label: 'Test', icon: '🏏' },
  { id: 'odi', label: 'ODI', icon: '⚡' },
  { id: 't20i', label: 'T20I', icon: '🔥' },
];

const FormatSwitcher = () => {
  const { format, setFormat } = useFormat();

  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-2"
        >
          <div className="flex">
            {formats.map((f) => {
              const isActive = format === f.id;
              return (
                <motion.button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex-1 relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 text-xl">{f.icon}</span>
                  <span className="relative z-10">{f.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="format-switcher"
                      className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormatSwitcher;
