import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Award } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(ease * value);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [inView, value]);

  return <span>{count}%</span>;
}

export default function SkillsExpertise() {
  const { data } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const activeSkills = data.skills
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-[#FAF7F2]/70 scroll-mt-24">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C2185B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Description & Button */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            {/* Tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-[#C2185B]" />
              <span
                className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#C2185B] uppercase"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                COMPÉTENCES & EXPERTISE
              </span>
            </div>

            {/* Headline with Serif Italic Accent */}
            <h2
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-gray-900"
            >
              Des compétences maîtrisées au service de <span className="font-extrabold text-[#C2185B]">vos résultats</span>
            </h2>

            {/* Description Paragraph */}
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              Chaque savoir-faire est affûté par des années de pratique, de formation continue et de projets concrets pour des marques exigeantes. Je m'engage à vous offrir un accompagnement de haut niveau, alliant créativité, rigueur et performance mesurable.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2.5 bg-[#C2185B] hover:bg-[#A8154E] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <span>Découvrir mes services</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Progress Card Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="bg-[#FAF7F2] border border-amber-900/10 rounded-3xl p-7 sm:p-9 shadow-sm">
              <div className="space-y-7">
                {activeSkills.map((skill, index) => (
                  <div key={index} className="space-y-2.5">
                    <div className="flex justify-between items-center text-sm sm:text-[15px] md:text-base font-semibold text-gray-900">
                      <span>{skill.name}</span>
                      <span className="text-sm sm:text-base font-bold text-[#C2185B]">
                        <AnimatedCounter value={skill.percentage} inView={isInView} />
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-3.5 bg-[#ECE5DC] rounded-full overflow-hidden p-[2px] shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                        transition={{
                          duration: 1.6,
                          delay: index * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#E91E63] relative shadow-sm"
                      >
                        {/* Shimmer light effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60 rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Assurance Badge */}
              <div className="mt-8 pt-5 border-t border-amber-900/10 flex items-center gap-3.5 bg-pink-50/60 rounded-2xl p-3.5 border border-pink-100/70">
                <div className="w-8 h-8 rounded-lg bg-[#FCE4EC] flex items-center justify-center text-[#C2185B] shrink-0">
                  <Award size={18} />
                </div>
                <p className="text-xs sm:text-[13px] text-gray-600 font-medium leading-relaxed">
                  Un niveau d'exigence constant sur chaque projet, quel que soit le canal.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
