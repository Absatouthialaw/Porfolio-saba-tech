import { useRef } from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Testimonials() {
  const { data } = usePortfolio();
  const sliderRef = useRef<Slider>(null);

  const activeTestimonials = data.testimonials
    .filter(t => t.enabled)
    .sort((a, b) => a.order - b.order);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 15,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <section className="py-18 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden bg-[#0A0A0A] scroll-mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#C2185B]/5 blur-[120px] rounded-full pointer-events-none" />

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
            ILS ME FONT CONFIANCE / 06
          </motion.span>
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            Témoignages
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Ce que mes clients disent de notre collaboration
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings} className="testimonials-slider">
            {activeTestimonials.map((testimonial, index) => (
              <div key={index} className="px-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#C2185B]/50 transition-all duration-500 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote size={28} className="text-[#C2185B]/40" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#C2185B" className="text-[#C2185B]" />
                      ))}
                    </div>

                    {/* Text */}
                    <p
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-xs sm:text-[13px] md:text-sm text-white/75 leading-relaxed mb-6 italic"
                    >
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3.5 pt-5 border-t border-white/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#C2185B]/40 shrink-0"
                    />
                    <div>
                      <h4
                        style={{ fontFamily: 'var(--font-ui)' }}
                        className="text-white font-semibold text-xs sm:text-sm"
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        style={{ fontFamily: 'var(--font-body)' }}
                        className="text-[11px] sm:text-xs text-white/50"
                      >
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-[#C2185B] hover:border-[#C2185B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(194,24,91,0.4)]"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-[#C2185B] hover:border-[#C2185B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(194,24,91,0.4)]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-slider .slick-track {
          display: flex !important;
        }
        .testimonials-slider .slick-slide {
          height: inherit !important;
        }
        .testimonials-slider .slick-slide > div {
          height: 100%;
        }
        .testimonials-slider .slick-dots {
          bottom: -45px;
        }
        .testimonials-slider .slick-dots li button:before {
          color: #C2185B;
          font-size: 9px;
          opacity: 0.35;
        }
        .testimonials-slider .slick-dots li.slick-active button:before {
          color: #E91E63;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
