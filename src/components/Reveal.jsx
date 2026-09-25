import { motion } from 'framer-motion';
import { fadeUp, pop, stagger } from '../lib/motion.js';

export function Reveal({ className = '', children, stagger: useStagger = false }) {
  return (
    <motion.div
      className={className}
      variants={useStagger ? stagger : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px 18% 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function RevealChild({ className = '', children, as: Tag = 'div', ...props }) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag className={className} variants={pop} {...props}>
      {children}
    </MotionTag>
  );
}
