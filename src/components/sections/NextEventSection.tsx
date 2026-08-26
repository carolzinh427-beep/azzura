import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { EventItem } from '../../types';
import { CountdownTimer } from '../common/CountdownTimer';
import { useLanguage } from '../../lib/LanguageContext';
import SpecularButton from '../common/SpecularButton';

interface NextEventSectionProps {
  event: EventItem;
  countdownTarget: string;
  onOpenTickets: () => void;
}

export const NextEventSection: React.FC<NextEventSectionProps> = ({
  event,
  countdownTarget,
  onOpenTickets,
}) => {
  const { t } = useLanguage();

  return (
    <section id="next-event" className="relative py-24 sm:py-32 bg-[#080808] border-t border-white/10">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Editorial Section Header without overhead tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
              {t.nextEvent.sectionTitle}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-white uppercase tracking-widest font-semibold">
              {event.status}
            </span>
            <span>•</span>
            <span className="text-[#3B82F6]">{event.city}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative group overflow-hidden border border-white/15 aspect-[4/3] sm:aspect-[16/10] bg-[#111111]">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

              {/* Bottom Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase block">
                    {t.nextEvent.venueArchitecture}
                  </span>
                  <p className="text-white font-display text-lg sm:text-xl font-bold">
                    {event.venue}
                  </p>
                  <p className="text-xs font-mono text-zinc-400">
                    {event.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Meta Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 text-xs font-mono">
              <div className="p-3 bg-[#0E0E0E] border border-white/10 flex flex-col justify-center">
                <span className="text-zinc-500 text-[10px]">{t.nextEvent.time}</span>
                <span className="text-white font-semibold">{event.time}</span>
              </div>
              <div className="p-3 bg-[#0E0E0E] border border-white/10 flex flex-col justify-center">
                <span className="text-zinc-500 text-[10px]">{t.nextEvent.restriction}</span>
                <span className="text-white font-semibold">{event.ageRestriction || '21+ STRICT'}</span>
              </div>
              <div className="p-3 bg-[#0E0E0E] border border-white/10 flex flex-col justify-center">
                <span className="text-zinc-500 text-[10px]">{t.nextEvent.sound}</span>
                <span className="text-[#3B82F6] font-semibold">VOID ACOUSTICS</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Countdown & Lineup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                  {event.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{event.displayDate}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{event.time}</span>
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {event.description}
              </p>

              {/* Functional Live Countdown */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-widest">{t.nextEvent.countdownTitle}</span>
                  <span className="text-[#2563EB]">{t.nextEvent.countdownTz}</span>
                </div>
                <CountdownTimer targetDate={countdownTarget || event.date} />
              </div>

              {/* Lineup */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                  {t.nextEvent.lineupTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {event.lineup.map((artist, idx) => (
                    <span
                      key={artist}
                      className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                        idx === 0
                          ? 'bg-[#2563EB]/15 border-[#2563EB] text-white font-bold'
                          : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specular Action */}
            <div className="pt-6 border-t border-white/10">
              <SpecularButton
                size="lg"
                radius={8}
                tint="#2563EB"
                tintOpacity={0.95}
                lineColor="#93C5FD"
                baseColor="#1E40AF"
                intensity={1.3}
                thickness={1.5}
                onClick={onOpenTickets}
                className="w-full font-mono text-xs font-bold tracking-widest uppercase shadow-xl shadow-[#2563EB]/25"
              >
                <span>{t.nextEvent.getTicketsFor} {event.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </SpecularButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
