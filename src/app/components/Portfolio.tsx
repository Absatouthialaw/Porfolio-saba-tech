import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ArrowRight, FileText, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

// Categories will be generated dynamically

export default function Portfolio() {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [selectedProject, setSelectedProject] = useState<typeof data.projects[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeProjects = data.projects
    .filter(p => p.enabled)
    .sort((a, b) => a.order - b.order);

  // Generate dynamic categories from active projects
  const uniqueCategories = Array.from(new Set(activeProjects.map(p => p.category).filter(Boolean)));
  
  // Sort categories: "Flyers" and "Vidéo" at the end
  uniqueCategories.sort((a, b) => {
    const aIsLast = a.toLowerCase().includes('flyers') || a.toLowerCase().includes('vidéo') || a.toLowerCase().includes('video');
    const bIsLast = b.toLowerCase().includes('flyers') || b.toLowerCase().includes('vidéo') || b.toLowerCase().includes('video');
    if (aIsLast && !bIsLast) return 1;
    if (!aIsLast && bIsLast) return -1;
    return a.localeCompare(b);
  });

  const categories = ['Tout', ...uniqueCategories];

  const filteredProjects =
    selectedCategory === 'Tout'
      ? activeProjects
      : activeProjects.filter((p) => p.category === selectedCategory);

  // Toggle true browser fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch((err) => {
          console.warn('Exit fullscreen failed:', err);
        });
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || !selectedProject || !selectedProject.images) return;
      const count = selectedProject.images.length;
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : count - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev !== null && prev < count - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setLightboxIndex(null);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, selectedProject]);

  return (
    <section id="portfolio" className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-3"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            TRAVAUX / 04
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          >
            Mes <span className="text-[#C2185B]">Travaux</span>
          </motion.h2>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{ fontFamily: 'var(--font-ui)' }}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#C2185B] text-white shadow-md shadow-[#C2185B]/25'
                  : 'bg-white text-gray-600 hover:text-[#C2185B] hover:border-[#C2185B]/40 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects List - 1 Project Per Row (Horizontal Card Layout on clean white background) */}
        <div className="space-y-8 md:space-y-10">
          {filteredProjects.map((project, index) => {
            const stepNumber = String(index + 1).padStart(2, '0');
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white border border-gray-200/80 rounded-[2.2rem] overflow-hidden hover:border-[#C2185B]/50 transition-all duration-500 flex flex-col md:flex-row shadow-md hover:shadow-xl hover:shadow-[#C2185B]/10"
              >
                {/* Image Container (Left Side on Desktop ~60%) */}
                <div className="relative w-full md:w-[62%] aspect-video bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
                  {project.image.endsWith('.mp4') ? (
                    <video
                      src={project.image}
                      autoPlay loop muted playsInline
                      className="w-full h-full object-contain bg-zinc-950 transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}

                  {/* White pill badge with pink text */}
                  <div 
                    className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[#C2185B] text-xs font-black tracking-widest border border-pink-100 shadow-md"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {stepNumber}
                  </div>
                </div>

                {/* Info Container (Right Side on Desktop ~38%) - Centered */}
                <div className="flex flex-col justify-center items-center text-center p-8 sm:p-10 md:p-12 lg:p-14 w-full md:w-[38%] text-gray-900 bg-white">
                  <span
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="text-gray-400 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-3 block text-center"
                  >
                    {project.category} • {project.year}
                  </span>

                  <h3
                    style={{ fontFamily: 'var(--font-heading)' }}
                    className="text-2xl sm:text-3xl lg:text-4xl text-[#C2185B] font-bold mb-4 group-hover:text-[#E91E63] transition-colors duration-300 text-center"
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-8 line-clamp-3 text-center max-w-md mx-auto"
                  >
                    {project.description}
                  </p>

                  <div className="mt-auto flex justify-center">
                    <span 
                      className="inline-flex items-center gap-2.5 text-[#C2185B] group-hover:text-[#E91E63] text-xs font-bold tracking-[0.2em] uppercase group-hover:gap-4 transition-all duration-300 border-b border-[#C2185B]/40 pb-1"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      VOIR L'ÉTUDE <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal - Enlarged Fullscreen/Max-Width Experience on White Background */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedProject(null);
              setLightboxIndex(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-8 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white text-gray-900 rounded-[1.8rem] sm:rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setLightboxIndex(null);
                }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2.5 sm:p-3 bg-white/90 hover:bg-[#C2185B] hover:text-white border border-gray-200 backdrop-blur-xl rounded-full text-gray-700 transition-colors shadow-lg cursor-pointer"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              {/* Scrollable Area */}
              <div className="overflow-y-auto w-full max-h-full custom-scrollbar">
                {/* Main Hero Image / Video of the project */}
                <div 
                  onClick={() => {
                    if (selectedProject.images && selectedProject.images.length > 0) {
                      setLightboxIndex(0);
                    }
                  }}
                  className="relative w-full aspect-video max-h-[520px] shrink-0 bg-gray-900/5 overflow-hidden flex items-center justify-center group cursor-pointer"
                >
                  {selectedProject.image.endsWith('.mp4') ? (
                    <video
                      src={selectedProject.image}
                      autoPlay loop muted playsInline controls
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating click to view prompt */}
                  <div className="absolute bottom-4 right-4 bg-black/75 hover:bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Maximize2 size={13} className="text-pink-400" />
                    <span>Agrandir & Défiler les images</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                      <span
                        style={{ fontFamily: 'var(--font-ui)' }}
                        className="inline-block px-3.5 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-pink-50 text-[#C2185B] rounded-full border border-pink-100"
                      >
                        {selectedProject.category} • {selectedProject.year}
                      </span>
                      <h3
                        style={{ fontFamily: 'var(--font-heading)' }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold"
                      >
                        {selectedProject.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      {selectedProject.pdfUrl && (
                        <a
                          href={selectedProject.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 text-xs sm:text-sm font-bold shadow-md shrink-0 text-center"
                          style={{ fontFamily: 'var(--font-ui)' }}
                        >
                          <FileText size={16} className="text-pink-400" />
                          Consulter la maquette (PDF)
                        </a>
                      )}
                      <a
                        href={`https://wa.me/221775216245?text=Bonjour Absatou, je souhaite discuter de mon projet inspiré par ${selectedProject.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-all duration-300 text-xs sm:text-sm font-bold shadow-lg shadow-[#C2185B]/25 shrink-0 text-center"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        Discuter de ce projet
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                    <div className="md:col-span-7 space-y-3">
                      <h4
                        style={{ fontFamily: 'var(--font-ui)' }}
                        className="text-xs uppercase font-bold tracking-widest text-[#C2185B]"
                      >
                        À propos du projet
                      </h4>
                      <p
                        style={{ fontFamily: 'var(--font-body)' }}
                        className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
                      >
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="md:col-span-5 p-5 sm:p-6 bg-gray-50 rounded-2xl border border-gray-200/80">
                      <h4
                        style={{ fontFamily: 'var(--font-ui)' }}
                        className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-2"
                      >
                        Résultats & Impact
                      </h4>
                      <p
                        style={{ fontFamily: 'var(--font-heading)' }}
                        className="text-lg sm:text-xl md:text-2xl text-[#C2185B] font-bold"
                      >
                        {selectedProject.results}
                      </p>
                    </div>
                  </div>

                  {/* Project Gallery - Interactive Grid with Lightbox on click */}
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div className="pt-6 border-t border-gray-100 space-y-5 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4
                            style={{ fontFamily: 'var(--font-heading)' }}
                            className="text-gray-900 text-xl sm:text-2xl font-bold flex items-center gap-2.5 sm:gap-3"
                          >
                            <span className="w-6 sm:w-8 h-[2px] bg-[#C2185B]" />
                            Galerie Complète du Projet
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Cliquez sur une image pour la visualiser en grand et faire défiler toutes les photos avec les flèches ou au doigt.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#C2185B] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 shrink-0 self-start sm:self-auto" style={{ fontFamily: 'var(--font-ui)' }}>
                          {selectedProject.images.length} visuels
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {selectedProject.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setLightboxIndex(idx)}
                            className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group hover:border-[#C2185B]/60 hover:shadow-xl transition-all duration-300 cursor-pointer"
                          >
                            {img.endsWith('.mp4') ? (
                              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                                <video
                                  src={img}
                                  autoPlay loop muted playsInline controls
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            ) : (
                              <img
                                src={img}
                                alt={`${selectedProject.title} - ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}

                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                                <Maximize2 size={13} className="text-[#C2185B]" />
                                Voir en grand ({idx + 1}/{selectedProject.images.length})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Callout Button: More creations available */}
                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-pink-50/60 border border-pink-100">
                        <div>
                          <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                            {selectedProject.category === 'Vidéo' 
                              ? '🎬 D\'autres réalisations vidéos sont disponibles !' 
                              : '✨ De nombreuses autres créations & déclinaisons disponibles !'}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                            Contactez-moi directement pour découvrir l'intégralité du catalogue et des formats.
                          </p>
                        </div>
                        <a
                          href={`https://wa.me/221775216245?text=Bonjour Absatou, je souhaite voir d'autres créations et vidéos du projet : ${selectedProject.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 sm:px-6 py-2.5 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-all duration-300 text-xs font-bold shrink-0 shadow-md shadow-[#C2185B]/20 flex items-center justify-center gap-2 text-center"
                          style={{ fontFamily: 'var(--font-ui)' }}
                        >
                          Demander plus d'exemples
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN INTERACTIVE LIGHTBOX CAROUSEL */}
      <AnimatePresence>
        {lightboxIndex !== null && selectedProject && selectedProject.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div 
              className="flex items-center justify-between px-5 sm:px-8 py-4 z-10 bg-gradient-to-b from-black/80 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base tracking-wide">
                  {selectedProject.title}
                </h4>
                <p className="text-pink-300 text-xs font-semibold">
                  {selectedProject.images[lightboxIndex]?.endsWith('.mp4') ? 'Vidéo' : 'Image'} {lightboxIndex + 1} sur {selectedProject.images.length}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Fullscreen Toggle Button */}
                <button
                  onClick={toggleFullscreen}
                  className={`p-2.5 sm:p-3 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    isFullscreen 
                      ? 'bg-[#C2185B] text-white shadow-lg shadow-[#C2185B]/50 ring-2 ring-white/40' 
                      : 'bg-white/10 hover:bg-white/25 text-white'
                  }`}
                  title={isFullscreen ? "Quitter le plein écran (F)" : "Plein écran (F)"}
                  aria-label="Plein écran"
                >
                  {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {});
                    }
                    setLightboxIndex(null);
                  }}
                  className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  title="Fermer (Échap)"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Main Center Image / Video Viewer with Navigation Arrows */}
            <div 
              className="relative flex-1 flex items-center justify-center px-4 sm:px-16 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              {selectedProject.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(prev => 
                      prev !== null && prev > 0 
                        ? prev - 1 
                        : selectedProject.images.length - 1
                    );
                  }}
                  className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-white/15 hover:bg-[#C2185B] text-white backdrop-blur-md transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                  title="Précédent (Flèche gauche)"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {/* Display Current Media */}
              <div 
                className="relative max-w-full flex items-center justify-center"
                style={{ maxHeight: isFullscreen ? '86vh' : '72vh' }}
              >
                {selectedProject.images[lightboxIndex]?.endsWith('.mp4') ? (
                  <video
                    key={selectedProject.images[lightboxIndex]}
                    src={selectedProject.images[lightboxIndex]}
                    autoPlay
                    controls
                    className="max-w-[94vw] rounded-2xl shadow-2xl bg-black object-contain transition-all duration-300"
                    style={{ maxHeight: isFullscreen ? '86vh' : '72vh' }}
                  />
                ) : (
                  <motion.img
                    key={selectedProject.images[lightboxIndex]}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    src={selectedProject.images[lightboxIndex]}
                    alt={`${selectedProject.title} - ${lightboxIndex + 1}`}
                    className="max-w-[94vw] rounded-2xl shadow-2xl object-contain transition-all duration-300"
                    style={{ maxHeight: isFullscreen ? '86vh' : '72vh' }}
                  />
                )}
              </div>

              {/* Next Button */}
              {selectedProject.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(prev => 
                      prev !== null && prev < selectedProject.images.length - 1 
                        ? prev + 1 
                        : 0
                    );
                  }}
                  className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-white/15 hover:bg-[#C2185B] text-white backdrop-blur-md transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                  title="Suivant (Flèche droite)"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>

            {/* Bottom Horizontal Thumbnails Slider */}
            {selectedProject.images.length > 1 && (
              <div 
                className="py-4 px-4 sm:px-8 bg-gradient-to-t from-black/90 to-transparent overflow-x-auto custom-scrollbar flex items-center justify-center gap-2.5 sm:gap-3.5 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedProject.images.map((thumb, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => setLightboxIndex(tIdx)}
                    className={`relative w-14 sm:w-20 aspect-video rounded-lg overflow-hidden shrink-0 transition-all duration-300 cursor-pointer ${
                      lightboxIndex === tIdx 
                        ? 'ring-2 ring-[#C2185B] scale-110 shadow-lg opacity-100' 
                        : 'opacity-40 hover:opacity-80 hover:scale-105'
                    }`}
                  >
                    {thumb.endsWith('.mp4') ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-[10px] text-white font-bold">
                        ▶ Vidéo
                      </div>
                    ) : (
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
