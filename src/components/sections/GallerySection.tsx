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

  return (
    <section id="gallery" className="relative py-24 sm:py-36 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
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
            accentColor="#2563EB"
            overlayColor="#080808"
            textColor="#ffffff"
            height={500}
            gap={12}
            radius={8}
            trigger="hover"
            grayscale={true}
            tilt={8}
            onItemClick={(idx) => handleOpenLightbox(idx)}
          />
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>HOVER TO EXPAND // CLICK TO OPEN FULLSCREEN LIGHTBOX</span>
            <span className="text-[#3B82F6]">GSAP 3D PERSPECTIVE</span>
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
