import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Disc3 } from 'lucide-react';
import LightTunnel from '../common/LightTunnel';
import FoldText from '../common/FoldText';

interface ExperienceSectionProps {
  onOpenTickets?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenTickets }) => {
  return (
    <section id="experience" className="relative min-h-[65vh] sm:min-h-[80vh] flex items-center justify-center bg-[#050505] border-t border-white/10 select-none overflow-hidden w-full max-w-full py-16 sm:py-24">
      {/* 3D WebGL Light Tunnel Animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto opacity-80 z-0">
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

      {/* Floating Center Portal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#080808]/90 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/90 max-w-2xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8"
        >
          {/* FoldText Component from React Bits: 3D Origami Unfold Effect */}
          <div className="w-full flex flex-col items-center justify-center text-center">
            <FoldText
              text="THE ATMOSPHERE&#10;IS EVERYTHING"
              splitBy="char"
              hinge="top"
              trigger="scroll"
              duration={0.7}
              stagger={0.035}
              ease="power3.out"
              perspective={800}
              creaseShading={0.45}
              fontSize="clamp(2.2rem, 5.5vw, 4.4rem)"
              fontWeight={900}
              color="#FFFFFF"
              className="font-display font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(192,132,252,0.4)]"
            />
          </div>

          {/* Action Button: Non-overlapping Clean Luxury Action Button */}
          {onOpenTickets && (
            <div className="pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenTickets}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#9333EA] hover:bg-[#A855F7] text-white font-mono text-xs font-bold tracking-widest uppercase shadow-2xl shadow-[#9333EA]/40 hover:shadow-[#A855F7]/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-[#C084FC]/50 group"
              >
                <Disc3 className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-700" />
                <span>GARANTIR INGRESSO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
