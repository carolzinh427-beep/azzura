import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Disc3 } from 'lucide-react';
import LightTunnel from '../common/LightTunnel';
import SpecularButton from '../common/SpecularButton';

interface ExperienceSectionProps {
  onOpenTickets?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenTickets }) => {
  return (
    <section id="experience" className="relative min-h-[60vh] sm:min-h-[75vh] flex items-center justify-center bg-[#050505] border-t border-white/10 select-none overflow-hidden w-full max-w-full py-16 sm:py-24">
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#080808]/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90 max-w-xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8"
        >
          {/* Main Statement */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-tight uppercase break-words">
            THE ATMOSPHERE <br />
            <span className="text-[#C084FC]">IS EVERYTHING</span>
          </h2>

          {/* Action Button */}
          {onOpenTickets && (
            <div className="w-full sm:w-auto">
              <SpecularButton
                size="lg"
                tint="#9333EA"
                lineColor="#C084FC"
                baseColor="#7E22CE"
                intensity={1.4}
                radius={999}
                className="w-full sm:w-auto px-8 py-3.5 font-mono text-xs font-bold tracking-widest uppercase shadow-xl"
                onClick={onOpenTickets}
              >
                <div className="flex items-center justify-center gap-2.5">
                  <Disc3 className="w-4 h-4" />
                  <span>GARANTIR INGRESSO</span>
                  <ArrowRight className="w-4 h-4" />
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
