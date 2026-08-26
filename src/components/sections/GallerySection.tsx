import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';
import AccordionGallery from '../common/AccordionGallery';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['ALL', 'Rooftop', 'Atmosphere', 'Artists', 'Crowd'];

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // On Desktop: show all images. On Mobile: strictly cap to 5 images for clean vertical layout.
  const displayItems = isMobile ? filteredItems.slice(0, 5) : filteredItems;

  const accordionItems = displayItems.map((item) => ({
    image: item.image,
    label: `${item.title} // ${item.category}`,
    link: '#',
    alt: item.title,
  }));

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

        {/* 3D GSAP Accordion Gallery */}
        <div>
          <AccordionGallery
            key={`${activeCategory}-${isMobile ? 'mob' : 'desk'}`}
            items={accordionItems}
            defaultIndex={Math.min(2, Math.max(0, accordionItems.length - 1))}
            expandRatio={0.52}
            accentColor="#A855F7"
            overlayColor="#080808"
            textColor="#ffffff"
            height={480}
            gap={12}
            radius={20}
            trigger="hover"
            grayscale={true}
            tilt={8}
            showLabels={true}
          />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
