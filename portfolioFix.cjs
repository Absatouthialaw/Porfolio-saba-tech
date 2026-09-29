const fs = require('fs');
let c = fs.readFileSync('src/app/components/Portfolio.tsx', 'utf-8');

// Section background
c = c.replace(
  '<section id="portfolio" className="py-24 px-6 relative overflow-hidden">',
  '<section id="portfolio" className="py-24 px-6 relative overflow-hidden bg-gray-50">'
);
c = c.replace('<div className="absolute inset-0 bg-[#050505]" />', '');
c = c.replace('<div className="absolute inset-0 bg-[#0A0A0A]" />', '');

// Dark backgrounds to white
c = c.replaceAll('bg-[#050505]', 'bg-white');
c = c.replaceAll('bg-[#0A0A0A]', 'bg-white');
c = c.replaceAll('bg-[#111111]', 'bg-white');
c = c.replaceAll('bg-white/5', 'bg-gray-100');
c = c.replaceAll('bg-white/10', 'bg-gray-100');
c = c.replaceAll('bg-black/80', 'bg-gray-900/85');
c = c.replaceAll('bg-black/60', 'bg-gray-900/70');
c = c.replaceAll('bg-black/40', 'bg-gray-900/60');
c = c.replaceAll('bg-black/90', 'bg-gray-900/90');

// Borders
c = c.replaceAll('border-white/10', 'border-gray-200');
c = c.replaceAll('border-white/5', 'border-gray-100');
c = c.replaceAll('border-white/20', 'border-gray-300');

// Text
c = c.replaceAll('text-white/60', 'text-gray-500');
c = c.replaceAll('text-white/70', 'text-gray-600');
c = c.replaceAll('text-white/80', 'text-gray-700');
c = c.replaceAll('text-white/40', 'text-gray-400');
c = c.replaceAll('text-white/50', 'text-gray-500');

// Specific headings
c = c.replaceAll('className="text-4xl md:text-5xl lg:text-6xl text-white"', 'className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold"');
c = c.replaceAll('text-3xl text-white', 'text-3xl text-gray-900');
c = c.replaceAll('text-2xl text-white', 'text-2xl text-gray-900');
c = c.replaceAll('text-xl text-white', 'text-xl text-gray-900');
c = c.replaceAll('text-lg text-white', 'text-lg text-gray-900');
c = c.replaceAll('"text-white font-bold', '"text-gray-900 font-bold');
c = c.replaceAll('"text-white font-semibold', '"text-gray-900 font-semibold');
c = c.replaceAll(' text-white"', ' text-gray-900"');

// Filter buttons (active state keep rose, inactive change)
c = c.replaceAll("text-white/60 hover:text-white", "text-gray-500 hover:text-gray-900");

fs.writeFileSync('src/app/components/Portfolio.tsx', c, 'utf-8');
console.log('Portfolio.tsx updated!');
