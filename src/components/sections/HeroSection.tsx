import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { EventItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';

interface HeroSectionProps {
  featuredEvent: EventItem;
  onOpenTickets: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredEvent, onOpenTickets }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleExploreClick = () => {
    const nextSection = document.querySelector('#next-event') || document.querySelector('#experience');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] max-h-[1200px] overflow-hidden bg-black flex flex-col justify-between select-none"
    >
      {/* Background Video Layer with Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-60 filter contrast-[1.1] brightness-[0.8]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-crowd-dancing-in-a-party-with-lights-42861-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      </motion.div>

      {/* Top Floating Brand Metadata */}
      <div className="relative z-10 pt-28 sm:pt-32 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
            {t.hero.brandTag}
          </span>
        </motion.div>

        {/* Ambient Video Sound Control */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={toggleSound}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/40 hover:bg-black/80 border border-white/15 backdrop-blur-md text-xs font-mono text-zinc-300 hover:text-white transition-colors"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#2563EB]" />}
          <span className="text-[10px] tracking-widest uppercase">{isMuted ? t.hero.soundOff : t.hero.soundOn}</span>
        </motion.button>
      </div>

      {/* Main Hero Center Content */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 px-6 sm:px-12 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        <div className="max-w-4xl space-y-4 sm:space-y-6">
          {/* Slogan Pill */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 bg-[#2563EB]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-ultra-wide text-zinc-200 uppercase">
              {t.hero.tagline}
            </span>
          </motion.div>

          {/* Main Giant Brand Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white leading-none uppercase">
              AZZURA
            </h1>
          </motion.div>

          {/* Next Event Teaser Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-zinc-300 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#2563EB] font-bold">{t.hero.nextEvent}</span>
              <span className="text-white font-semibold">{featuredEvent.title}</span>
            </div>
            <div className="hidden sm:block text-zinc-600">//</div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span>{t.hero.date}</span>
              <span>•</span>
              <span className="text-[#3B82F6]">{featuredEvent.city}</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6"
          >
            <button
              onClick={onOpenTickets}
              className="px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group shadow-xl shadow-[#2563EB]/25"
            >
              <span>{t.hero.getTickets}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button
              onClick={handleExploreClick}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md hover:border-white/30"
            >
              {t.hero.explore}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Footer Bar with Scroll Cue */}
      <div className="relative z-10 pb-8 sm:pb-10 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-end justify-between border-t border-white/5 pt-4">
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-500">
          <span>51°30'26"N 0°07'39"W</span>
          <span>•</span>
          <span>ROOFTOP & SUBTERRANEAN SESSIONS</span>
        </div>

        <button
          onClick={handleExploreClick}
          className="flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll to explore"
        >
          <span className="text-[11px] uppercase">{t.hero.scroll}</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#2563EB] group-hover:bg-[#2563EB]/10 transition-all">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
};
