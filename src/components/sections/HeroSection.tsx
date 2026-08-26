import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Music } from 'lucide-react';
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
  const audioCtxRef = useRef<AudioContext | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Melodic Techno / Rooftop Party Atmosphere Synth (Warm, low volume, musical party groove)
  const playPartySound = (durationSec = 3.6) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const bpm = 124;
      const beatSec = 60 / bpm; // ~0.484s

      // Master output with soft, comfortable volume (0.24 max)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.24, now + 0.12);
      masterGain.gain.setValueAtTime(0.24, now + durationSec - 0.6);
      masterGain.gain.linearRampToValueAtTime(0.001, now + durationSec);
      masterGain.connect(ctx.destination);

      // 1. Deep 4-on-the-Floor Club Kick
      const totalBeats = Math.floor(durationSec / beatSec);
      for (let i = 0; i < totalBeats; i++) {
        const beatTime = now + i * beatSec;
        if (beatTime + 0.25 > now + durationSec) break;

        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(110, beatTime);
        kickOsc.frequency.exponentialRampToValueAtTime(45, beatTime + 0.12);

        kickGain.gain.setValueAtTime(0.45, beatTime);
        kickGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.22);

        kickOsc.connect(kickGain);
        kickGain.connect(masterGain);

        kickOsc.start(beatTime);
        kickOsc.stop(beatTime + 0.25);

        // Offbeat Shaker / Hi-Hat
        const hatTime = beatTime + beatSec * 0.5;
        if (hatTime + 0.1 < now + durationSec) {
          const hatBufferSize = Math.floor(ctx.sampleRate * 0.05);
          const hatBuffer = ctx.createBuffer(1, hatBufferSize, ctx.sampleRate);
          const hatData = hatBuffer.getChannelData(0);
          for (let j = 0; j < hatBufferSize; j++) {
            hatData[j] = (Math.random() * 2 - 1) * Math.exp(-j / (hatBufferSize * 0.35));
          }
          const hatSource = ctx.createBufferSource();
          hatSource.buffer = hatBuffer;

          const hatFilter = ctx.createBiquadFilter();
          hatFilter.type = 'highpass';
          hatFilter.frequency.setValueAtTime(6500, hatTime);

          const hatGain = ctx.createGain();
          hatGain.gain.setValueAtTime(0.12, hatTime);
          hatGain.gain.exponentialRampToValueAtTime(0.001, hatTime + 0.06);

          hatSource.connect(hatFilter);
          hatFilter.connect(hatGain);
          hatGain.connect(masterGain);

          hatSource.start(hatTime);
          hatSource.stop(hatTime + 0.07);
        }
      }

      // 2. Rolling Melodic Progressive Bassline (F minor)
      const bassNotes = [43.65, 51.91, 58.27, 43.65];
      const stepSec = beatSec / 2;
      const totalSteps = Math.floor(durationSec / stepSec);

      for (let s = 0; s < totalSteps; s++) {
        const stepTime = now + s * stepSec;
        if (stepTime + 0.2 > now + durationSec) break;

        const noteFreq = bassNotes[s % bassNotes.length];
        const bassOsc = ctx.createOscillator();
        const bassFilter = ctx.createBiquadFilter();
        const bassGain = ctx.createGain();

        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(noteFreq, stepTime);

        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(220, stepTime);
        bassFilter.frequency.exponentialRampToValueAtTime(480, stepTime + 0.04);
        bassFilter.frequency.exponentialRampToValueAtTime(160, stepTime + stepSec * 0.8);
        bassFilter.Q.setValueAtTime(3.0, stepTime);

        bassGain.gain.setValueAtTime(0.22, stepTime);
        bassGain.gain.exponentialRampToValueAtTime(0.001, stepTime + stepSec * 0.85);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);

        bassOsc.start(stepTime);
        bassOsc.stop(stepTime + stepSec);
      }

      // 3. Lush Melodic Rooftop Party Synth Chords (Fm9)
      const chordFreqs = [174.61, 207.65, 261.63, 311.13, 392.00];
      chordFreqs.forEach((freq, idx) => {
        const padOsc = ctx.createOscillator();
        const padFilter = ctx.createBiquadFilter();
        const padGain = ctx.createGain();

        padOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        padOsc.frequency.setValueAtTime(freq, now);

        padFilter.type = 'lowpass';
        padFilter.frequency.setValueAtTime(550, now);
        padFilter.frequency.linearRampToValueAtTime(1100, now + durationSec * 0.4);
        padFilter.frequency.linearRampToValueAtTime(450, now + durationSec);

        padGain.gain.setValueAtTime(0.001, now);
        padGain.gain.linearRampToValueAtTime(0.08, now + 0.3);
        padGain.gain.setValueAtTime(0.08, now + durationSec - 0.5);
        padGain.gain.linearRampToValueAtTime(0.001, now + durationSec);

        padOsc.connect(padFilter);
        padFilter.connect(padGain);
        padGain.connect(masterGain);

        padOsc.start(now);
        padOsc.stop(now + durationSec);
      });
    } catch {
      // audio fallback
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
      {/* Background 3D WebGL GridScan Atmosphere Layer (Centered, static perspective without mouse tracking) */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <GridScan
            mouseInteraction={false}
            sensitivity={0}
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

        {/* Ambient Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      </motion.div>

      {/* Top spacing */}
      <div className="relative z-10 pt-28 sm:pt-32 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-end">
        <button
          onClick={() => playPartySound(4.0)}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-black/50 hover:bg-[#9333EA]/20 border border-white/15 hover:border-[#9333EA]/50 backdrop-blur-md rounded-full text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
          title="Play Party Preview Groove"
          aria-label="Play Party Sound Groove"
        >
          <Music className="w-3.5 h-3.5 text-[#C084FC] animate-pulse" />
          <span className="text-[10px] tracking-widest uppercase">ATMOSPHERE PREVIEW</span>
        </button>
      </div>

      {/* Main Hero Center Content - Perfectly Centered */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 px-4 sm:px-8 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4"
      >
        {/* 1. LIQUID CHROME EMBLEM directly above AZZURA with Party Groove Sound on Hover & Click */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => playPartySound(3.0)}
          onClick={() => playPartySound(4.0)}
          title="Azzura Atmosphere - Click or Hover for Party Groove"
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

          <div className="absolute -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-mono text-[#C084FC] flex items-center gap-1 bg-black/80 px-2.5 py-0.5 rounded-full border border-[#9333EA]/30 pointer-events-none shadow-lg">
            <Music className="w-2.5 h-2.5 text-[#A855F7]" />
            <span>AZZURA PARTY BEAT</span>
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
