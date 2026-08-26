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
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const autoStopTimeoutRef = useRef<number | null>(null);

  // Audio Synthesizer: 124 BPM Melodic Techno & Deep House Groove (Single Instance Guarded)
  const startAtmosphereAudio = (isHoverTrigger = false) => {
    try {
      // If already playing, DO NOT start a second sound / double beat
      if (isPlayingRef.current || synthTimerRef.current !== null) {
        return;
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!masterGainRef.current) {
        const master = ctx.createGain();
        master.gain.setValueAtTime(0.24, ctx.currentTime);
        master.connect(ctx.destination);
        masterGainRef.current = master;
      }

      const master = masterGainRef.current;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(0.01, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 0.6);

      let step = 0;
      const bpm = 124;
      const stepDuration = (60 / bpm) / 4; // 16th note (approx 0.121s)
      const totalSteps = 32; // 2 bars = ~3.87 seconds phrase for hover

      // FM chord frequencies for Fm9 (F, Ab, C, Eb, G)
      const chordFreqs = [174.61, 207.65, 261.63, 311.13, 392.00];

      isPlayingRef.current = true;
      setIsPlaying(true);

      const playStep = () => {
        if (!isPlayingRef.current) return;
        const now = ctx.currentTime;

        // 1. Kick on quarter notes (steps 0, 4, 8, 12, 16, 20, 24, 28)
        if (step % 4 === 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(125, now);
          osc.frequency.exponentialRampToValueAtTime(36, now + 0.16);

          gain.gain.setValueAtTime(0.7, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

          osc.connect(gain);
          gain.connect(master);
          osc.start(now);
          osc.stop(now + 0.3);
        }

        // 2. Rolling Progressive Bassline on 16th groove
        if (step % 2 === 1 || step % 4 === 2) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          const bassNotes = [43.65, 43.65, 51.91, 43.65, 58.27, 43.65, 51.91, 38.89];
          const freq = bassNotes[Math.floor(step / 2) % bassNotes.length];

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(280, now);
          filter.frequency.exponentialRampToValueAtTime(90, now + 0.12);

          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          osc.start(now);
          osc.stop(now + 0.16);
        }

        // 3. Atmospheric Melodic Synth Pad on bar start
        if (step === 0 || step === 16) {
          chordFreqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq * 1.5, now);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(650 + idx * 80, now);
            filter.Q.setValueAtTime(2.5, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.035, now + 0.4);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(master);

            osc.start(now);
            osc.stop(now + 1.8);
          });
        }

        step = step + 1;

        // If triggered by hover, stop automatically when the phrase ends (2 full bars)
        if (isHoverTrigger && step >= totalSteps) {
          stopAtmosphereAudio();
        } else if (!isHoverTrigger) {
          step = step % 32;
        }
      };

      synthTimerRef.current = window.setInterval(playStep, stepDuration * 1000);
    } catch {
      // Audio fallback
    }
  };

  const stopAtmosphereAudio = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }
    if (audioCtxRef.current && masterGainRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  // Emblem hover trigger: plays the full phrase once; will not duplicate if hovered again while active
  const handleEmblemHover = () => {
    if (!isPlayingRef.current) {
      startAtmosphereAudio(true);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAtmosphereAudio();
    } else {
      startAtmosphereAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

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
        
        {/* 1. Liquid Chrome Metallic Emblem with Single-Instance Hover Audio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={handleEmblemHover}
          className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center mb-2 pointer-events-auto cursor-pointer group"
          title="Passe o cursor para tocar o áudio"
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
