import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function FloatingWhatsApp() {
  const { data } = usePortfolio();
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-4">
      {/* Main WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${(data?.settings?.whatsappNumber || '221775216245').replace(/\D/g, '')}?text=Bonjour Absatou, je souhaite discuter d'un projet`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-[#C2185B] hover:shadow-[0_0_30px_rgba(194,24,91,0.6)] z-10"
      >
        <MessageCircle size={24} className="sm:hidden text-white" />
        <MessageCircle size={28} className="hidden sm:block text-white" />
      </motion.a>

      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#C2185B] -z-10"
        animate={{
          scale: [1, 1.4, 1.4],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </div>
  );
}
