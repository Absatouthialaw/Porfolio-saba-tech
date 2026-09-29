import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Calendar, Zap, Play, X } from 'lucide-react';
import heroPerson from '../../imports/hero_person.png';
import heroBg from '../../imports/hero_bg.jpg';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-20 sm:pb-24 relative overflow-hidden bg-[#0A0A0A]">
      {/* Tech Background Image with Smooth Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Tech Abstract Background"
          className="w-full h-full object-cover object-center opacity-85 scale-105"
        />
        {/* Dark Vignette & Gradient Overlays for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]" />
        {/* Subtle magenta glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C2185B]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Headline, Text & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.18] text-white font-bold"
            >
              {data?.settings?.heroTitleLine1 || 'Je transforme votre image'}{' '}
              <span className="text-white">{data?.settings?.heroTitleLine2 || 'digitale en une'} </span>
              <span className="text-[#FF4081] font-extrabold tracking-tight inline-block whitespace-nowrap">
                {data?.settings?.heroTitleHighlight || 'marque puissante.'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-sm sm:text-base md:text-lg text-gray-200/90 leading-relaxed max-w-xl font-light"
            >
              {data?.settings?.heroSubtitle || "Donnez vie à votre image avec une experte en communication digitale. Du community management au design de vos supports visuels, transformons votre marque."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <a
                href="#portfolio"
                className="group px-6 sm:px-7 py-3.5 bg-[#C2185B] text-white rounded-full hover:bg-[#E91E63] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] hover:scale-105 flex items-center justify-center gap-2.5 font-medium text-sm text-center"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Voir mes réalisations
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <a
                href="#contact"
                className="px-6 sm:px-7 py-3.5 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2.5 font-medium text-sm text-center"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                <Calendar size={18} className="text-[#FF4081]" />
                Réserver un service
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Portrait & Badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center w-full pt-4 sm:pt-0"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-sm lg:max-w-[390px] mx-auto">
              {/* Ambient White Glow / Shadow behind Arch Frame */}
              <div className="absolute -inset-3 rounded-t-full rounded-b-[2.5rem] bg-white/20 blur-2xl pointer-events-none" />

              {/* Floating Presentation Video Pill Button */}
              <motion.button
                onClick={() => setIsVideoModalOpen(true)}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  duration: 0.6,
                  delay: 0.4
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="absolute top-0 sm:top-2 -right-6 sm:-right-14 md:-right-20 lg:-right-24 z-30 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 border-[#C2185B] shadow-xl shadow-[#C2185B]/20 flex items-center gap-2.5 cursor-pointer group hover:bg-white transition-all duration-300"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C2185B] flex items-center justify-center text-white shrink-0 group-hover:bg-[#E91E63] group-hover:scale-110 transition-all">
                  <Play size={12} className="ml-0.5" fill="currentColor" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-gray-900 whitespace-nowrap" style={{ fontFamily: 'var(--font-ui)' }}>
                  Ma vidéo de présentation
                </span>
              </motion.button>

              {/* Arch Portrait Frame with Pink Gradient Background & Luminous White Shadow */}
              <div className="relative rounded-t-full rounded-b-3xl overflow-hidden border border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.35),0_20px_50px_rgba(0,0,0,0.8)] bg-gradient-to-b from-white/25 to-white/10 p-1 backdrop-blur-sm">
                <div className="rounded-t-full rounded-b-[1.35rem] overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#E91E63] via-[#C2185B] to-[#880E4F] relative flex items-end justify-center pt-8">
                  {/* Subtle lighting highlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.3)_0%,transparent_65%)] pointer-events-none" />
                  <img
                    src={heroPerson}
                    alt="Absatou Thialaw"
                    className="w-full h-full object-contain object-bottom scale-110 relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>

              {/* Badges in bottom row overlapping the frame base */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[96%] sm:w-[94%] flex items-center justify-center gap-2 sm:gap-2.5 z-20">
                {/* Left Bottom Badge - 4.9/5 AVEC CLIENTS + AVATARS */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex-1 bg-[#0D0D0D]/90 backdrop-blur-md text-white rounded-full py-2 px-2.5 sm:px-3.5 shadow-2xl shadow-black/80 border border-white/20 flex items-center justify-center gap-2"
                >
                  <div className="flex -space-x-2 shrink-0">
                    <img src="/Galerie/salka.png" alt="Client" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-[#0D0D0D]" />
                    <img src="/Galerie/Sahid.png" alt="Client" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-[#0D0D0D]" />
                    <img src="/Galerie/Maguette.jpg" alt="Client" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-[#0D0D0D]" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <div className="flex items-center gap-1 font-bold text-xs sm:text-sm text-white">
                      <Star size={11} className="text-[#FFB800] fill-[#FFB800] shrink-0" />
                      <span>4.9/5</span>
                    </div>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-gray-400" style={{ fontFamily: 'var(--font-ui)' }}>
                      Avec clients
                    </span>
                  </div>
                </motion.div>

                {/* Right Bottom Badge - DISPONIBLE POUR PROJETS */}
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="flex-1 bg-[#0D0D0D]/90 backdrop-blur-md text-white rounded-full py-2 px-2.5 sm:px-3.5 shadow-2xl shadow-black/80 border border-white/20 flex items-center justify-center gap-2"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E91E63] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E91E63] shadow-[0_0_8px_#E91E63]"></span>
                  </span>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-bold text-xs sm:text-sm text-white whitespace-nowrap">Disponible</span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-gray-400 whitespace-nowrap" style={{ fontFamily: 'var(--font-ui)' }}>
                      Pour projets
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Presentation Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-auto max-w-lg max-h-[92vh] bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col mx-auto"
            >
              {/* Modal Header */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-white/10 bg-zinc-900/90 shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C2185B] flex items-center justify-center text-white shrink-0">
                    <Play size={13} className="ml-0.5" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">Vidéo de présentation</h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Absatou Thialaw • Communication & Stratégie</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative w-full max-h-[80vh] bg-black flex items-center justify-center overflow-hidden">
                <video
                  key={data.settings.presentationVideoUrl || '/Galerie/video_presentation.mp4'}
                  src={data.settings.presentationVideoUrl || '/Galerie/video_presentation.mp4'}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="max-h-[78vh] w-auto max-w-full object-contain mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
