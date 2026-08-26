import React, { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  const currentItem = items[currentIndex];
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex flex-col items-center justify-between bg-black/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar */}
        <div className="w-full max-w-7xl flex items-center justify-between z-10 py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB]">
              AZZURA ARCHIVE
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono text-zinc-400">
              {String(currentIndex + 1).padStart(2, '0')} — {String(items.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-widest text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Close Lightbox (Esc)"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Image Viewport */}
        <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden select-none">
          {/* Navigation Controls Desktop */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-none bg-black/60 hover:bg-[#2563EB] border border-white/10 text-white transition-all transform -translate-y-1/2 top-1/2 group"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-none bg-black/60 hover:bg-[#2563EB] border border-white/10 text-white transition-all transform -translate-y-1/2 top-1/2 group"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Animated Image Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[75vh] max-w-full flex items-center justify-center"
            >
              <img
                ref={imageRef}
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl border border-white/10"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Details Bar */}
        <div className="w-full max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div>
            <span className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase block">
              {currentItem.category}
            </span>
            <h3 className="text-base sm:text-lg font-display font-medium text-white">
              {currentItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            {currentItem.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                {currentItem.location}
              </span>
            )}
            {currentItem.eventDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {currentItem.eventDate}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
