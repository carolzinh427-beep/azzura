import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Instagram, Music2, Disc, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTickets: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenTickets }) => {
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { label: t.nav.events, href: '#events', number: '01' },
    { label: t.nav.experience, href: '#experience', number: '02' },
    { label: t.nav.lineup, href: '#lineup', number: '03' },
    { label: t.nav.gallery, href: '#gallery', number: '04' },
    { label: t.nav.locations, href: '#locations', number: '05' },
    { label: t.nav.contact, href: '#contact', number: '06' },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Header Inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <a
              href="#"
              onClick={() => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-display font-black text-xl tracking-tighter text-white flex items-center gap-1.5"
            >
              <span>AZZURA</span>
              <span className="text-xs text-[#2563EB] font-mono font-normal">®</span>
            </a>

            {/* Language Switcher in Mobile Header */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/5 border border-white/10 p-0.5 text-xs font-mono">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 transition-colors ${
                    language === 'en' ? 'bg-[#2563EB] text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('pt')}
                  className={`px-2.5 py-1 transition-colors ${
                    language === 'pt' ? 'bg-[#2563EB] text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  PT
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-white/5 border border-white/10 text-white hover:bg-[#2563EB] transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav Links with Staggered Entrance */}
          <nav className="my-auto py-6 space-y-3 sm:space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + index * 0.05, duration: 0.35 }}
                className="group flex items-baseline justify-between border-b border-white/5 pb-2.5 sm:pb-3 cursor-pointer"
                onClick={() => handleLinkClick(link.href)}
              >
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-xs text-[#2563EB] tracking-widest">{link.number}</span>
                  <span className="font-display text-xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#3B82F6] transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions & Social */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                onClose();
                onOpenTickets();
              }}
              className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
            >
              <span>{t.nav.getTickets}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>LONDON, UK</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Spotify"
                >
                  <Music2 className="w-4 h-4" />
                </a>
                <a
                  href="https://soundcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="SoundCloud"
                >
                  <Disc className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  onClick={() => handleLinkClick('#contact')}
                  className="hover:text-white transition-colors"
                  aria-label="Email contact"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
