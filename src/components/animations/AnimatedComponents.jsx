import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedCard Component
 * Glassmorphism card with hover lift and glow effects
 */
export const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)',
        transition: { type: 'spring', stiffness: 400 }
      }}
      transition={{ delay, duration: 0.5 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * SlideIn Component
 * Slides in from left with fade
 */
export const SlideIn = ({ children, delay = 0, direction = 'left', className = "" }) => {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FadeUp Component
 * Fades in while moving up
 */
export const FadeUp = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * PulseEffect Component
 * Pulsating element for emphasis
 */
export const PulseEffect = ({ children, intensity = 1 }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1 + intensity * 0.1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggeredContainer Component
 * Container that staggers animations of children
 */
export const StaggeredContainer = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggeredItem Component
 * Individual item in a staggered container
 */
export const StaggeredItem = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * CountUpAnimation Component
 * Animates numbers counting up
 */
export const CountUpAnimation = ({ value, duration = 2, className = "" }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration * 1000 / steps);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span className={className}>{displayValue.toLocaleString()}</span>;
};

/**
 * ShakeAnimation Component
 * Shakes element (for errors)
 */
export const ShakeAnimation = ({ children, trigger = false }) => {
  return (
    <motion.div
      animate={trigger ? { 
        x: [0, -10, 10, -10, 0],
        boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.5)'],
      } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScaleIn Component
 * Scales in from center
 */
export const ScaleIn = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * RotateIn Component
 * Rotates and fades in
 */
export const RotateIn = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FlipCard Component
 * 3D flip animation on hover
 */
export const FlipCard = ({ front, back, className = "" }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div
      className={`relative w-full cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * LoadingSpinner Component
 * Animated spinner with brand colors
 */
export const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-4 border-dark-700 border-t-primary-500 rounded-full`}
    />
  );
};

/**
 * GlowEffect Component
 * Animated glow effect
 */
export const GlowEffect = ({ children, color = 'primary', className = "" }) => {
  const colorMap = {
    primary: 'from-primary-500 to-primary-400',
    danger: 'from-danger-500 to-danger-400',
    success: 'from-accent-500 to-accent-400',
    warning: 'from-warning-500 to-warning-400',
  };

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px rgba(0, 0, 0, 0)`,
          `0 0 30px rgba(59, 130, 246, 0.4)`,
          `0 0 20px rgba(0, 0, 0, 0)`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};
