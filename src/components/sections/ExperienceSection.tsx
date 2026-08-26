import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Eye, Disc3, Sparkles } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import MetallicPaint from '../common/MetallicPaint';

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const PILLARS = [
    {
      num: t.experience.pillar1Num,
      title: t.experience.pillar1Title,
      desc: t.experience.pillar1Desc,
      icon: Disc3,
    },
    {
      num: t.experience.pillar2Num,
      title: t.experience.pillar2Title,
      desc: t.experience.pillar2Desc,
      icon: Compass,
    },
    {
      num: t.experience.pillar3Num,
      title: t.experience.pillar3Title,
      desc: t.experience.pillar3Desc,
      icon: Eye,
    },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-[#000000] overflow-hidden border-t border-white/10"
    >
      {/* Background Decorative Large Text Watermark */}
      <div className="absolute -top-12 left-0 right-0 overflow-hidden pointer-events-none select-none opacity-5">
        <span className="font-display font-black text-[18vw] tracking-tighter uppercase whitespace-nowrap text-white">
          {t.hero.tagline}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-none bg-[#2563EB]" />
              <span>{t.experience.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
              {t.experience.title1} <br />
              <span className="text-stroke-white text-white/30">{t.experience.title2}</span>
            </h2>
          </div>

          <p className="text-sm font-mono text-zinc-400 max-w-sm leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Asymmetric Editorial Collage & Narratives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Images + Liquid Chrome Metal Emblem */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              style={{ y: yParallax }}
              className="relative aspect-[4/5] sm:aspect-[3/4] border border-white/15 overflow-hidden group bg-[#0D0D0D]"
            >
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
                alt="Azzura Night Atmosphere"
                className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase block mb-1">
                  {t.experience.atmosphere01}
                </span>
                <p className="text-white font-display text-2xl font-bold uppercase">
                  {t.experience.atmosphere01Title}
                </p>
              </div>
            </motion.div>

            {/* Liquid Metal Insignia Box (MetallicPaint Integration) */}
            <motion.div
              style={{ y: yParallaxFast }}
              className="relative p-6 sm:p-8 bg-[#090909] border border-white/15 shadow-2xl overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="text-[10px] font-mono text-zinc-300 tracking-widest uppercase">
                    LIQUID CHROME EMBLEM
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#3B82F6]">
                  INTERACTIVE
                </span>
              </div>

              {/* WebGL Metallic Paint Canvas Container */}
              <div className="relative w-full aspect-[16/9] sm:h-48 overflow-hidden rounded-none bg-black/40 border border-white/10 flex items-center justify-center">
                <MetallicPaint
                  imageSrc="/azzura-emblem.svg"
                  seed={42}
                  scale={3.5}
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
                  tintColor="#2563EB"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>AZZURA SOUND INSIGNIA</span>
                <span className="text-zinc-500">HOVER TO DISTORT CHROMIUM</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-6 space-y-12">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group relative border-b border-white/10 pb-8 hover:border-[#2563EB]/60 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display font-black text-4xl sm:text-5xl text-[#2563EB] tracking-tighter opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
                      {pillar.num}
                    </span>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight group-hover:text-[#3B82F6] transition-colors">
                          {pillar.title}
                        </h3>
                        <Icon className="w-5 h-5 text-zinc-500 group-hover:text-[#2563EB] transition-colors" />
                      </div>

                      <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
