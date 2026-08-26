import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Disc3 } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import LightTunnel from '../common/LightTunnel';
import SpecularButton from '../common/SpecularButton';

interface ExperienceSectionProps {
  onOpenTickets?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenTickets }) => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center bg-[#050505] border-t border-white/10 select-none overflow-hidden w-full max-w-full py-16 sm:py-24">
      {/* 3D WebGL Light Tunnel Animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto opacity-75 z-0">
        <LightTunnel
          cableColor="#381D5E"
          pulseColor="#C084FC"
          tunnelColor="#050505"
          cableCount={18}
          thickness={0.32}
          rimWidth={0.15}
          pulseSpeed={2.2}
          pulseLength={0.32}
          speed={0.14}
          glow={1.2}
          brightness={1.1}
          mouseInteraction={true}
          mouseStrength={0.12}
          className="w-full h-full"
        />
      </div>

      {/* Atmospheric Vignette & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60 pointer-events-none z-[1]" />

      {/* Floating Glassmorphic Center Portal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#080808]/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90 max-w-2xl mx-auto flex flex-col items-center space-y-5 sm:space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9333EA]/20 border border-[#9333EA]/40 text-[#C084FC] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>{t.experience.badge || 'A EXPERIÊNCIA AZZURA'}</span>
          </div>

          {/* Main Statement */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase break-words">
            THE ATMOSPHERE <br />
            <span className="text-[#C084FC]">IS EVERYTHING</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-sans leading-relaxed max-w-lg">
            {t.experience.subtitle}
          </p>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px] sm:text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              ROOFTOP SKYLINE
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              SUBTERRÂNEO
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              VOID ACOUSTICS
            </span>
          </div>

          {/* Action Button */}
          {onOpenTickets && (
            <div className="pt-3 w-full sm:w-auto">
              <SpecularButton
                size="md"
                tint="#9333EA"
                lineColor="#C084FC"
                baseColor="#7E22CE"
                intensity={1.3}
                radius={999}
                className="w-full sm:w-auto px-8 py-3 font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase"
                onClick={onOpenTickets}
              >
                <div className="flex items-center justify-center gap-2">
                  <Disc3 className="w-3.5 h-3.5" />
                  <span>GARANTIR INGRESSO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </SpecularButton>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
