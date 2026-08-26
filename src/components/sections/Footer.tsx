import React from 'react';
import { ArrowUp, Instagram, Music2, Disc } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import LightTunnel from '../common/LightTunnel';

interface FooterProps {
  onOpenTickets?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTickets }) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020202] text-white border-t border-white/10 overflow-hidden select-none">
      {/* Background WebGL LightTunnel Effect */}
      <div className="absolute inset-0 w-full h-full opacity-45 pointer-events-none">
        <LightTunnel
          cableColor="#9333EA"
          pulseColor="#C084FC"
          tunnelColor="#7E22CE"
          tunnelOpacity={0.08}
          speed={0.12}
          flowDirection="outward"
          pulseSpeed={2.2}
          pulseLength={0.32}
          pulseBlend={1}
          pulseWidth={1}
          cableCount={24}
          thickness={0.38}
          rimWidth={0.18}
          waviness={0.25}
          sway={0.45}
          size={1.1}
          centerX={0.0}
          centerY={0.0}
          glow={1.2}
          fadeNear={0.3}
          fadeFar={2.2}
          brightness={1.1}
          colorVariance={true}
          grain={true}
          grainIntensity={0.04}
          opacity={0.9}
          mouseInteraction={true}
          mouseStrength={0.12}
        />
      </div>

      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/70 to-[#020202]/90 pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white">
                AZZURA
              </h3>
              <p className="text-xs font-mono text-[#A855F7] tracking-widest uppercase">
                {t.hero.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-md">
              {t.footer.originDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#9333EA] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
                aria-label="Azzura Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#9333EA] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
                aria-label="Azzura Spotify"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href="https://soundcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#9333EA] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
                aria-label="Azzura SoundCloud"
              >
                <Disc className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono text-white tracking-widest uppercase block font-semibold">
              {t.footer.navTitle}
            </span>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  {t.nav.events}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  {t.nav.experience}
                </a>
              </li>
              <li>
                <a href="#lineup" className="hover:text-white transition-colors">
                  {t.nav.lineup}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  {t.nav.locations}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Access */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono text-white tracking-widest uppercase block font-semibold">
              {t.footer.originTitle}
            </span>
            <p className="text-xs font-mono text-zinc-400 leading-relaxed">
              {t.footer.location} <br />
              Direct: contact@azzura.events <br />
              VIP Tables: vip@azzura.events
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenTickets && (
                <button
                  onClick={onOpenTickets}
                  className="px-5 py-2.5 bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-[#9333EA]/35"
                >
                  {t.nav.getTickets} (£35 — £45)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span>{t.footer.copyright}</span>
            <span>{t.footer.soundHealth}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span className="text-[11px] uppercase">{t.footer.backToTop}</span>
            <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#9333EA] group-hover:bg-[#9333EA]/10 transition-all">
              <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
