import { motion } from 'framer-motion'

const easing = [0.2, 0.75, 0.2, 1]

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  className,
  once = true,
  amount = 0.35,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: easing }}
    >
      {children}
    </MotionTag>
  )
}
