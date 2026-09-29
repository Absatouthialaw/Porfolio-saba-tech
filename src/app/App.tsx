import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import { PortfolioProvider } from '../context/PortfolioContext';
import { AuthProvider } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpertiseMarquee from './components/ExpertiseMarquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import SkillsExpertise from './components/SkillsExpertise';
import ToolsExpertise from './components/ToolsExpertise';
import Mindset from './components/Mindset';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ErrorBoundary from './components/ErrorBoundary';
import grandAbout from '../imports/grand_about.jpg';
import petitAbout from '../imports/absa_rose.png';
import gradIsepFull from '../imports/grad_isep_full.jpg';
import gradIsepPortrait from '../imports/grad_isep_portrait.jpg';
import { Target, Sparkles, TrendingUp, ChevronRight, Lightbulb, CheckCircle2, GraduationCap, Code2, Rocket, ArrowRight, MessageSquare, Paintbrush, Brush, Phone, Mail, MapPin, ExternalLink, Instagram, Linkedin, Facebook, FileText, Download, CreditCard, Globe, X, RotateCw } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Import Admin layouts/pages
import AdminLayout from '../admin/layouts/AdminLayout';
import Login from '../admin/pages/Login';
import DashboardHome from '../admin/pages/DashboardHome';
import SettingsAdmin from '../admin/pages/SettingsAdmin';
import ProjectsAdmin from '../admin/pages/ProjectsAdmin';
import ServicesAdmin from '../admin/pages/ServicesAdmin';
import SkillsAdmin from '../admin/pages/SkillsAdmin';
import ToolsAdmin from '../admin/pages/ToolsAdmin';
import ProcessAdmin from '../admin/pages/ProcessAdmin';
import StatisticsAdmin from '../admin/pages/StatisticsAdmin';
import TestimonialsAdmin from '../admin/pages/TestimonialsAdmin';
import FaqAdmin from '../admin/pages/FaqAdmin';
import DownloadsAdmin from '../admin/pages/DownloadsAdmin';

// ─── SECRET SHORTCUT COMPONENT ───────────────────────────────────────────────
function AdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

// ─── DOWNLOAD BAR (Mon CV & Ma Carte de Visite) ──────────────────────────────
function DownloadBar() {
  const { data } = usePortfolio();
  const [isSitesModalOpen, setIsSitesModalOpen] = useState(false);
  
  // Handle legacy data vs new externalSites array
  let sites = data?.settings?.externalSites || [];
  
  // If no sites defined yet, add fallback so user sees them
  if (sites.length === 0) {
    if (data?.settings?.externalSiteUrl) {
      sites = [{ label: data.settings.externalSiteText || 'Site réalisé', url: data.settings.externalSiteUrl }];
    } else {
      sites = [
        { label: 'Sen Smart Concept', url: 'https://sensmartconcept.com/' },
        { label: 'Bloomies Club', url: 'https://bloomiesclub.com/' }
      ];
    }
  }

  return (
    <>
      <div className="py-7 sm:py-9 bg-white border-b border-pink-100/70 relative z-20">
        <div className="w-full mx-auto px-4 flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* CV Button */}
          <a 
            href={data?.settings?.cvUrl || "/CV_Absatou_Thialaw.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#C2185B] text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg shadow-[#C2185B]/25 hover:bg-[#E91E63] hover:scale-105 transition-all duration-300 group cursor-pointer"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            <FileText size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            <span className="whitespace-nowrap">Télécharger mon CV</span>
            <Download size={16} className="opacity-80 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Business Card Button */}
          <a 
            href={data?.settings?.businessCardUrl || "/Carte_Visite_Absatou_Thialaw.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-gray-900 border-2 border-[#C2185B] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-md hover:bg-pink-50/60 hover:scale-105 transition-all duration-300 group cursor-pointer"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            <CreditCard size={18} className="text-[#C2185B] group-hover:rotate-6 transition-transform" />
            <span className="whitespace-nowrap">Ma Carte de Visite</span>
            <Download size={16} className="text-[#C2185B] opacity-80 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* External Sites Button */}
          {sites.length > 0 && (
            <button 
              onClick={() => setIsSitesModalOpen(true)}
              className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gray-900 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg shadow-gray-900/25 hover:bg-black hover:scale-105 transition-all duration-300 group cursor-pointer"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <Globe size={18} className="text-[#C2185B] group-hover:rotate-12 transition-transform" />
              <span className="whitespace-nowrap">Sites réalisés</span>
              <ExternalLink size={16} className="opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* SITES MODAL */}
      <AnimatePresence>
        {isSitesModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSitesModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsSitesModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="p-8 pt-10 text-center">
                <div className="w-16 h-16 bg-pink-50 rounded-2xl mx-auto flex items-center justify-center mb-5">
                  <Globe size={32} className="text-[#C2185B]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Mes réalisations
                </h3>
                <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                  Découvrez quelques-uns des sites web sur lesquels j'ai eu le plaisir de travailler.
                </p>

                <div className="space-y-3">
                  {sites.map((site, idx) => (
                    <a
                      key={idx}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full p-4 rounded-xl border border-gray-100 hover:border-[#C2185B]/30 hover:bg-pink-50/50 transition-all duration-300 group text-left flex items-center justify-between"
                    >
                      <span className="font-bold text-gray-900 group-hover:text-[#C2185B] transition-colors" style={{ fontFamily: 'var(--font-ui)' }}>
                        {site.label}
                      </span>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-[#C2185B] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── ABOUT — fond blanc ───────────────────────────────────────────────────────
function About() {
  const { data } = usePortfolio();
  const [isFlipped, setIsFlipped] = useState(false);

  const pillars = [
    {
      title: 'Créativité',
      description: 'Des visuels percutants et une identité de marque unique.',
      icon: Lightbulb,
    },
    {
      title: 'Professionnalisme',
      description: 'Une méthodologie rigoureuse et le respect des délais.',
      icon: Target,
    },
    {
      title: 'Résultats',
      description: 'Des objectifs chiffrés et une performance mesurable.',
      icon: TrendingUp,
    },
  ];

  const tools = [
    'WordPress', 'Figma', 'Canva', 'Illustrator', 'Photoshop', 'CapCut', 'Intelligence Artificielle', 'React'
  ];

  const iconMap: Record<string, any> = {
    GraduationCap, Code2, Rocket
  };

  const activeRoadmap = data.roadmap
    .filter(r => r.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="about" className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Top Section: Intro & Double Photo with Synchronized 3D Flip */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-6 flex flex-col justify-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-2.5" style={{ fontFamily: 'var(--font-ui)' }}>
                — À propos / 02
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Absatou <span className="text-[#C2185B]">Thialaw</span>
              </h2>
            </div>
            <div style={{ fontFamily: 'var(--font-body)' }} className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
              <p>{data?.settings?.aboutText1 || "Passionnée par le design graphique, la création de contenu percutant et la gestion d'image de marque, je conçois des identités visuelles uniques qui captivent votre audience et renforcent votre présence."}</p>
              <p>{data?.settings?.aboutText2 || "Chaque projet est pour moi une opportunité de fusionner créativité, stratégie de communication et excellence visuelle afin de valoriser votre entreprise sur tous les canaux numériques."}</p>
            </div>

            {/* 3 Pillars Cards - Clean fine pink outline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div key={index} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C2185B]/15 hover:border-[#C2185B]/40 hover:shadow-md transition-all duration-300 group">
                    <Icon size={22} className="text-[#C2185B] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 style={{ fontFamily: 'var(--font-heading)' }} className="font-bold text-gray-900 text-sm mb-1.5 whitespace-nowrap">
                      {pillar.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)' }} className="text-xs text-gray-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Interactive Synchronized 3D Flip Photo Cards */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 relative">
            <div 
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full max-w-md mx-auto aspect-[4/5] sm:aspect-square lg:aspect-[4/5] [perspective:1400px] cursor-pointer group select-none"
            >
              
              {/* Grand Photo Card */}
              <motion.div 
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full rounded-[2rem] shadow-xl"
              >
                {/* Front Face: Graduation 01 (Orange - Sonatel / Orange Digital Center) */}
                <div 
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-gray-100"
                >
                  <img src={grandAbout} alt="Absatou Thialaw - Référente Digitale" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    {/* Text placed at Bottom-Right so it's never behind the small frame */}
                    <div className="self-end text-right space-y-1 max-w-[190px] sm:max-w-[240px] pl-2">
                      <p className="text-white font-extrabold text-xs sm:text-sm md:text-base leading-snug drop-shadow-lg">
                        Référente digitale<br />
                        <span className="text-pink-100 font-semibold text-[11px] sm:text-xs md:text-sm">à Orange Digital Center</span>
                      </p>
                      <p className="text-pink-300 text-[11px] sm:text-xs font-bold tracking-wide">
                        Promo 2025
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back Face: Graduation 02 (Bleu/Blanc - ISEP) */}
                <div 
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-gray-100"
                >
                  <img src={gradIsepPortrait} alt="Absatou Thialaw - Développement Web" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    {/* Text placed at Bottom-Right so it's never behind the small frame */}
                    <div className="self-end text-right space-y-1 max-w-[190px] sm:max-w-[240px] pl-2">
                      <p className="text-white font-extrabold text-xs sm:text-sm md:text-base leading-snug drop-shadow-lg">
                        Développement web<br />
                        <span className="text-pink-100 font-semibold text-[11px] sm:text-xs md:text-sm">à l'ISEP</span>
                      </p>
                      <p className="text-pink-300 text-[11px] sm:text-xs font-bold tracking-wide">
                        Promo 2023
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Small Overlapping Card (Synchronized Flip) */}
              <motion.div 
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-36 sm:w-48 aspect-square rounded-[2rem] border-4 sm:border-8 border-white shadow-2xl z-20"
              >
                {/* Front Face: Graduation 01 (Orange) Full Shot */}
                <div 
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 w-full h-full rounded-[1.6rem] overflow-hidden bg-gray-100"
                >
                  <img src={grandAbout} alt="Graduation Orange" className="w-full h-full object-cover object-center scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 sm:p-3.5">
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow">🎓 Promo 2025</span>
                  </div>
                </div>

                {/* Back Face: Graduation 02 (Bleu/Blanc - ISEP) Full Standing Shot with Sash */}
                <div 
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 w-full h-full rounded-[1.6rem] overflow-hidden bg-gray-100"
                >
                  <img src={gradIsepFull} alt="Graduation ISEP" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 sm:p-3.5">
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow">🎓 Promo 2023</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Interactive hint */}
            <div className="text-center pt-12 sm:pt-16 mt-2">
              <button 
                type="button"
                onClick={() => setIsFlipped(prev => !prev)}
                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-pink-50 border border-[#C2185B]/20 text-[#C2185B] text-xs sm:text-sm font-semibold hover:bg-pink-100 hover:border-[#C2185B]/40 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span>Survolez ou touchez les photos pour voir le double parcours 🎓</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Curved Roadmap Journey inspired by user's design mockup */}
        <div className="pt-10 sm:pt-12 border-t border-gray-100">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Roadmap Left Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-4"
            >
              <div>
                <span
                  className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-2"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  — MON PARCOURS & ÉVOLUTION
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-heading)' }}
                  className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold leading-tight"
                >
                  Un profil polyvalent au service de projets ambitieux
                </h3>
              </div>
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
              >
                Ce qui me caractérise ? La curiosité, la créativité, l’adaptabilité et l’envie d’apprendre. J’aime partir d’une idée, comprendre un besoin, imaginer une solution et la transformer en un projet concret, cohérent et utile.
              </p>

              {/* Mantra Quote Pill */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#F3EAD8] shadow-sm mt-3">
                <p className="text-sm font-bold text-[#C2185B] tracking-wide" style={{ fontFamily: 'var(--font-ui)' }}>
                  « J’apprends. Je crée. Je construis. J’évolue. »
                </p>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                  Ouverte aux opportunités, collaborations et projets digitaux.
                </p>
              </div>
            </motion.div>

            {/* Roadmap Right: 3 Ascending Steps with connecting dashed curve */}
            <div className="lg:col-span-7 relative pt-6 pb-2">
              {/* Decorative dashed curved line */}
              <div className="hidden md:block absolute top-1/2 left-4 right-4 -translate-y-4 h-24 pointer-events-none z-0 opacity-45">
                <svg className="w-full h-full" viewBox="0 0 500 100" fill="none">
                  <path
                    d="M 10 75 Q 160 95 250 45 T 480 15"
                    stroke="#C2185B"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 md:gap-4 relative z-10 items-end">
                {activeRoadmap.map((item, index) => {
                  const Icon = iconMap[item.iconName];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className={`relative bg-white rounded-[2rem] p-6 md:p-7 border border-gray-200 shadow-md shadow-gray-200/50 hover:shadow-xl hover:border-[#C2185B]/40 transition-all duration-300 flex flex-col items-center text-center justify-center min-h-[300px] sm:min-h-[320px] ${
                        index === 0 ? 'sm:translate-y-4' : index === 1 ? 'sm:-translate-y-2' : 'sm:-translate-y-8'
                      }`}
                    >
                      {/* Big watermark number in top right */}
                      <span
                        className="absolute top-3 right-4 text-5xl font-black text-gray-100 select-none pointer-events-none -z-0"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.step}
                      </span>

                      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center space-y-3">
                        {/* Circle checkpoint squircle */}
                        <div className="w-12 h-12 rounded-2xl bg-[#C2185B] text-white flex items-center justify-center shadow-md shadow-[#C2185B]/25 mx-auto mb-1">
                          {Icon && <Icon size={20} />}
                        </div>

                        <span
                          className="text-[10px] md:text-[11px] font-bold text-[#C2185B] uppercase tracking-wider block text-center"
                          style={{ fontFamily: 'var(--font-ui)' }}
                        >
                          {item.tag}
                        </span>

                        <h4
                          className="text-base sm:text-lg font-bold text-gray-900 leading-snug text-center"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {item.title}
                        </h4>

                        <p
                          className="text-xs sm:text-[13px] text-gray-600 leading-relaxed text-center max-w-[260px] mx-auto"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY WORK WITH ME — SÉLECTION (Existant mais optionnel) ────────────────────
function WhyWorkWithMe() {
  return null; // On le cache car le Process et l'About le remplacent visuellement bien.
}

// ─── WHY WORK WITH ME — PROCESSUS D'ACCOMPAGNEMENT ────────────────────────────
function Process() {
  const { data } = usePortfolio();
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // Handle legacy missing data or load from CMS
  let steps = data.workProcess || [];
  
  if (steps.length === 0) {
    steps = [
      {
        id: '1', num: '01', title: 'Découverte & Analyse',
        desc: 'Compréhension profonde de vos besoins, audit de l\'existant, analyse de la cible et définition claire des objectifs à atteindre.',
        iconName: 'Target', enabled: true, order: 1
      },
      {
        id: '2', num: '02', title: 'Stratégie & Idéation',
        desc: 'Élaboration d\'un plan d\'action sur-mesure, direction artistique et proposition de concepts visuels innovants.',
        iconName: 'Lightbulb', enabled: true, order: 2
      },
      {
        id: '3', num: '03', title: 'Création & Production',
        desc: 'Design UI/UX, développement technique, montage vidéo et création de contenus textuels et visuels percutants.',
        iconName: 'Brush', enabled: true, order: 3
      },
      {
        id: '4', num: '04', title: 'Lancement & Suivi',
        desc: 'Déploiement final, analyse des métriques de performance et ajustements continus pour maximiser votre impact digital.',
        iconName: 'TrendingUp', enabled: true, order: 4
      }
    ];
  }

  // Filter enabled steps and sort by order
  const activeSteps = steps.filter(s => s.enabled).sort((a, b) => a.order - b.order);

  const iconMap: Record<string, any> = {
    Target, Lightbulb, Brush, Paintbrush: Brush, TrendingUp
  };

  const colors = [
    'bg-[#C2185B]',
    'bg-[#C2185B]',
    'bg-[#C2185B]',
    'bg-[#C2185B]'
  ];

  const textColors = [
    'text-[#C2185B]',
    'text-[#C2185B]',
    'text-[#C2185B]',
    'text-[#C2185B]'
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block" style={{ fontFamily: 'var(--font-ui)' }}>
            PROCESSUS / 03
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Ma méthode de <span className="text-[#C2185B]">travail</span>
          </h2>
        </div>

        {/* Infographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {activeSteps.map((step, index) => {
            const Icon = iconMap[step.iconName] || Target;
            const bgColor = colors[index % colors.length];
            const textColor = textColors[index % textColors.length];
            const cardId = step.id || String(index);
            const isFlipped = flippedCardId === cardId;

            return (
              <motion.div
                key={cardId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setFlippedCardId(isFlipped ? null : cardId)}
                className="relative group pt-4 pr-4 h-[280px] sm:h-[300px] cursor-pointer select-none"
              >
                {/* Background colored shape offset to top right */}
                <div 
                  className={`absolute top-0 right-0 w-[95%] h-full rounded-2xl ${bgColor} z-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shadow-md`} 
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)' }}
                />

                {/* 3D Flip Container */}
                <div className="relative z-10 h-full w-full -ml-2 sm:-ml-4 mt-2 sm:mt-4 group/card [perspective:1000px]">
                  
                  {/* Flipper */}
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover/card:[transform:rotateY(180deg)]'
                    }`}
                  >
                    
                    {/* Front Face */}
                    <div className="absolute inset-0 bg-white rounded-2xl p-5 sm:p-7 shadow-[0_15px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between text-center [backface-visibility:hidden]">
                      <div className={`mt-2 ${textColor} transition-transform duration-300 group-hover/card:scale-110`}>
                        <Icon size={38} strokeWidth={1.5} />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                          {step.title}
                        </h3>
                        
                        {/* Interactive Flip Cue Badge for Mobile */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold text-[#C2185B] bg-pink-50 border border-pink-100/90 shadow-sm transition-transform duration-300 group-hover/card:scale-105">
                          <RotateCw size={11} className="text-[#C2185B]" />
                          <span>Toucher pour voir</span>
                        </span>
                      </div>
                      
                      {/* Number Circle */}
                      <div className={`w-10 h-10 rounded-full ${bgColor} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {step.num}
                      </div>
                    </div>

                    {/* Back Face - Vertically and Horizontally Centered */}
                    <div className="absolute inset-0 bg-white rounded-2xl p-6 sm:p-7 shadow-[0_15px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 border-pink-50 space-y-3 sm:space-y-4">
                      <div className="space-y-2">
                        <h3 className={`text-xs font-black ${textColor} uppercase tracking-widest text-center`} style={{ fontFamily: 'var(--font-heading)' }}>
                          Étape {step.num}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium text-center" style={{ fontFamily: 'var(--font-body)' }}>
                          {step.desc}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 shadow-sm transition-colors">
                        <RotateCw size={11} />
                        <span>Retourner</span>
                      </span>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER — FOND SOMBRE ─────────────────────────────────────────────────────
function Footer() {
  const { data } = usePortfolio();

  const socials = data.settings?.socials || {};

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: socials.instagram || '#',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: socials.linkedin || '#',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: socials.facebook || '#',
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.37a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 8.68 5.88c3.21-1.39 5.06-4.52 5.06-8.08V8.7a8.28 8.28 0 0 0 4.84 1.55V6.78c-.75-.01-1.48-.12-2.13-.09z"/>
        </svg>
      ),
      href: socials.tiktok || '#',
    },
    {
      name: 'X (Twitter)',
      icon: () => (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: socials.twitter || '#',
    },
    {
      name: 'Snapchat',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.001 2.5c-3.195 0-5.748 2.355-5.783 5.485-.018 1.62.64 2.825 1.056 3.424.167.24.283.473.208.723-.105.352-.524.593-1.076.84-.712.318-1.745.78-1.84 1.706-.06.59.351 1.073.91 1.348.608.298 1.419.345 2.128.387.275.016.488.13.568.324.086.208.01.487-.215.753-.338.4-.908 1.076-.848 1.832.062.778.788 1.259 1.724 1.259.458 0 .97-.117 1.528-.35.482-.201.998-.417 1.64-.417.635 0 1.152.215 1.637.416.558.233 1.07.351 1.528.351.936 0 1.662-.481 1.724-1.259.06-.756-.51-1.432-.848-1.832-.225-.266-.3-.545-.215-.753.08-.194.293-.308.568-.324.709-.042 1.52-.089 2.128-.387.559-.275.97-.758.91-1.348-.095-.926-1.128-1.388-1.84-1.706-.552-.247-.971-.488-1.076-.84-.075-.25.041-.483.208-.723.416-.599 1.074-1.804 1.056-3.424C17.749 4.855 15.196 2.5 12.001 2.5z"/>
        </svg>
      ),
      href: socials.snapchat || '#',
    },
    {
      name: 'Behance',
      icon: () => (
        <span className="font-bold text-xs">Bē</span>
      ),
      href: socials.behance || '#',
    },
  ];

  return (
    <footer className="py-16 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#0A0A0A] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Bio & Taplink + QR Code */}
          <div className="lg:col-span-4 space-y-4">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-white">
              Absatou <span className="text-[#C2185B]">Thialaw</span>
            </h3>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-white/60 text-sm leading-relaxed">
              Référente Digitale & Créatrice de contenu. J'accompagne les entreprises et entrepreneurs dans leur transition numérique et le déploiement d'une marque performante.
            </p>

            {/* QR Code Taplink Card */}
            <div className="pt-1 flex items-center gap-3.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-3 backdrop-blur-sm max-w-[320px] transition-colors">
              <div className="w-16 h-16 bg-white rounded-xl p-1 flex items-center justify-center shrink-0 shadow-md">
                <img src="/qr-taplink.png" alt="QR Code Taplink Absatou Thialaw" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Scanner le QR Code</span>
                <p className="text-[11px] text-white/60 leading-tight">Accédez à mon Taplink et l'ensemble de mes réseaux</p>
                <a
                  href="https://taplink.cc/absatouthialaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E91E63] hover:underline pt-0.5"
                >
                  <span>Ouvrir Taplink</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 style={{ fontFamily: 'var(--font-ui)' }} className="text-sm uppercase tracking-wider font-semibold text-white/90">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Accueil', href: '#hero' },
                { label: 'À propos', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Processus', href: '#process' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-white/60 hover:text-[#E91E63] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-2 space-y-4">
            <h4 style={{ fontFamily: 'var(--font-ui)' }} className="text-sm uppercase tracking-wider font-semibold text-white/90">
              Coordonnées
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={`tel:${(data.settings?.contactPhone || '+221 77 521 62 45').replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-[#E91E63] transition-colors">
                  <Phone size={14} className="text-[#C2185B] shrink-0" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">{data.settings?.contactPhone || '+221 77 521 62 45'}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${data.settings?.whatsappNumber || '221775216245'}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#E91E63] transition-colors">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#E91E63] flex items-center justify-center text-[9px] font-bold text-white shrink-0">W</span>
                  <span className="text-xs sm:text-sm whitespace-nowrap">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${data.settings?.contactEmail || 'absathialaw@gmail.com'}`} className="flex items-center gap-2 hover:text-[#E91E63] transition-colors break-all">
                  <Mail size={14} className="text-[#C2185B] shrink-0" />
                  <span className="text-xs sm:text-sm">{data.settings?.contactEmail || 'absathialaw@gmail.com'}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin size={14} className="text-[#C2185B] shrink-0" />
                <span className="text-xs sm:text-sm">{data.settings?.location || 'Dakar, Sénégal'}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Networks */}
          <div className="lg:col-span-4 space-y-4">
            <h4 style={{ fontFamily: 'var(--font-ui)' }} className="text-sm uppercase tracking-wider font-semibold text-white/90">
              Réseaux Sociaux
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Retrouvez mes créations, vidéos et actualités sur mes plateformes :
            </p>
            <div className="flex flex-nowrap items-center gap-2 pt-1 overflow-x-auto pb-1">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#C2185B] border border-white/10 hover:border-[#C2185B] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shrink-0"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-white/50 text-xs">
            © 2026 Absatou Thialaw. Tous droits réservés.
          </p>
          <a
            href="https://taplink.cc/absatouthialaw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#C2185B] text-xs transition-colors"
          >
            taplink.cc/absatouthialaw
          </a>
        </div>
      </div>
    </footer>
  );
}

function FrontEnd() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <ExpertiseMarquee />
      <DownloadBar />
      <About />
      <WhyWorkWithMe />
      <Services />
      <Process />
      <Portfolio />
      <SkillsExpertise />
      <ToolsExpertise />
      <Mindset />
      <Results />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <PortfolioProvider>
          <BrowserRouter>
            <AdminShortcut />
            <Routes>
              <Route path="/" element={<FrontEnd />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="projects" element={<ProjectsAdmin />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="skills" element={<SkillsAdmin />} />
                <Route path="tools" element={<ToolsAdmin />} />
                <Route path="process" element={<ProcessAdmin />} />
                <Route path="downloads" element={<DownloadsAdmin />} />
                <Route path="statistics" element={<StatisticsAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
                <Route path="faqs" element={<FaqAdmin />} />
                <Route path="settings" element={<SettingsAdmin />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<FrontEnd />} />
            </Routes>
          </BrowserRouter>
        </PortfolioProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
