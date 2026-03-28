import { motion } from 'framer-motion';

const GlowEffect = ({ children, color = 'primary', className = '' }) => {
  const glowColors = {
    primary: 'rgba(139, 92, 246, 0.4)',
    accent: 'rgba(16, 185, 129, 0.4)',
    blue: 'rgba(59, 130, 246, 0.4)',
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `0 0 40px ${glowColors[color]}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlowEffect;
