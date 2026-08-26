import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Ticket } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

interface NavbarProps {
  onOpenTickets?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTickets }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#events', label: t.nav.events },
    { href: '#experience', label: t.nav.experience },
    { href: '#lineup', label: t.nav.lineup },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#locations', label: t.nav.locations },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
        isScrolled
          ? 'py-3 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-5 sm:py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Azzura Events Home"
          >
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-white group-hover:text-[#C084FC] transition-colors">
              AZZURA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-sans tracking-widest text-zinc-300 hover:text-white uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A855F7] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions (Language & Tickets CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
              title="Switch language / Alternar idioma"
            >
              <Globe className="w-3.5 h-3.5 text-[#A855F7]" />
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>

            {/* Tickets CTA */}
            {onOpenTickets && (
              <button
                onClick={onOpenTickets}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#9333EA] hover:bg-[#7E22CE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#9333EA]/35 cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>{t.nav.getTickets}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu & Language Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
              className="px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono font-bold"
            >
              {language.toUpperCase()}
            </button>

            {onOpenTickets && (
              <button
                onClick={onOpenTickets}
                className="px-3.5 py-1.5 rounded-full bg-[#9333EA] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md shadow-[#9333EA]/30"
              >
                {t.nav.getTickets}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-3 bg-[#0C0C0C]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-sans tracking-wider text-zinc-200 hover:text-white hover:bg-white/5 uppercase transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
