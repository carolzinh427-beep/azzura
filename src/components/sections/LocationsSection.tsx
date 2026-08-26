import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Volume2, Users } from 'lucide-react';
import { LocationItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';

interface LocationsSectionProps {
  locations: LocationItem[];
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ locations }) => {
  const { t } = useLanguage();

  return (
    <section id="locations" className="relative py-20 sm:py-32 bg-[#080808] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-1.5">
              {t.locations.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight break-words">
              {t.locations.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.locations.subtitle}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#0C0C0C] rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#9333EA]/50 transition-all p-5 sm:p-8 shadow-xl"
            >
              <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-[#151515] rounded-xl sm:rounded-2xl border border-white/10">
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-[9px] sm:text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-semibold">
                    {loc.type}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#A855F7] uppercase mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{loc.area}</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight break-words">
                    {loc.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-zinc-500 mt-1">
                    {loc.address}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {loc.description}
                </p>

                <div className="grid grid-cols-2 gap-3 py-3 sm:py-4 border-y border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 text-[9px] sm:text-[10px] uppercase block">{t.locations.capacity}</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5 text-[11px] sm:text-xs">
                      <Users className="w-3.5 h-3.5 text-[#A855F7]" />
                      {loc.capacity}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 text-[9px] sm:text-[10px] uppercase block">{t.locations.soundSpecs}</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5 text-[11px] sm:text-xs">
                      <Volume2 className="w-3.5 h-3.5 text-[#C084FC]" />
                      {loc.soundSystem}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {loc.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono bg-white/[0.03] border border-white/10 rounded-full text-zinc-300"
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
