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
    <section id="events" className="relative py-20 sm:py-32 bg-[#080808] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-1.5">
              {t.events.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight break-words">
              {t.events.title}
            </h2>
          </div>

          {/* Category Filter Rounded Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 p-1 rounded-full border border-white/10 overflow-x-auto max-w-full">
            {[
              { id: 'ALL', label: t.events.all },
              { id: 'ROOFTOP', label: t.events.rooftop },
              { id: 'UNDERGROUND', label: t.events.underground },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono tracking-wider uppercase rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#9333EA] text-white font-bold shadow-md shadow-[#9333EA]/35'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group rounded-2xl sm:rounded-3xl bg-[#0E0E0E] border border-white/10 hover:border-[#9333EA]/40 overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl"
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
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-[9px] sm:text-[10px] font-mono text-[#C084FC] uppercase font-bold tracking-wider">
                    {event.status}
                  </span>
                </div>

                {/* Date on Image */}
                <div className="absolute bottom-2.5 left-4 sm:bottom-3 sm:left-5">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-white/90">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A855F7]" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
                <div className="space-y-2.5">
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-white group-hover:text-[#C084FC] transition-colors leading-snug break-words">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-zinc-400">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A855F7] flex-shrink-0" />
                    <span className="truncate">{event.venue} — {event.address}</span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Lineup & Footer Actions */}
                <div className="space-y-3 sm:space-y-4 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {event.lineup.slice(0, 3).map((artist, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] sm:text-[11px] font-mono text-zinc-300"
                      >
                        {artist}
                      </span>
                    ))}
                    {event.lineup.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] sm:text-[11px] font-mono text-[#A855F7]">
                        +{event.lineup.length - 3} {t.events.moreLineup}
                      </span>
                    )}
                  </div>

                  {/* Reserve Action Button */}
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-[#9333EA] border border-white/10 hover:border-[#9333EA] text-zinc-200 hover:text-white font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
