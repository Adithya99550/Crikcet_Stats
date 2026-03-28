import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedNumber = ({ value, duration = 2, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { duration: duration * 1000 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.onChange((latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <motion.span className={`stat-number ${className}`}>
      {displayValue.toLocaleString()}
    </motion.span>
  );
};

export default AnimatedNumber;
