import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Glow effect */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(194, 24, 91, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner glow */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.2) 0%, transparent 60%)',
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
      />

      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-3 h-3 bg-[#C2185B] rounded-full"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}
