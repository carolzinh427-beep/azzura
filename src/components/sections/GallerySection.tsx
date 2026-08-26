import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { GalleryItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Rooftop', 'Atmosphere', 'Artists', 'Crowd'];

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="gallery" className="relative py-20 sm:py-32 bg-[#080808] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      {/* Subtle Ambient Backlight Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Clean Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-1.5">
              {t.gallery.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight break-words">
              {t.gallery.title}
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 p-1 rounded-full border border-white/10 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono tracking-wider uppercase rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#9333EA] text-white font-bold shadow-md shadow-[#9333EA]/35'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'ALL' ? 'TODAS AS FOTOS' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Equal Grid Gallery (Equal Proportions on Mobile & Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111111] border border-white/10 hover:border-[#9333EA]/50 aspect-[4/3] sm:aspect-[16/11] transition-all duration-500 shadow-xl"
            >
              {/* Image with Smooth Zoom */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Category Badge */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                <span className="px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-white/15 text-[9px] sm:text-[10px] font-mono text-[#C084FC] uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
              </div>

              {/* Bottom In-Place Caption */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 z-10 space-y-1">
                <h3 className="font-display text-base sm:text-xl font-bold text-white group-hover:text-[#C084FC] transition-colors leading-snug break-words">
                  {item.title}
                </h3>

                {(item.location || item.eventDate) && (
                  <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#A855F7]" />
                        {item.location}
                      </span>
                    )}
                    {item.eventDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#9333EA]" />
                        {item.eventDate}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
