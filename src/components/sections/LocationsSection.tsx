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
    <section id="locations" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
              {t.locations.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.locations.subtitle}
          </p>
        </div>

        <div className="space-y-10">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0C0C] rounded-3xl border border-white/10 hover:border-[#9333EA]/50 transition-all p-6 sm:p-8 shadow-2xl"
            >
              <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-[#151515] rounded-2xl border border-white/10">
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-semibold">
                    {loc.type}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{loc.area}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {loc.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 mt-1">
                    {loc.address}
                  </p>
                </div>

                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  {loc.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">{t.locations.capacity}</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-[#A855F7]" />
                      {loc.capacity}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">{t.locations.soundSpecs}</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#C084FC]" />
                      {loc.soundSystem}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {loc.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-[11px] font-mono bg-white/[0.03] border border-white/10 rounded-full text-zinc-300"
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
