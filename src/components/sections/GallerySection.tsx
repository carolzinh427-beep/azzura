import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../types';
import { Lightbox } from '../common/Lightbox';
import { useLanguage } from '../../lib/LanguageContext';
import AccordionGallery from '../common/AccordionGallery';

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

  const accordionItems = items.slice(0, 5).map((item) => ({
    image: item.image,
    label: `${item.title} // ${item.category}`,
    alt: item.title,
    link: '#',
  }));

  return (
    <section id="gallery" className="relative py-20 sm:py-32 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] tracking-widest uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
              {t.gallery.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>INTERACTIVE KINETIC ARCHIVE</span>
          </div>
        </div>

        {/* --- 1. ACCORDION GALLERY SHOWCASE (React Bits GSAP 3D Expandable Carousel) --- */}
        <div className="mb-12">
          <AccordionGallery
            items={accordionItems}
            defaultIndex={2}
            expandRatio={0.5}
            accentColor="#2563EB"
            overlayColor="#080808"
            textColor="#ffffff"
            height={440}
            gap={12}
            radius={8}
            trigger="hover"
            grayscale={true}
            tilt={8}
            onItemClick={(idx) => handleOpenLightbox(idx)}
          />
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>HOVER TO EXPAND ATMOSPHERE // CLICK ACTIVE PANEL TO OPEN FULLSCREEN</span>
            <span className="text-[#3B82F6]">3D GSAP PERSPECTIVE</span>
          </div>
        </div>

        {/* --- 2. COMPACT MOBILE & GRID ARCHIVE --- */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block mb-4">
            ALL CAPTURED SESSIONS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                onClick={() => handleOpenLightbox(index)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#111111] border border-white/10 hover:border-[#2563EB] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-zinc-300 truncate max-w-[75%]">
                    {item.title}
                  </span>
                  <span className="text-[8px] font-mono text-[#3B82F6]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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
