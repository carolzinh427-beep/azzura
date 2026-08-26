import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight, Shield } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenTickets: () => void;
}

const NAV_ITEMS = [
  { label: 'EVENTS', href: '#events' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'LINEUP', href: '#lineup' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'LOCATIONS', href: '#locations' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenTickets }) => {
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

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md py-3.5 border-b border-white/10 shadow-lg shadow-black/40'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram & Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-none bg-white text-black flex items-center justify-center font-display font-black text-sm tracking-tighter group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
              AZ
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-tighter text-white group-hover:text-zinc-200 transition-colors">
                AZZURA<span className="text-xs text-[#2563EB] font-mono ml-0.5">®</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 hidden sm:block -mt-1">
                LONDON
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="relative text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-colors uppercase py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Admin Link */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/admin"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors rounded-none border border-transparent hover:border-white/10"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenTickets}
              className="relative px-5 py-2.5 bg-white hover:bg-[#2563EB] text-black hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 group flex items-center gap-1.5"
            >
              <span>GET TICKETS</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenTickets}
              className="px-3 py-1.5 bg-[#2563EB] text-white font-mono text-[11px] font-bold tracking-wider uppercase"
            >
              TICKETS
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Animated Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenTickets={onOpenTickets}
      />
    </>
  );
};
