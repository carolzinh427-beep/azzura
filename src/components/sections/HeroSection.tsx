import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';
import EchoText from '../common/EchoText';
import SpecularButton from '../common/SpecularButton';
import MetallicPaint from '../common/MetallicPaint';
import GridScan from '../common/GridScan';

interface HeroSectionProps {
  featuredEvent: EventItem;
  onOpenTickets: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredEvent, onOpenTickets }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // High-Volume Resonant Electronic Metallic Sound Engine for the Emblem
  const playEmblemSound = (boost: boolean = true) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(boost ? 0.95 : 0.75, now + 0.06);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      masterGain.connect(ctx.destination);

      // 1. Deep Sub-Bass Impact (60Hz -> 120Hz -> 40Hz)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(60, now);
      subOsc.frequency.exponentialRampToValueAtTime(120, now + 0.25);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 1.2);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.9, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
      subOsc.connect(subGain);
      subGain.connect(masterGain);

      // 2. Resonant Metallic FM Modulator
      const carrier = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const modGain = ctx.createGain();

      carrier.type = 'sawtooth';
      carrier.frequency.setValueAtTime(220, now);
      carrier.frequency.exponentialRampToValueAtTime(520, now + 0.35);

      modulator.type = 'triangle';
      modulator.frequency.setValueAtTime(329.63, now);

      modGain.gain.setValueAtTime(450, now);
      modGain.gain.exponentialRampToValueAtTime(15, now + 0.9);

      modulator.connect(carrier.frequency);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(500, now + 1.2);
      filter.Q.setValueAtTime(7.5, now);

      carrier.connect(filter);
      filter.connect(masterGain);

      // 3. Shimmering High Overtone
      const shimmer = ctx.createOscillator();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(1046.5, now);
      shimmer.frequency.exponentialRampToValueAtTime(2093, now + 0.28);

      const shimmerGain = ctx.createGain();
      shimmerGain.gain.setValueAtTime(0.45, now);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      shimmer.connect(shimmerGain);
      shimmerGain.connect(masterGain);

      subOsc.start(now);
      carrier.start(now);
      modulator.start(now);
      shimmer.start(now);

      subOsc.stop(now + 1.4);
      carrier.stop(now + 1.4);
      modulator.stop(now + 1.4);
      shimmer.stop(now + 1.4);
    } catch {
      // AudioContext fallback
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
      className="relative w-full h-screen min-h-[720px] max-h-[1250px] overflow-hidden bg-[#050505] flex flex-col justify-between select-none"
    >
      {/* Background 3D WebGL GridScan Atmosphere Layer (No video/image - pure effect) */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <GridScan
            sensitivity={0.65}
            lineThickness={1.2}
            linesColor="#2D154B"
            gridScale={0.09}
            scanColor="#A855F7"
            scanOpacity={0.65}
            enablePost={true}
            bloomIntensity={0.85}
            chromaticAberration={0.002}
            noiseIntensity={0.015}
            scanDirection="pingpong"
            scanDuration={2.4}
            scanDelay={1.0}
            scanOnClick={false}
          />
        </div>

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      </motion.div>

      {/* Spacing top */}
      <div className="relative z-10 pt-28 sm:pt-32 px-6 sm:px-12 max-w-7xl mx-auto w-full" />

      {/* Main Hero Center Content - Perfectly Centered */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 px-4 sm:px-8 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4"
      >
        {/* 1. LIQUID CHROME EMBLEM directly above AZZURA with Sound Trigger on Hover & Click */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => playEmblemSound(true)}
          onClick={() => playEmblemSound(true)}
          title="Interactive Sonic Liquid Chrome Emblem - Click or Hover for Audio"
          className="relative w-40 sm:w-56 md:w-64 h-24 sm:h-32 flex items-center justify-center pointer-events-auto cursor-pointer group"
        >
          <MetallicPaint
            imageSrc="/azzura-emblem.svg"
            seed={42}
            scale={3.2}
            patternSharpness={1.2}
            noiseScale={0.6}
            speed={0.35}
            liquid={0.65}
            mouseAnimation={true}
            brightness={1.8}
            contrast={0.6}
            refraction={0.015}
            blur={0.012}
            chromaticSpread={1.8}
            fresnel={1.2}
            angle={15}
            waveAmplitude={0.9}
            distortion={0.8}
            contour={0.25}
            lightColor="#FFFFFF"
            darkColor="#050505"
            tintColor="#A855F7"
          />

          <div className="absolute -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-mono text-[#C084FC] flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded-full border border-[#9333EA]/30 pointer-events-none">
            <Sparkles className="w-2.5 h-2.5" />
            <span>SONIC CHROMIUM</span>
          </div>
        </motion.div>

        {/* 2. Manifesto Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#A855F7] shadow-lg shadow-[#A855F7]/50" />
          <p className="text-xs sm:text-sm font-mono tracking-ultra-wide text-zinc-300 uppercase font-medium">
            {t.hero.tagline}
          </p>
          <span className="w-2 h-2 rounded-full bg-[#A855F7] shadow-lg shadow-[#A855F7]/50" />
        </motion.div>

        {/* 3. Centered Kinetic Echo Typography: AZZURA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center py-1 overflow-visible"
        >
          <EchoText
            text="AZZURA"
            echoes={10}
            lag={0.22}
            offset={30}
            direction="right"
            fade={0.72}
            blur={2.5}
            tint="#A855F7"
            mode="both"
            cursorRadius={320}
            duration={900}
            ease="ease-out"
            fontSize="clamp(3.8rem, 12vw, 9rem)"
            fontWeight={900}
            color="#FFFFFF"
            className="font-display font-black tracking-tighter text-white leading-none uppercase text-center mx-auto"
          />
        </motion.div>

        {/* 4. Next Event Bar (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-zinc-300 border-t border-white/10 max-w-xl mx-auto w-full"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#A855F7] font-bold">{t.hero.nextEvent}</span>
            <span className="text-white font-semibold">{featuredEvent.title}</span>
          </div>
          <div className="hidden sm:block text-zinc-600">//</div>
          <div className="flex items-center justify-center gap-4 text-zinc-400">
            <span>{t.hero.date}</span>
            <span>•</span>
            <span className="text-[#C084FC]">LONDON (£35 — £45)</span>
          </div>
        </motion.div>

        {/* 5. Purple Specular Buttons (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4 sm:pt-6"
        >
          <SpecularButton
            size="lg"
            radius={24}
            tint="#9333EA"
            tintOpacity={0.95}
            lineColor="#E9D5FF"
            baseColor="#7E22CE"
            intensity={1.4}
            thickness={1.5}
            shineSize={18}
            shineFade={35}
            onClick={onOpenTickets}
            className="font-mono text-xs font-bold tracking-widest uppercase shadow-2xl shadow-[#9333EA]/35"
          >
            <span>{t.hero.getTickets}</span>
            <ArrowUpRight className="w-4 h-4" />
          </SpecularButton>

          <SpecularButton
            size="lg"
            radius={24}
            tint="#ffffff"
            tintOpacity={0.06}
            blur={12}
            lineColor="#ffffff"
            baseColor="#27272a"
            intensity={1.0}
            thickness={1}
            onClick={handleExploreClick}
            className="font-mono text-xs font-bold tracking-widest uppercase"
          >
            {t.hero.explore}
          </SpecularButton>
        </motion.div>
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
          className="flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors group cursor-pointer ml-auto md:ml-0"
          aria-label="Scroll to explore"
        >
          <span className="text-[11px] uppercase">{t.hero.scroll}</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#A855F7] group-hover:bg-[#9333EA]/10 transition-all">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
};
