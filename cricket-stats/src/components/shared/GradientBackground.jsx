import { motion } from 'framer-motion';

const GradientBackground = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3), transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.2), transparent 40%)',
            'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.2), transparent 40%)',
            'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.2), transparent 40%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
