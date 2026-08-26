import React from 'react';
import { useLanguage } from '../../lib/LanguageContext';

export const MarqueeRibbon: React.FC = () => {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="relative w-full overflow-hidden bg-[#0A0A0A] border-y border-white/10 py-3 select-none">
      <div className="flex w-max animate-marquee space-x-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-zinc-400 uppercase font-medium">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-[#9333EA]" />
          </div>
        ))}
      </div>
    </div>
  );
};
