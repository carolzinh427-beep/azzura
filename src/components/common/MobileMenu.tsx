import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Instagram, Music2, Disc, Mail, MapPin } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTickets: () => void;
}

const NAV_LINKS = [
  { label: 'EVENTS', href: '#events', number: '01' },
  { label: 'EXPERIENCE', href: '#experience', number: '02' },
  { label: 'LINEUP', href: '#lineup', number: '03' },
  { label: 'GALLERY', href: '#gallery', number: '04' },
  { label: 'LOCATIONS', href: '#locations', number: '05' },
  { label: 'CONTACT', href: '#contact', number: '06' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenTickets }) => {
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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Header Inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <a
              href="#"
              onClick={() => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-display font-black text-xl tracking-tighter text-white flex items-center gap-1.5"
            >
              <span>AZZURA</span>
              <span className="text-xs text-[#2563EB] font-mono font-normal">®</span>
            </a>

            <button
              onClick={onClose}
              className="p-2.5 bg-white/5 border border-white/10 text-white hover:bg-[#2563EB] transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links with Staggered Entrance */}
          <nav className="my-auto py-8 space-y-4 sm:space-y-6">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                className="group flex items-baseline justify-between border-b border-white/5 pb-3 sm:pb-4 cursor-pointer"
                onClick={() => handleLinkClick(link.href)}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#2563EB] tracking-widest">{link.number}</span>
                  <span className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#3B82F6] transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions & Social */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <button
              onClick={() => {
                onClose();
                onOpenTickets();
              }}
              className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
            >
              <span>GET TICKETS</span>
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
