import React from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Megaphone, 
  Brush, 
  Video, 
  Aperture, 
  Layout, 
  TrendingUp, 
  Palette,
  Layers,
  Target
} from 'lucide-react';

const expertiseItems = [
  {
    title: 'Social Media Manager',
    icon: Smartphone,
  },
  {
    title: 'Community Manager',
    icon: Megaphone,
  },
  {
    title: 'Design Graphique',
    icon: Brush,
  },
  {
    title: 'Montage Vidéo',
    icon: Video,
  },
  {
    title: 'Production Visuelle',
    icon: Aperture,
  },
  {
    title: 'UX/UI Design',
    icon: Layout,
  },
  {
    title: 'Marketing Digital',
    icon: TrendingUp,
  },
  {
    title: 'Direction Artistique',
    icon: Palette,
  },
  {
    title: 'Brand Identity',
    icon: Target,
  },
  {
    title: 'Création de Contenu',
    icon: Layers,
  },
];

export default function ExpertiseMarquee() {
  // Triple list to ensure smooth infinite looping without gaps
  const duplicatedItems = [...expertiseItems, ...expertiseItems, ...expertiseItems];

  return (
    <section className="py-16 sm:py-18 md:py-22 relative overflow-hidden bg-[#FAF7F2]/80 border-y border-pink-100/50">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C2185B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10 text-center mb-10 sm:mb-12">
        {/* Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-3"
        >
          <span
            className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#C2185B] uppercase"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            MES PÔLES D'EXPERTISE
          </span>
        </motion.div>

        {/* Serif Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight max-w-3xl mx-auto text-gray-900"
        >
          Une expertise complète, <br className="hidden sm:inline" />
          du concept au digital
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-body)' }}
          className="mt-3.5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          De la stratégie à la production, je couvre toute la chaîne de valeur de votre présence en ligne avec un niveau d'exigence premium.
        </motion.p>
      </div>

      {/* Marquee Container with Gradient Fading Edges */}
      <div className="relative w-full overflow-hidden py-3 group">
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-[#FAF7F2] to-transparent z-20" />
        
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-[#FAF7F2] to-transparent z-20" />

        {/* Marquee Track (Smooth Infinite Horizontal Slide) */}
        <motion.div
          className="flex gap-4 sm:gap-5 w-max will-change-transform"
          animate={{
            x: ['0%', '-33.333333%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {duplicatedItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl border border-gray-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-pink-200/80 transition-all duration-300 shrink-0 select-none"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FCE4EC] flex items-center justify-center text-[#C2185B] shrink-0 shadow-xs">
                  <Icon size={20} />
                </div>
                <span className="text-xs sm:text-sm md:text-[15px] font-semibold text-gray-800 tracking-tight whitespace-nowrap">
                  {item.title}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
