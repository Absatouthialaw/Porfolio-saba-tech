import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Eye, Heart } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const iconMap: Record<string, any> = {
  TrendingUp, Users, Eye, Heart
};

function useCountUp(end: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth cubic ease-out
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOutProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return { count, ref, isVisible };
}

export default function Results() {
  const { data } = usePortfolio();
  const activeStats = data.statistics
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  // Fallback manual mapping for colors / icons since they aren't fully in data yet
  // A true CMS would probably store iconName and color in the stat object.
  const statDecorations = [
    { iconName: 'TrendingUp', color: '#C2185B' },
    { iconName: 'Eye', color: '#E91E63' },
    { iconName: 'Heart', color: '#C2185B' },
    { iconName: 'Users', color: '#E91E63' },
  ];

  return (
    <section className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-gray-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 space-y-3"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-3"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            IMPACT / 05
          </motion.span>
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          >
            Résultats obtenus
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Des résultats concrets et mesurables pour chaque projet
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeStats.map((result, index) => {
            const dec = statDecorations[index % statDecorations.length];
            return <ResultCard key={result.id} result={{...result, icon: iconMap[dec.iconName], color: dec.color}} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ResultCard({ result, index }: { result: typeof results[0]; index: number }) {
  const { count, ref, isVisible } = useCountUp(result.value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-5 sm:p-6 md:p-7 rounded-2xl bg-white border border-gray-200/80 hover:border-[#C2185B]/40 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-[#C2185B]/5 flex flex-col justify-between"
    >
      <div className="relative z-10 space-y-3 sm:space-y-4">
        {/* Icon with subtle pulse animation when visible */}
        <motion.div
          animate={isVisible ? { scale: [0.8, 1.1, 1], rotate: [0, -5, 0] } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${result.color}15, ${result.color}08)` }}
        >
          <result.icon size={22} style={{ color: result.color }} />
        </motion.div>

        {/* Value: Balanced font size & animated count */}
        <div>
          <motion.div
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 tracking-tight flex items-baseline gap-0.5"
            animate={isVisible ? { scale: [0.9, 1.03, 1] } : {}}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
          >
            <span>+{count}</span>
            <span style={{ color: result.color }} className="text-xl sm:text-2xl lg:text-[28px] font-black">
              {result.suffix}
            </span>
          </motion.div>
        </div>

        {/* Label */}
        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-gray-600 text-xs sm:text-sm font-medium leading-relaxed"
        >
          {result.label}
        </p>
      </div>
    </motion.div>
  );
}
