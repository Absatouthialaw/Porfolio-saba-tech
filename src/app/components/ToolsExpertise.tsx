import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Wrench } from 'lucide-react';
import toolsPerson from '../../imports/tools_person.png';
import capcutLogoImg from '../../imports/capcut_logo.png';
import { usePortfolio } from '../../context/PortfolioContext';

interface ToolItem {
  name: string;
  category: 'Design' | 'Vidéo' | 'Web & Dev' | 'Productivité';
  icon: React.ReactNode;
}

// ─── OFFICIEL LOGOS VECTORIELS ──────────────────────────────────────────────

// Adobe Illustrator (Ai) - Officiel
const IllustratorLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#330000] border border-[#FF9A00]/50 flex items-center justify-center shadow-xs">
    <span className="font-bold text-sm text-[#FF9A00] tracking-tight">Ai</span>
  </div>
);

// Adobe Photoshop (Ps) - Officiel
const PhotoshopLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center shadow-xs">
    <span className="font-bold text-sm text-[#31A8FF] tracking-tight">Ps</span>
  </div>
);

// Adobe InDesign (Id) - Officiel
const InDesignLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#49021F] border border-[#FF3366]/50 flex items-center justify-center shadow-xs">
    <span className="font-bold text-sm text-[#FF3366] tracking-tight">Id</span>
  </div>
);

// Adobe Premiere Pro (Pr) - Officiel
const PremiereLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#00005B] border border-[#9999FF]/50 flex items-center justify-center shadow-xs">
    <span className="font-bold text-sm text-[#9999FF] tracking-tight">Pr</span>
  </div>
);

// Adobe After Effects (Ae) - Officiel
const AfterEffectsLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#1A002C] border border-[#D291FF]/50 flex items-center justify-center shadow-xs">
    <span className="font-bold text-sm text-[#D291FF] tracking-tight">Ae</span>
  </div>
);

// Adobe Lightroom (Lr) - Officiel
const LightroomLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center shadow-xs">
    <span className="font-bold text-sm text-[#31A8FF] tracking-tight">Lr</span>
  </div>
);

// Figma - Officiel 5 couleurs
const FigmaLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xs p-2">
    <svg className="w-full h-full" viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  </div>
);

// Canva - Officiel Cyan-Violet
const CanvaLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C4CC] via-[#4A6CF7] to-[#7D2AE8] flex items-center justify-center shadow-xs text-white font-bold text-lg font-serif">
    <span>C</span>
  </div>
);

// CapCut - Logo Officiel
const CapCutLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xs p-1.5">
    <img src={capcutLogoImg} alt="CapCut Logo" className="w-full h-full object-contain" />
  </div>
);

// DaVinci Resolve - Logo Officiel 3 Pétales
const DaVinciLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-gray-800 flex items-center justify-center shadow-xs p-1.5">
    <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
      {/* Red Petal Top */}
      <path d="M16 3C18 7.5 19 11 16 14.5C13 11 14 7.5 16 3Z" fill="#FF3B30" />
      {/* Green Petal Bottom Left */}
      <path d="M5 22C9.5 20 13 19 14.5 22C11 25 7.5 24 5 22Z" fill="#34C759" />
      {/* Blue Petal Bottom Right */}
      <path d="M27 22C24.5 24 21 25 17.5 22C19 19 22.5 20 27 22Z" fill="#007AFF" />
      {/* Yellow core */}
      <circle cx="16" cy="16" r="2.5" fill="#FFCC00" />
    </svg>
  </div>
);

// WordPress - Logo Officiel
const WordPressLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#21759B] flex items-center justify-center shadow-xs p-2 text-white">
    <svg className="w-full h-full" viewBox="0 0 122.52 122.52" fill="white">
      <path d="M8.71,61.26A52.55,52.55,0,1,0,61.26,8.71,52.55,52.55,0,0,0,8.71,61.26ZM61.26,14.67A46.59,46.59,0,0,1,92.51,26.78L68.7,92.09,51.84,45.86c3-0.15,5.72-.45,5.72-0.45,2.69-.3,2.39-4.33-.3-4.33,0,0-8.07.6-13.3.6-5,0-13.15-.6-13.15-.6-2.69,0-3,4-.3,4.33,0,0,2.69.3,5.38,0.45L46,73.47,30.34,30.33a46.61,46.61,0,0,1,30.92-15.66ZM14.67,61.26a46.33,46.33,0,0,1,8.12-26.27L51.35,107A46.7,46.7,0,0,1,14.67,61.26Zm46.59,46.59a46.5,46.5,0,0,1-13.78-2.09L65.65,54.1l17.78,48.74A46.68,46.68,0,0,1,61.26,107.85Zm38.8-21.57a46.39,46.39,0,0,1-11.83,16.51L107,43.26A46.46,46.46,0,0,1,100.06,86.28Z"/>
    </svg>
  </div>
);

// Laravel - Logo Officiel
const LaravelLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#FF2D20] flex items-center justify-center shadow-xs p-2 text-white">
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.28 2.05a1.5 1.5 0 0 0-1.56 0L2.4 6.84a1.5 1.5 0 0 0-.75 1.3v9.72a1.5 1.5 0 0 0 .75 1.3l8.32 4.79a1.5 1.5 0 0 0 1.56 0l8.32-4.79a1.5 1.5 0 0 0 .75-1.3V8.14a1.5 1.5 0 0 0-.75-1.3l-8.32-4.79zM11.5 4.16l6.67 3.84-3.17 1.83-6.67-3.84 3.17-1.83zm-7.6 4.67l6.67 3.84v7.35l-6.67-3.84V8.83zm15.2 7.35l-6.67 3.84v-7.35l6.67-3.84v7.35z"/>
    </svg>
  </div>
);

// Visual Studio Code (VS Code) - Logo Officiel
const VSCodeLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#1E1E1E] border border-[#007ACC]/40 flex items-center justify-center shadow-xs p-2">
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
      <path d="M17.5 2.5L7 10.5L3.5 8L2 9L5 12L2 15L3.5 16L7 13.5L17.5 21.5L22 19.5V4.5L17.5 2.5ZM17.5 17.5L9.5 12L17.5 6.5V17.5Z" fill="#007ACC"/>
    </svg>
  </div>
);

// Git & GitHub - Logo Officiel
const GitGitHubLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#24292E] flex items-center justify-center shadow-xs p-2 text-white">
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  </div>
);

// Meta Business Suite - Logo Officiel Dégradé Bleu
const MetaLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0064E0] via-[#0081FB] to-[#00B2FF] flex items-center justify-center shadow-xs p-2 text-white">
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7.15c-1.92 0-3.52 1.4-4.22 3.32-.47 1.28-.68 2.65-.68 4.03 0 3.2 2.05 5.5 4.9 5.5 1.76 0 3.3-.9 4.22-2.35.92 1.45 2.46 2.35 4.22 2.35 2.85 0 4.9-2.3 4.9-5.5 0-1.38-.21-2.75-.68-4.03-.7-1.92-2.3-3.32-4.22-3.32-1.94 0-3.6 1.04-4.52 2.64-.92-1.6-2.58-2.64-4.52-2.64zm0 2.2c1.35 0 2.52.82 3.03 2.02.43 1.02.67 2.12.67 3.13 0 2.13-1.32 3.65-3.2 3.65-1.5 0-2.75-.98-3.08-2.42-.15-.65-.22-1.34-.22-2.03 0-2.3 1.4-4.35 2.8-4.35zm8.7 0c1.4 0 2.8 2.05 2.8 4.35 0 .69-.07 1.38-.22 2.03-.33 1.44-1.58 2.42-3.08 2.42-1.88 0-3.2-1.52-3.2-3.65 0-1.01.24-2.11.67-3.13.51-1.2 1.68-2.02 3.03-2.02z"/>
    </svg>
  </div>
);

// Microsoft Office - Logo Officiel 4 Tuiles Microsoft 365
const OfficeLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xs p-2">
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="2.5" width="9" height="9" rx="1.5" fill="#F25022"/>
      <rect x="12.5" y="2.5" width="9" height="9" rx="1.5" fill="#7FBA00"/>
      <rect x="2.5" y="12.5" width="9" height="9" rx="1.5" fill="#00A4EF"/>
      <rect x="12.5" y="12.5" width="9" height="9" rx="1.5" fill="#FFB900"/>
    </svg>
  </div>
);

// Google Suite / Workspace - Logo Officiel 4 Couleurs
const GoogleSuiteLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xs p-2">
    <svg className="w-full h-full" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  </div>
);

// Trello - Logo Officiel
const TrelloLogo = () => (
  <div className="w-10 h-10 rounded-2xl bg-[#0079BF] flex items-center justify-center shadow-xs p-2 text-white">
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#0079BF"/>
      <rect x="4" y="4" width="6.5" height="13" rx="1.5" fill="white"/>
      <rect x="13.5" y="4" width="6.5" height="9" rx="1.5" fill="white"/>
    </svg>
  </div>
);

// ─── LISTE DES 18 OUTILS ───────────────────────────────────────────────────
const customIconsMap: Record<string, React.FC> = {
  illustrator: IllustratorLogo,
  figma: FigmaLogo,
  canva: CanvaLogo,
  indesign: InDesignLogo,
  photoshop: PhotoshopLogo,
  lightroom: LightroomLogo,
  premiere: PremiereLogo,
  aftereffects: AfterEffectsLogo,
  capcut: CapCutLogo,
  davinci: DaVinciLogo,
  wordpress: WordPressLogo,
  laravel: LaravelLogo,
  vscode: VSCodeLogo,
  github: GitGitHubLogo,
  meta: MetaLogo,
  office: OfficeLogo,
  google: GoogleSuiteLogo,
  trello: TrelloLogo,
};

export default function ToolsExpertise() {
  const { data } = usePortfolio();
  
  const activeToolCategories = data.tools
    .filter(c => c.enabled)
    .sort((a, b) => a.order - b.order);

  const categories = ['Tous', ...activeToolCategories.map(c => c.category)];
  const [selectedCat, setSelectedCat] = useState<string>('Tous');

  const allTools = activeToolCategories.flatMap(c => 
    c.items.map(item => ({
      name: item.name,
      category: c.category,
      iconPath: item.iconPath
    }))
  );

  const filteredTools = selectedCat === 'Tous'
    ? allTools
    : allTools.filter(t => t.category === selectedCat);

  return (
    <section id="tools" className="py-18 sm:py-20 md:py-24 px-4 sm:px-8 md:px-14 lg:px-20 relative overflow-hidden bg-white scroll-mt-24">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#C2185B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            ENVIRONNEMENT & TECHNOLOGIES / 05
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          >
            Mes <span className="text-[#C2185B]">Outils</span> & Logiciels
          </motion.h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Une maîtrise technique avancée des meilleurs outils du marché pour concevoir des rendus professionnels, modernes et percutants.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCat === cat
                  ? 'bg-[#C2185B] text-white shadow-md shadow-[#C2185B]/25'
                  : 'bg-gray-100/80 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Main Showcase: Portrait on Left + Grid on Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Enlarged Portrait Cutout in Stylized Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[420px] lg:max-w-none h-full min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] rounded-[2.5rem] bg-gradient-to-b from-pink-50 via-pink-100/40 to-white border border-pink-100/90 p-4 shadow-xl overflow-hidden flex flex-col justify-end items-center">
              {/* Background ambient decorative glows matching burgundy/pink theme */}
              <div className="absolute top-4 left-4 w-52 h-52 bg-[#C2185B]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 right-4 w-56 h-56 bg-[#880E4F]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Tag pill at top */}
              <div className="absolute top-5 left-5 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-pink-100 shadow-md flex items-center gap-2">
                <Sparkles size={15} className="text-[#C2185B]" />
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ fontFamily: 'var(--font-ui)' }}>
                  Mes Outils Professionnels
                </span>
              </div>

              {/* Full-Body Cutout Photo positioned cleanly without clipping the head */}
              <div className="w-full h-full flex items-end justify-center pt-24 sm:pt-28 pb-8 sm:pb-12 relative z-10">
                <img
                  src={toolsPerson}
                  alt="Absatou Thialaw"
                  className="w-full h-full max-h-[600px] object-contain object-bottom scale-[1.35] sm:scale-[1.45] lg:scale-[1.55] origin-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] hover:scale-[1.6] transition-transform duration-500"
                />
              </div>

              {/* Floating bottom badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-pink-100 shadow-lg text-center">
                <p className="text-xs sm:text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  100% Maîtrise & Créativité
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Des outils pros au service de votre vision
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Grid of Tools with soft cream cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 flex flex-col justify-between"
          >
            <div className="grid gap-3 sm:gap-4 lg:gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
              {filteredTools.map((tool, index) => {
                const IconComponent = customIconsMap[tool.iconPath];
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="group bg-transparent hover:bg-white/80 border border-[#C2185B]/20 hover:border-[#C2185B]/50 rounded-2xl p-3 sm:p-4 transition-all duration-300 flex items-center gap-3 lg:gap-4 hover:shadow-md hover:shadow-[#C2185B]/10"
                  >
                    {/* Tool Logo */}
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {IconComponent && <IconComponent />}
                    </div>

                    {/* Tool Name & Category */}
                    <div className="flex-1">
                      <h3
                        className="text-xs sm:text-[13px] md:text-sm font-bold text-gray-900 leading-snug group-hover:text-[#C2185B] transition-colors whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        {tool.name}
                      </h3>
                      <span
                        className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mt-0.5 whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        {tool.category}
                      </span>
                    </div>

                    {/* Tiny Check Icon on hover */}
                    <div className="w-5 h-5 rounded-full bg-pink-50 text-[#C2185B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <CheckCircle2 size={13} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Callout Info */}
            <div className="mt-6 p-4 rounded-2xl bg-transparent border border-[#C2185B]/20 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#FCE4EC] flex items-center justify-center text-[#C2185B] shrink-0">
                <Wrench size={18} />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                Combinaison de la suite Adobe, Laravel, WordPress, outils no-code, IA et technologies web pour délivrer des résultats d'excellence dans les meilleurs délais.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
