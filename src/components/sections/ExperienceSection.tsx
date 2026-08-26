import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Disc3 } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      num: t.experience.pillar1Num,
      title: t.experience.pillar1Title,
      desc: t.experience.pillar1Desc,
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C084FC]" />,
    },
    {
      num: t.experience.pillar2Num,
      title: t.experience.pillar2Title,
      desc: t.experience.pillar2Desc,
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#A855F7]" />,
    },
    {
      num: t.experience.pillar3Num,
      title: t.experience.pillar3Title,
      desc: t.experience.pillar3Desc,
      icon: <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#9333EA]" />,
    },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-32 bg-[#050505] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      {/* Background Soft Purple Lighting */}
      <div className="absolute top-1/3 right-5 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-2"
          >
            {t.experience.badge}
          </motion.span>

          {/* Cinematic Fade & Blur Reveal Title */}
          <motion.h2
            initial={{ opacity: 0, filter: 'blur(6px)', y: 15 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-4 sm:mb-6 break-words"
          >
            <span className="block">{t.experience.title1}</span>
            <span className="text-[#C084FC] block">{t.experience.title2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xs sm:text-base text-zinc-300 font-sans leading-relaxed"
          >
            {t.experience.subtitle}
          </motion.p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-[#0E0E0E]/90 border border-white/10 hover:border-[#9333EA]/40 transition-all duration-500 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-zinc-600 group-hover:text-[#C084FC] transition-colors">
                    {pillar.num}
                  </span>
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#9333EA]/20 group-hover:border-[#9333EA]/40 transition-all">
                    {pillar.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-2xl font-display font-bold text-white tracking-tight leading-snug break-words">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/5">
                <div className="h-0.5 w-8 bg-[#9333EA]/40 group-hover:w-full group-hover:bg-[#C084FC] transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
