import { motion } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function FAQ() {
  const { data } = usePortfolio();

  const activeFaqs = data.faqs
    .filter(f => f.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="faq" className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-white scroll-mt-24">

      <div className="max-w-4xl mx-auto relative z-10">
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
            FAQ / 07
          </motion.span>
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          >
            Questions Fréquentes
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Tout ce que vous devez savoir sur mes services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <Accordion.Root type="single" collapsible className="space-y-4">
          {activeFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="group rounded-2xl bg-white border border-gray-200 hover:border-[#C2185B]/40 transition-all duration-300 overflow-hidden shadow-sm"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left transition-all duration-300 hover:bg-gray-50/50">
                    <span
                      style={{ fontFamily: 'var(--font-heading)' }}
                      className="text-lg md:text-xl text-gray-900 pr-4"
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={24}
                      className="text-[#C2185B] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="p-6 pt-0">
                    <p
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-gray-500 leading-relaxed"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>


      <style>{`
        @keyframes slideDown {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: var(--radix-accordion-content-height);
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            height: var(--radix-accordion-content-height);
            opacity: 1;
          }
          to {
            height: 0;
            opacity: 0;
          }
        }
        .animate-slideDown {
          animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
        .animate-slideUp {
          animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
      `}</style>
    </section>
  );
}
