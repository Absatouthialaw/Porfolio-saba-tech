import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Contact() {
  const { data } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Bonjour Absatou,\n\nNom: ${formData.name}\nTéléphone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\nMessage: ${formData.message}`;
    const whatsappNum = (data?.settings?.whatsappNumber || '221775216245').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 space-y-3"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C2185B] font-bold block mb-3"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            CONTACT / 08
          </motion.span>
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          >
            Contactez-moi
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Prête à transformer votre présence digitale ? Discutons de votre projet
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3
                style={{ fontFamily: 'var(--font-heading)' }}
                className="text-3xl text-gray-900 mb-6"
              >
                Informations de contact
              </h3>
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-gray-600 leading-relaxed"
              >
                N'hésitez pas à me contacter pour discuter de votre projet. Je réponds généralement sous 24h.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-4 sm:space-y-5">
              <a
                href={`tel:${(data.settings?.contactPhone || '+221 77 521 62 45').replace(/\s/g, '')}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#C2185B]/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FCE4EC] flex items-center justify-center text-[#C2185B] group-hover:bg-[#C2185B] group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="text-xs uppercase tracking-wider font-semibold text-gray-500"
                  >
                    Téléphone
                  </p>
                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-gray-900 font-semibold text-base"
                  >
                    {data.settings?.contactPhone || '+221 77 521 62 45'}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${data.settings?.whatsappNumber || '221775216245'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E91E63]/30 hover:border-[#E91E63] hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FCE4EC] flex items-center justify-center text-[#E91E63] group-hover:bg-[#E91E63] group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="text-xs uppercase tracking-wider font-semibold text-gray-500"
                  >
                    WhatsApp
                  </p>
                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-gray-900 font-semibold text-base"
                  >
                    {data.settings?.contactPhone || '+221 77 521 62 45'}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${data.settings?.contactEmail || 'absathialaw@gmail.com'}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#C2185B]/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FCE4EC] flex items-center justify-center text-[#C2185B] group-hover:bg-[#C2185B] group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="text-xs uppercase tracking-wider font-semibold text-gray-500"
                  >
                    Email
                  </p>
                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-gray-900 font-semibold text-base break-all"
                  >
                    {data.settings?.contactEmail || 'absathialaw@gmail.com'}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-[#FCE4EC] flex items-center justify-center text-[#C2185B]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="text-xs uppercase tracking-wider font-semibold text-gray-500"
                  >
                    Localisation
                  </p>
                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-gray-900 font-semibold text-base"
                  >
                    {data.settings?.location || 'Dakar, Sénégal'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 sm:pt-4 border-t border-gray-200/80">
              <p
                style={{ fontFamily: 'var(--font-ui)' }}
                className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3"
              >
                Réseaux sociaux
              </p>
              <div className="flex flex-nowrap items-center gap-2.5 overflow-x-auto pb-1">
                {[
                  {
                    name: 'Instagram',
                    icon: Instagram,
                    href: data.settings?.socials?.instagram || '#',
                  },
                  {
                    name: 'LinkedIn',
                    icon: Linkedin,
                    href: data.settings?.socials?.linkedin || '#',
                  },
                  {
                    name: 'Facebook',
                    icon: Facebook,
                    href: data.settings?.socials?.facebook || '#',
                  },
                  {
                    name: 'TikTok',
                    icon: () => (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.37a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 8.68 5.88c3.21-1.39 5.06-4.52 5.06-8.08V8.7a8.28 8.28 0 0 0 4.84 1.55V6.78c-.75-.01-1.48-.12-2.13-.09z"/>
                      </svg>
                    ),
                    href: data.settings?.socials?.tiktok || '#',
                  },
                  {
                    name: 'X (Twitter)',
                    icon: () => (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                    href: data.settings?.socials?.twitter || '#',
                  },
                  {
                    name: 'Snapchat',
                    icon: () => (
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.001 2.5c-3.195 0-5.748 2.355-5.783 5.485-.018 1.62.64 2.825 1.056 3.424.167.24.283.473.208.723-.105.352-.524.593-1.076.84-.712.318-1.745.78-1.84 1.706-.06.59.351 1.073.91 1.348.608.298 1.419.345 2.128.387.275.016.488.13.568.324.086.208.01.487-.215.753-.338.4-.908 1.076-.848 1.832.062.778.788 1.259 1.724 1.259.458 0 .97-.117 1.528-.35.482-.201.998-.417 1.64-.417.635 0 1.152.215 1.637.416.558.233 1.07.351 1.528.351.936 0 1.662-.481 1.724-1.259.06-.756-.51-1.432-.848-1.832-.225-.266-.3-.545-.215-.753.08-.194.293-.308.568-.324.709-.042 1.52-.089 2.128-.387.559-.275.97-.758.91-1.348-.095-.926-1.128-1.388-1.84-1.706-.552-.247-.971-.488-1.076-.84-.075-.25.041-.483.208-.723.416-.599 1.074-1.804 1.056-3.424C17.749 4.855 15.196 2.5 12.001 2.5z"/>
                      </svg>
                    ),
                    href: data.settings?.socials?.snapchat || '#',
                  },
                  {
                    name: 'Behance',
                    icon: () => (
                      <span className="font-bold text-xs">Bē</span>
                    ),
                    href: data.settings?.socials?.behance || '#',
                  },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#C2185B] hover:border-[#C2185B] hover:shadow-md transition-all duration-300 shrink-0"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#C2185B] focus:outline-none transition-colors"
                    placeholder="Votre nom"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    style={{ fontFamily: 'var(--font-ui)' }}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#C2185B] focus:outline-none transition-colors"
                    placeholder="+221 77 521 62 45"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{ fontFamily: 'var(--font-ui)' }}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#C2185B] focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  style={{ fontFamily: 'var(--font-ui)' }}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Service souhaité
                </label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-200 text-gray-900 focus:bg-white focus:border-[#C2185B] focus:outline-none transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <option value="" className="bg-white">
                    Sélectionnez un service
                  </option>
                  <option value="Community Management" className="bg-white">
                    Community Management
                  </option>
                  <option value="Design Graphique" className="bg-white">
                    Design Graphique
                  </option>
                  <option value="Création de contenu" className="bg-white">
                    Création de contenu
                  </option>
                  <option value="Production visuelle" className="bg-white">
                    Production visuelle
                  </option>
                  <option value="Marketing digital" className="bg-white">
                    Marketing digital
                  </option>
                  <option value="UX/UI & Web Design" className="bg-white">
                    UX/UI & Web Design
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ fontFamily: 'var(--font-ui)' }}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#C2185B] focus:outline-none transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              <button
                type="submit"
                className="group w-full px-6 py-4 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,24,91,0.5)] hover:scale-105 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Envoyer ma demande
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
