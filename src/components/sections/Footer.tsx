import React from 'react';
import { ArrowUp, Instagram, Music2, Disc, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'EVENTS', href: '#events' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'LINEUP', href: '#lineup' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'LOCATIONS', href: '#locations' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer className="bg-[#000000] border-t border-white/10 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Massive Brand Manifesto */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 border-b border-white/10 pb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-white">
                AZZURA
              </span>
              <span className="text-sm font-mono text-[#2563EB]">®</span>
            </div>

            <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white/90 leading-none">
              THE ATMOSPHERE <br className="hidden sm:block" />
              IS EVERYTHING.
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 p-4 bg-[#0C0C0C] border border-white/10 hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all text-xs font-mono tracking-widest uppercase group"
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 text-[#2563EB] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Middle Navigation & Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#2563EB] tracking-widest uppercase block">
              ORIGIN & LOCATION
            </span>
            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              Azzura Events is London’s premier nightlife curator, dedicated to electronic music excellence and rare architectural productions.
            </p>
            <p className="text-xs font-mono text-zinc-300">
              LONDON, UNITED KINGDOM
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors uppercase block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Channels & Socials */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block">
              CHANNELS
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>INSTAGRAM (@AZZR.LDN)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Music2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>SPOTIFY CURATED PLAYLIST</span>
                </a>
              </li>
              <li>
                <a
                  href="https://soundcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Disc className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>SOUNDCLOUD SESSIONS</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ra.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="text-[10px] font-bold text-[#2563EB]">RA</span>
                  <span>RESIDENT ADVISOR</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrative Portal */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block">
              ADMINISTRATION
            </span>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Curator management console for events, artists, and press releases.
            </p>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>ADMIN PORTAL</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © 2026 AZZURA EVENTS. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">TERMS OF ENTRY</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">SOUND HEALTH (21+)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
