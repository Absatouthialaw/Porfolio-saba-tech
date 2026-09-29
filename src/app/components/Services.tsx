import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Brush, Video, Camera, TrendingUp, Globe, X, Check, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const iconMap: Record<string, any> = {
  Users, Brush, Paintbrush: Brush, Video, Camera, TrendingUp, Globe
};

export default function Services() {
  const { data } = usePortfolio();
  const [selectedService, setSelectedService] = useState<typeof data.services[0] | null>(null);

  const activeServices = data.services
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-white scroll-mt-24">
      {/* Subtle decorations */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C2185B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-3"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            MON EXPERTISE / 01
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          >
            Mes <span className="text-gray-300">Services</span>
          </motion.h2>
        </div>

        {/* Serpentine Connected Flow Layout inspired by user's mockup */}
        <div className="relative">
          {/* Desktop connecting dotted curved path line behind the cards */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 750" fill="none" preserveAspectRatio="none">
              {/* Path connecting Card 01 to Card 02 */}
              <path
                d="M 280 140 L 450 140 Q 500 140 500 190 L 500 190 Q 500 240 550 240 L 700 240"
                stroke="#C2185B"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                fill="none"
                opacity="0.5"
              />
              {/* Path connecting Card 02 to Card 03 */}
              <path
                d="M 750 290 L 750 380 Q 750 430 700 430 L 700 430"
                stroke="#C2185B"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                fill="none"
                opacity="0.5"
              />
              {/* Path connecting Card 03 to Card 04 */}
              <path
                d="M 550 490 L 500 490 Q 450 490 450 540 L 450 540 Q 450 590 400 590 L 250 590"
                stroke="#C2185B"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            {activeServices.map((service, index) => {
              const Icon = iconMap[service.iconName];
              const stepNumber = String(index + 1).padStart(2, '0');
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedService(service)}
                  className="group relative cursor-pointer pt-6 pl-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Pink Badge Behind in Top-Left */}
                  <div className="absolute top-0 left-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-[#E91E63] via-[#C2185B] to-[#880E4F] p-4 text-white shadow-lg shadow-[#C2185B]/25 z-0 flex items-start justify-start group-hover:scale-105 transition-transform duration-300">
                    <span
                      className="text-2xl font-black tracking-tight leading-none"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stepNumber}
                    </span>
                  </div>

                  {/* Main Glassmorphism Card */}
                  <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-[2.2rem] p-7 sm:p-8 border border-gray-100 shadow-[0_15px_45px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_55px_rgba(194,24,91,0.15)] group-hover:border-[#E91E63]/30 transition-all duration-300 min-h-[220px] flex flex-col justify-between overflow-hidden">
                    {/* Top-Left Subtle Pink Background Corner */}
                    <div className="absolute top-0 left-0 w-24 h-24 rounded-br-[2.5rem] bg-gradient-to-br from-[#E91E63]/10 to-transparent pointer-events-none z-0" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3
                          className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#C2185B] transition-colors duration-300 relative z-20"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {service.title}
                        </h3>
                        <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#C2185B] flex items-center justify-center shrink-0 group-hover:bg-[#C2185B] group-hover:text-white transition-colors duration-300 shadow-sm relative z-20">
                          <Icon size={20} />
                        </div>
                      </div>

                      <p
                        className="text-gray-600 leading-relaxed text-xs sm:text-sm line-clamp-3 mb-6 relative z-10"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100/80 flex items-center justify-between">
                      <span
                        className="text-xs font-bold uppercase tracking-widest text-[#C2185B] flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        Voir les détails & tarifs
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        {service.details.length} prestations
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Ultra-responsive high z-index Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedService(null);
                }}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-50 w-11 h-11 bg-gray-100/90 active:bg-gray-200 hover:bg-gray-200 border border-gray-300/80 rounded-full flex items-center justify-center text-gray-700 hover:text-black transition-all duration-200 shadow-md cursor-pointer touch-manipulation active:scale-90"
                aria-label="Fermer"
              >
                <X size={20} className="stroke-[2.5]" />
              </button>

              <div className="relative p-5 sm:p-8 md:p-10 pr-14 sm:pr-16 pb-4 sm:pb-6 border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C2185B]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3.5 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    {(() => {
                      const SelectedIcon = iconMap[selectedService.iconName];
                      return <SelectedIcon size={24} style={{ color: selectedService.color }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                      {selectedService.title}
                    </h3>
                    <p className="text-[#C2185B] text-xs sm:text-sm font-medium" style={{ fontFamily: 'var(--font-ui)' }}>
                      Détails de l'expertise
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                  {selectedService.description}
                </p>
                
                <h4 className="text-gray-900 font-bold mb-4 sm:mb-6 text-sm sm:text-base" style={{ fontFamily: 'var(--font-ui)' }}>
                  Ce qui est inclus :
                </h4>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {selectedService.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="mt-1 shrink-0 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#C2185B]/10 flex items-center justify-center">
                        <Check size={11} style={{ color: selectedService.color }} />
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 sm:p-6 md:p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Fermer
                </button>
                <a
                  href={`https://wa.me/221775216245?text=Bonjour Absatou, je souhaite discuter du service : ${selectedService.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-all duration-300 text-xs sm:text-sm font-bold shadow-md shadow-[#C2185B]/20"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Réserver ce service
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
