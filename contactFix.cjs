const fs = require('fs');
let c = fs.readFileSync('src/app/components/Contact.tsx', 'utf-8');

// Remove dark background
c = c.replace('<section id="contact" className="py-24 px-6 relative overflow-hidden">', '<section id="contact" className="py-24 px-6 relative overflow-hidden bg-white">');
c = c.replace('<div className="absolute inset-0 bg-[#050505]" />', '');

// Replace white text with dark
c = c.replaceAll('text-white/60', 'text-gray-500');
c = c.replaceAll('text-white/70', 'text-gray-600');
c = c.replaceAll('text-white/80', 'text-gray-700');
c = c.replaceAll('text-white/40', 'text-gray-400');
c = c.replaceAll('text-white/50', 'text-gray-500');
c = c.replaceAll('text-white/90', 'text-gray-800');

// Headings
c = c.replace('className="text-4xl md:text-5xl lg:text-6xl text-white"', 'className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold"');
c = c.replaceAll('text-3xl text-white', 'text-3xl text-gray-900');
c = c.replaceAll('text-2xl text-white', 'text-2xl text-gray-900');
c = c.replaceAll('text-xl text-white', 'text-xl text-gray-900');
c = c.replaceAll('text-lg text-white', 'text-lg text-gray-900');
c = c.replaceAll('text-sm text-white', 'text-sm text-gray-900');
c = c.replaceAll('text-xs text-white', 'text-xs text-gray-900');
c = c.replaceAll('"text-white font-semibold', '"text-gray-900 font-semibold');
c = c.replaceAll('"text-white font-bold', '"text-gray-900 font-bold');
c = c.replaceAll('"text-white font-medium', '"text-gray-900 font-medium');
c = c.replaceAll(' text-white"', ' text-gray-900"');

// Backgrounds / borders
c = c.replaceAll('bg-white/5', 'bg-gray-50');
c = c.replaceAll('bg-white/10', 'bg-gray-100');
c = c.replaceAll('border-white/10', 'border-gray-200');
c = c.replaceAll('border-white/5', 'border-gray-100');
c = c.replaceAll('bg-[#0A0A0A]', 'bg-gray-50');
c = c.replaceAll('bg-[#111111]', 'bg-white');
c = c.replaceAll('placeholder-white/30', 'placeholder-gray-400');
c = c.replaceAll('placeholder:text-white/30', 'placeholder:text-gray-400');

// Input fields
c = c.replaceAll('bg-white/5 border border-white/10', 'bg-gray-50 border border-gray-200');
c = c.replaceAll('focus:border-[#C2185B] bg-white/5', 'focus:border-[#C2185B] bg-gray-50');

fs.writeFileSync('src/app/components/Contact.tsx', c, 'utf-8');
console.log('Contact.tsx updated!');
