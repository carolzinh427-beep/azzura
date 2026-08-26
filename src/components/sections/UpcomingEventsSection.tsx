import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Ticket, ArrowUpRight } from 'lucide-react';
import { EventItem } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';

interface UpcomingEventsSectionProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  events,
  onSelectEvent,
}) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | 'ROOFTOP' | 'UNDERGROUND'>('ALL');

  const filteredEvents = events.filter((e) => {
    if (filter === 'ROOFTOP') return e.venue.toLowerCase().includes('rooftop');
    if (filter === 'UNDERGROUND') return !e.venue.toLowerCase().includes('rooftop');
    return true;
  });

  return (
    <section id="events" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 border-b border-white/10 pb-8">
          <div>
            <span className="text-[11px] font-mono text-[#A855F7] tracking-[0.25em] uppercase font-bold block mb-2">
              {t.events.badge}
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight">
              {t.events.title}
            </h2>
          </div>

          {/* Category Filter Rounded Pills */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-full border border-white/10">
            {[
              { id: 'ALL', label: t.events.all },
              { id: 'ROOFTOP', label: t.events.rooftop },
              { id: 'UNDERGROUND', label: t.events.underground },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#9333EA] text-white font-bold shadow-lg shadow-[#9333EA]/35'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group rounded-3xl bg-[#0E0E0E] border border-white/10 hover:border-[#9333EA]/40 overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl hover:shadow-[#9333EA]/15"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151515]">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-90" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-mono text-[#C084FC] uppercase font-bold tracking-wider">
                    {event.status}
                  </span>
                </div>

                {/* Date on Image */}
                <div className="absolute bottom-3 left-5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-white/90">
                    <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#C084FC] transition-colors leading-snug">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span className="truncate">{event.venue} — {event.address}</span>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Lineup & Footer Actions */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {event.lineup.slice(0, 3).map((artist, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 rounded-md text-[11px] font-mono text-zinc-300"
                      >
                        {artist}
                      </span>
                    ))}
                    {event.lineup.length > 3 && (
                      <span className="px-2 py-1 text-[11px] font-mono text-[#A855F7]">
                        +{event.lineup.length - 3} {t.events.moreLineup}
                      </span>
                    )}
                  </div>

                  {/* Reserve Action Button */}
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-[#9333EA] border border-white/10 hover:border-[#9333EA] text-zinc-200 hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#9333EA]/30"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{t.events.getTickets} (£35 — £45)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
