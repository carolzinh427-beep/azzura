import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, VolumeX } from 'lucide-react';
import { EventItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';
import MetallicPaint from '../common/MetallicPaint';
import GridScan from '../common/GridScan';
import SpecularButton from '../common/SpecularButton';
import FuzzyText from '../common/FuzzyText';

interface HeroSectionProps {
  featuredEvent?: EventItem;
  onOpenTickets: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTickets,
}) => {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoStopTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Studio-Quality Melodic House & Techno Track (Local Asset, Zero Network Latency, 100% Stutter-Free)
    const audio = new Audio('/audio/azzura-beat.wav');
    audio.loop = true;
    audio.volume = 0.95; // Clear, loud and punchy
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const startAtmosphereAudio = (isHoverTrigger = false) => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.95;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play request:', err);
        });
      }
    }

    if (isHoverTrigger) {
      if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);
      // Play 7.74s full 4-bar phrase preview on hover, then fade out smoothly
      autoStopTimeoutRef.current = window.setTimeout(() => {
        stopAtmosphereAudio();
      }, 7740);
    }
  };

  const stopAtmosphereAudio = () => {
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }

    if (audioRef.current && !audioRef.current.paused) {
      let currentVol = audioRef.current.volume;
      const fadeInterval = setInterval(() => {
        if (!audioRef.current || currentVol <= 0.1) {
          clearInterval(fadeInterval);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 0.95;
          }
          isPlayingRef.current = false;
          setIsPlaying(false);
        } else {
          currentVol -= 0.15;
          if (audioRef.current) audioRef.current.volume = Math.max(0, currentVol);
        }
      }, 30);
    } else {
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  };

  // Emblem hover and click triggers
  const handleEmblemHover = () => {
    if (!isPlayingRef.current) {
      startAtmosphereAudio(true);
    }
  };

  const handleEmblemClick = () => {
    toggleAudio();
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAtmosphereAudio();
    } else {
      startAtmosphereAudio(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full bg-[#050505] text-white pt-20 pb-14 sm:pt-28 sm:pb-20 select-none">
      {/* 3D WebGL Background: Vivid Centered Laser Grid */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-90 z-0 overflow-hidden">
        <GridScan
          sensitivity={0.55}
          lineThickness={1.4}
          linesColor="#4E3D73"
          gridScale={0.09}
          scanColor="#C084FC"
          scanOpacity={0.85}
          scanDirection="pingpong"
          scanDuration={2.4}
          scanDelay={0.5}
          enablePost={true}
          bloomIntensity={0.9}
          chromaticAberration={0.002}
          noiseIntensity={0.015}
          mouseInteraction={false}
        />
      </div>

      {/* Atmospheric Vignette (Soft Edges, Clear Center) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30 pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[680px] h-[380px] sm:h-[680px] bg-[#9333EA]/22 rounded-full blur-[130px] pointer-events-none z-[1]" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* 1. Liquid Chrome Metallic Emblem with Hover & Click Audio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={handleEmblemHover}
          onClick={handleEmblemClick}
          className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center mb-2 pointer-events-auto cursor-pointer group"
          title="Clique ou passe o cursor para tocar o áudio"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute inset-2 sm:inset-4 rounded-full bg-[#A855F7]/30 blur-xl pointer-events-none group-hover:bg-[#A855F7]/50 transition-all duration-700" />
          
          <MetallicPaint
            imageSrc="/azzura-emblem.svg"
            seed={42}
            scale={3.2}
            refraction={0.015}
            blur={0.012}
            liquid={0.65}
            speed={0.35}
            brightness={1.8}
            contrast={0.6}
            angle={15}
            fresnel={1.2}
            lightColor="#FFFFFF"
            darkColor="#050505"
            tintColor="#A855F7"
            patternSharpness={1.2}
            waveAmplitude={0.9}
            noiseScale={0.6}
            chromaticSpread={1.8}
            distortion={0.8}
            contour={0.25}
            mouseAnimation={true}
            className="w-full h-full"
          />
        </motion.div>

        {/* 2. Brand Title: AZZURA with FuzzyText Effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center mb-2 sm:mb-3"
        >
          <FuzzyText
            fontSize="clamp(2.8rem, 11vw, 7.5rem)"
            fontWeight={900}
            fontFamily="'Playfair Display', Georgia, serif"
            color="#FFFFFF"
            gradient={['#FFFFFF', '#F3E8FF', '#D8B4FE', '#C084FC']}
            enableHover={true}
            baseIntensity={0.15}
            hoverIntensity={0.45}
            fuzzRange={24}
            fps={45}
            direction="horizontal"
            clickEffect={true}
            glitchMode={true}
            glitchInterval={3500}
            glitchDuration={160}
            letterSpacing={2}
            className="select-none drop-shadow-2xl"
          >
            AZZURA
          </FuzzyText>
        </motion.div>

        {/* 3. Main Manifesto / Hook */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] sm:text-sm md:text-base font-mono font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-[#C084FC] uppercase mb-3 sm:mb-4 px-2 drop-shadow"
        >
          {t.hero.tagline}
        </motion.p>

        {/* 4. Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8 px-2"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* 5. High-Intent Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mb-6 sm:mb-8"
        >
          {/* Primary Action Button */}
          <SpecularButton
            size="lg"
            tint="#9333EA"
            lineColor="#C084FC"
            baseColor="#7E22CE"
            intensity={1.3}
            radius={999}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5"
            onClick={onOpenTickets}
          >
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              {t.hero.exploreEvents}
            </span>
          </SpecularButton>

          {/* Secondary Action Button */}
          <a
            href="#experience"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15 font-mono text-[11px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{t.hero.discoverExperience}</span>
          </a>
        </motion.div>

        {/* 6. Minimalist Elegant Audio Controller */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E0E0E]/90 hover:bg-[#151515] border border-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg shadow-black/60 group"
            title="Toggle atmospheric audio"
          >
            {isPlaying ? (
              <>
                <div className="flex items-center gap-0.5 h-3 w-4 justify-center">
                  <span className="w-0.5 bg-[#C084FC] rounded-full animate-eq-1" />
                  <span className="w-0.5 bg-[#A855F7] rounded-full animate-eq-2" />
                  <span className="w-0.5 bg-[#9333EA] rounded-full animate-eq-3" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#C084FC] uppercase">
                  {t.hero.soundOn}
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  {t.hero.soundOff}
                </span>
              </>
            )}
          </button>
        </motion.div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-1 text-zinc-500"
      >
        <ArrowDown className="w-3.5 h-3.5 text-zinc-500 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
