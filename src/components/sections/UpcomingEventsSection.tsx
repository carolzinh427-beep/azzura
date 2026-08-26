import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Ticket } from 'lucide-react';
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
    <section id="events" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
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
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all ${
                  filter === tab.id
                    ? 'bg-[#2563EB] text-white font-bold shadow-lg shadow-[#2563EB]/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Event Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between bg-[#0E0E0E] rounded-3xl border border-white/10 hover:border-[#2563EB]/60 hover:shadow-2xl hover:shadow-[#2563EB]/10 transition-all duration-500 overflow-hidden"
            >
              {/* Top Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#151515] m-3 rounded-2xl">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-black/40" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border backdrop-blur-md ${
                    event.status === 'SELLING FAST' 
                      ? 'bg-amber-950/80 border-amber-500/80 text-amber-300'
                      : event.status === 'FINAL RELEASE'
                      ? 'bg-red-950/80 border-red-500/80 text-red-300'
                      : 'bg-black/80 border-white/20 text-white'
                  }`}>
                    {event.status}
                  </span>
                </div>

                {/* City Marker */}
                <div className="absolute top-3 right-3 text-[10px] font-mono tracking-widest text-zinc-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {event.city}
                </div>
              </div>

              {/* Event Body Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="text-[#3B82F6] font-semibold">{event.displayDate}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight group-hover:text-zinc-100 transition-colors">
                    {event.title}
                  </h3>

                  {/* Venue */}
                  <p className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{event.venue}</span>
                  </p>

                  {/* Lineup Preview */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block mb-1.5 font-semibold">
                      LINEUP
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {event.lineup.slice(0, 3).map((artist) => (
                        <span
                          key={artist}
                          className="px-2.5 py-0.5 text-[11px] font-mono bg-white/5 border border-white/10 rounded-full text-zinc-300"
                        >
                          {artist}
                        </span>
                      ))}
                      {event.lineup.length > 3 && (
                        <span className="px-2.5 py-0.5 text-[11px] font-mono bg-white/5 border border-white/10 rounded-full text-zinc-500">
                          +{event.lineup.length - 3} {t.events.moreLineup}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA & Pricing */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#3B82F6] font-bold">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>£35 — £45</span>
                  </div>

                  <button
                    onClick={() => onSelectEvent(event)}
                    className="px-4 py-2.5 bg-white group-hover:bg-[#2563EB] text-black group-hover:text-white rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-black/40"
                  >
                    <span>{t.events.getTickets}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
