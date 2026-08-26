import React, { useState } from 'react';
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

  const accordionItems = items.map((item) => ({
    image: item.image,
    label: `${item.title} // ${item.category}`,
    alt: item.title,
    link: '#',
  }));

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <section id="gallery" className="relative py-20 sm:py-32 bg-[#080808] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Accordion Gallery Showcase */}
        <div>
          <AccordionGallery
            items={accordionItems}
            defaultIndex={2}
            expandRatio={0.48}
            accentColor="#9333EA"
            overlayColor="#080808"
            textColor="#ffffff"
            height={isMobile ? 360 : 500}
            gap={8}
            radius={18}
            trigger="hover"
            grayscale={true}
            tilt={6}
            onItemClick={(idx) => handleOpenLightbox(idx)}
          />
          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-zinc-500">
            <span>TOQUE OU PASSE O CURSOR // TOQUE PARA AMPLIAR</span>
            <span className="text-[#C084FC]">3D PERSPECTIVE</span>
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

export default GallerySection;
