import React from 'react';
import { motion } from 'motion/react';

export default function Mindset() {
  return (
    <section className="py-18 sm:py-22 md:py-26 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-[#0A0A0A] text-white text-center">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C2185B]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(233,30,99,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6 sm:space-y-7">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <span
            className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#C2185B] uppercase"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            MON ÉTAT D'ESPRIT
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold leading-[1.2] tracking-tight text-white"
        >
          Votre marque mérite d'être vue, <span className="whitespace-nowrap">comprise et <span className="text-[#E91E63] font-extrabold tracking-tight">inoubliable.</span></span>
        </motion.h2>

        {/* Subtitle / Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-sm sm:text-base md:text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
        >
          Mon métier, c'est de traduire votre vision en une image qui vous ressemble et qui performe. Créativité, rigueur et audace : je conçois des expériences digitales qui touchent, inspirent et convertissent — avec beaucoup de cœur et une pointe de folie créative.
        </motion.p>
      </div>
    </section>
  );
}
