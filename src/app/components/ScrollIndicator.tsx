import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <p
        className="text-white/40 text-sm uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        Scroll
      </p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        <ChevronDown size={24} className="text-[#C2185B]" />
        <ChevronDown size={24} className="text-[#C2185B]/60 -mt-4" />
        <ChevronDown size={24} className="text-[#C2185B]/30 -mt-4" />
      </motion.div>
    </div>
  );
}
