import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import PillNav from './PillNav';

interface NavbarProps {
  onOpenTickets: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTickets }) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('#events');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#events', '#experience', '#lineup', '#gallery', '#locations', '#contact'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.querySelector(s);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.events, href: '#events' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.lineup, href: '#lineup' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.locations, href: '#locations' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const rightControls = (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <div className="flex items-center bg-black/80 border border-white/15 p-0.5 rounded-full text-[10px] font-mono">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === 'en' ? 'bg-[#9333EA] text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
          title="English"
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('pt')}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === 'pt' ? 'bg-[#9333EA] text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
          title="Português"
        >
          PT
        </button>
      </div>

      {/* Admin Link */}
      <a
        href="/admin"
        className="hidden md:flex p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
        title="Admin Portal"
        aria-label="Admin Portal"
      >
        <Shield className="w-3.5 h-3.5" />
      </a>

      {/* Get Tickets Purple CTA */}
      <button
        onClick={onOpenTickets}
        className="px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-[#9333EA]/35"
      >
        <span>{t.nav.getTickets}</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <PillNav
      logo="/favicon.svg"
      logoAlt="Azzura Events"
      items={navItems}
      activeHref={activeSection}
      baseColor="#9333EA"
      pillColor="#111111"
      pillTextColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      ease="power3.easeOut"
      rightSlot={rightControls}
    />
  );
};
