import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Eye, Disc3 } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

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
        {/* Editorial Section Header with Cinematic Fade Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24 border-b border-white/10 pb-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight overflow-hidden">
              {/* Fade + Soft Blur In for Title Line 1 (A EXPERIÊNCIA / THE AZZURA) */}
              <motion.span
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {t.experience.title1}
              </motion.span>

              {/* Fade + Soft Blur In for Title Line 2 (AZZURA / EXPERIENCE) */}
              <motion.span
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-stroke-white text-white/30 block"
              >
                {t.experience.title2}
              </motion.span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
            className="text-sm font-mono text-zinc-400 max-w-sm leading-relaxed"
          >
            {t.experience.subtitle}
          </motion.p>
        </motion.div>

        {/* Asymmetric Editorial Collage & Narratives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Smooth Rounded Images with Fade */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              style={{ y: yParallax }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] sm:aspect-[4/4] rounded-3xl border border-white/15 overflow-hidden group bg-[#0D0D0D] shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
                alt="Azzura Night Atmosphere"
                className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-mono text-[#C084FC] tracking-widest uppercase block mb-1">
                  {t.experience.atmosphere01}
                </span>
                <p className="text-white font-display text-2xl sm:text-3xl font-bold uppercase">
                  {t.experience.atmosphere01Title}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3 Pillars with Staggered Fade In */}
          <div className="lg:col-span-6 space-y-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-6 sm:p-8 rounded-3xl bg-[#090909]/70 backdrop-blur-md border border-white/10 hover:border-[#9333EA]/60 hover:bg-[#0E0E0E] transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display font-black text-4xl sm:text-5xl text-[#A855F7] tracking-tighter opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
                      {pillar.num}
                    </span>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight group-hover:text-[#C084FC] transition-colors">
                          {pillar.title}
                        </h3>
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#A855F7] group-hover:border-[#9333EA]/40 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
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
