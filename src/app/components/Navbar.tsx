import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logoImg from '../../imports/logo.png';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('ACCUEIL');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Real-time section spy to track active position on site
      const sections = [
        { label: 'ACCUEIL', id: 'hero' },
        { label: 'PROFIL', id: 'about' },
        { label: 'SERVICES', id: 'services' },
        { label: 'PROJETS', id: 'portfolio' },
        { label: 'CONTACT', id: 'contact' },
      ];

      const scrollPosition = window.scrollY + 250;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If close to the bottom of the page, highlight CONTACT
      if (window.scrollY + windowHeight >= docHeight - 80) {
        setActiveItem('CONTACT');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveItem(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'ACCUEIL', href: '#hero' },
    { label: 'PROFIL', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJETS', href: '#portfolio' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[92%] max-w-[1140px]"
      >
        <div className={`backdrop-blur-2xl rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-all duration-300 ${scrolled ? 'bg-white/95 border border-gray-200 shadow-xl shadow-black/5' : 'bg-white/90 border border-gray-100 shadow-lg shadow-black/5'}`}>
          <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
            {/* Logo */}
            <a
              href="#hero"
              className="flex-shrink-0 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logoImg}
                alt="absa logo"
                className="h-7 sm:h-8 md:h-10 w-auto object-contain"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {menuItems.map((item) => {
                const isActive = activeItem === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className="relative px-3 sm:px-4 py-2 flex flex-col items-center justify-center group"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    <span
                      className={`text-xs md:text-[13px] tracking-widest uppercase transition-colors duration-200 ${
                        isActive
                          ? 'text-black font-black'
                          : 'text-black/85 hover:text-black font-bold'
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute -bottom-1 left-2.5 right-2.5 h-[3px] bg-[#C2185B] rounded-full shadow-xs"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Réserver Button */}
            <a
              href="#contact"
              className="hidden lg:flex items-center justify-center px-6 py-2.5 bg-[#C2185B] text-white rounded-full hover:bg-[#E91E63] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(194,24,91,0.35)] text-xs md:text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Réserver
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl lg:hidden flex flex-col justify-center items-center px-6"
        >
          <div className="flex flex-col items-center justify-center gap-7 w-full max-w-sm">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveItem(item.label);
                }}
                className={`text-xl sm:text-2xl font-semibold tracking-widest uppercase transition-colors duration-300 ${
                  activeItem === item.label ? 'text-[#C2185B]' : 'text-gray-800 hover:text-[#C2185B]'
                }`}
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: menuItems.length * 0.08 }}
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 w-full py-3.5 bg-[#C2185B] text-white rounded-full text-center text-sm font-semibold tracking-wider uppercase hover:bg-[#E91E63] transition-colors shadow-lg shadow-[#C2185B]/25"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Réserver un service
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}
