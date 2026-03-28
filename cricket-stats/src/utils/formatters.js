/**
 * Format numbers with locale-specific formatting
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format batting average to 2 decimal places
 */
export const formatAverage = (avg) => {
  if (typeof avg !== 'number') return '0.00';
  return avg.toFixed(2);
};

/**
 * Format strike rate to 2 decimal places
 */
export const formatStrikeRate = (sr) => {
  if (typeof sr !== 'number') return '0.00';
  return sr.toFixed(2);
};

/**
 * Format bowling average to 2 decimal places
 */
export const formatBowlingAverage = (avg) => {
  if (typeof avg !== 'number') return '0.00';
  return avg.toFixed(2);
};
