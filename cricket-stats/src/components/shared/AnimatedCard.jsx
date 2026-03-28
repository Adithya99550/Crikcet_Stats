import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
