import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Testimonials() {
  const { data } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeTestimonials = data.testimonials
    .filter(t => t.enabled)
    .sort((a, b) => a.order - b.order);

  const total = activeTestimonials.length;

  const nextSlide = () => {
    if (total <= 1) return;
    setCurrentIndex(prev => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total <= 1) return;
    setCurrentIndex(prev => (prev - 1 + total) % total);
  };

  // Auto-play on mobile
  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total, currentIndex]);

  if (total === 0) return null;

  return (
    <section className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-[#0A0A0A] scroll-mt-24 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#C2185B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 space-y-3"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-3"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            ILS ME FONT CONFIANCE / 06
          </motion.span>
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            Témoignages
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Ce que mes clients disent de notre collaboration
          </p>
        </motion.div>

        {/* ─── MOBILE VIEW: STRICTLY 1 CARD AT A TIME (< md) ─── */}
        <div 
          className="block md:hidden relative"
          onTouchStart={() => setIsAutoPlaying(false)}
          onTouchEnd={() => setIsAutoPlaying(true)}
        >
          <div className="relative overflow-hidden min-h-[310px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) nextSlide();
                  else if (info.offset.x > 40) prevSlide();
                }}
                className="w-full p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote size={28} className="text-[#C2185B]" />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#C2185B" className="text-[#C2185B]" />
                      ))}
                    </div>
                  </div>

                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-sm text-white/90 leading-relaxed mb-6 italic"
                  >
                    "{activeTestimonials[currentIndex].content}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                  <img
                    src={activeTestimonials[currentIndex].image}
                    alt={activeTestimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C2185B] shrink-0"
                  />
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-ui)' }}
                      className="text-white font-bold text-sm"
                    >
                      {activeTestimonials[currentIndex].name}
                    </h4>
                    <p
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-xs text-white/60"
                    >
                      {activeTestimonials[currentIndex].role} • {activeTestimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Pagination & Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 px-1">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-[#C2185B] text-white active:scale-90 border border-white/15 transition-colors cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {activeTestimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx ? 'w-7 bg-[#E91E63]' : 'w-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Aller au témoignage ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-[#C2185B] text-white active:scale-90 border border-white/15 transition-colors cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ─── DESKTOP & TABLET VIEW: GRID OF CARDS (>= md) ─── */}
        <div 
          className="hidden md:block"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#C2185B]/50 transition-all duration-500 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="mb-4">
                    <Quote size={28} className="text-[#C2185B]/40" />
                  </div>

                  <div className="flex gap-1 mb-3.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#C2185B" className="text-[#C2185B]" />
                    ))}
                  </div>

                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-xs sm:text-[13px] md:text-sm text-white/75 leading-relaxed mb-6 italic"
                  >
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-5 border-t border-white/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#C2185B]/40 shrink-0"
                  />
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-ui)' }}
                      className="text-white font-semibold text-xs sm:text-sm"
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-[11px] sm:text-xs text-white/50"
                    >
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
