import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Camera } from 'lucide-react';
import { GalleryItem } from '../../types';
import { Lightbox } from '../common/Lightbox';
import { useLanguage } from '../../lib/LanguageContext';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  return (
    <section id="gallery" className="relative py-20 sm:py-32 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] tracking-widest uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
              {t.gallery.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* --- MOBILE COMPACT GALLERY (Grid 2 colunas elegante e compacto em telas pequenas) --- */}
        <div className="grid grid-cols-2 sm:hidden gap-2.5">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
              onClick={() => handleOpenLightbox(index)}
              className="relative aspect-[4/3] overflow-hidden bg-[#111111] border border-white/10 active:border-[#2563EB] group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-300 truncate max-w-[80%]">
                  {item.title}
                </span>
                <span className="text-[8px] font-mono text-[#3B82F6]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- DESKTOP & TABLET ASYMMETRIC EDITORIAL GALLERY --- */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[220px] lg:auto-rows-[250px]">
          {items.map((item, index) => {
            let colSpan = 'lg:col-span-4';
            let rowSpan = 'row-span-1';

            if (index === 0) {
              colSpan = 'lg:col-span-8';
              rowSpan = 'row-span-2';
            } else if (index === 1) {
              colSpan = 'lg:col-span-4';
              rowSpan = 'row-span-2';
            } else if (index === 2) {
              colSpan = 'lg:col-span-4';
              rowSpan = 'row-span-1';
            } else if (index === 3) {
              colSpan = 'lg:col-span-4';
              rowSpan = 'row-span-1';
            } else if (index === 4) {
              colSpan = 'lg:col-span-4';
              rowSpan = 'row-span-1';
            } else if (index === 5) {
              colSpan = 'lg:col-span-7';
              rowSpan = 'row-span-1';
            } else if (index === 6) {
              colSpan = 'lg:col-span-5';
              rowSpan = 'row-span-1';
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                onClick={() => handleOpenLightbox(index)}
                className={`relative group overflow-hidden bg-[#111111] border border-white/10 hover:border-[#2563EB]/60 transition-all duration-500 cursor-pointer ${colSpan} ${rowSpan}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Details */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/80 border border-white/20 text-[#3B82F6]">
                      {item.category}
                    </span>

                    <div className="p-1.5 bg-black/80 border border-white/20 text-white group-hover:bg-[#2563EB] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                    {item.location && (
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        {item.location} {item.eventDate ? `// ${item.eventDate}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Lightbox
        items={items}
        currentIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={handleCloseLightbox}
        onIndexChange={(newIdx) => setSelectedImageIndex(newIdx)}
      />
    </section>
  );
};
