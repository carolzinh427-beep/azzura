import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Camera } from 'lucide-react';
import { GalleryItem } from '../../types';
import { Lightbox } from '../common/Lightbox';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  return (
    <section id="gallery" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] tracking-widest uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL ARCHIVE & NOCTURNAL DOCUMENTATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white uppercase tracking-tight">
              GALLERY
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            Fragments of light, sound pressure, and transcendent collective energy captured across London.
          </p>
        </div>

        {/* Asymmetric Editorial Collage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 auto-rows-[280px]">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                onClick={() => handleOpenLightbox(index)}
                className={`relative group overflow-hidden bg-[#111111] border border-white/10 hover:border-[#2563EB]/60 transition-all duration-500 cursor-pointer ${colSpan} ${rowSpan}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Reveal Details */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/80 border border-white/20 text-[#3B82F6]">
                      {item.category}
                    </span>

                    <div className="p-2 bg-black/80 border border-white/20 text-white group-hover:bg-[#2563EB] transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                    {item.location && (
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        {item.location} {item.eventDate ? `// ${item.eventDate}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:hidden absolute bottom-3 left-3 px-2 py-0.5 bg-black/70 text-[9px] font-mono text-zinc-400">
                  {String(index + 1).padStart(2, '0')} // {item.category}
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
