import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight, Ticket } from 'lucide-react';
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
      {/* Soft Radial Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#9333EA]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
              {t.nextEvent.sectionTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="px-3.5 py-1.5 bg-[#9333EA]/20 border border-[#9333EA]/40 rounded-full text-white uppercase font-bold tracking-widest">
              {event.status}
            </span>
            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#C084FC] font-semibold">
              TIERS £35 — £45
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Smooth Rounded Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative group overflow-hidden rounded-3xl border border-white/15 aspect-[4/3] sm:aspect-[16/10] bg-[#111111] shadow-2xl">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

              {/* Bottom Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#C084FC] tracking-widest uppercase block mb-1">
                    {t.nextEvent.venueArchitecture}
                  </span>
                  <p className="text-white font-display text-xl sm:text-2xl font-bold">
                    {event.venue}
                  </p>
                  <p className="text-xs font-mono text-zinc-300">
                    {event.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Meta Strip - Soft Rounded Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 text-xs font-mono">
              <div className="p-4 bg-[#0E0E0E] rounded-2xl border border-white/10 flex flex-col justify-center">
                <span className="text-zinc-500 text-[10px] uppercase">{t.nextEvent.time}</span>
                <span className="text-white font-semibold mt-0.5">{event.time}</span>
              </div>
              <div className="p-4 bg-[#0E0E0E] rounded-2xl border border-white/10 flex flex-col justify-center">
                <span className="text-zinc-500 text-[10px] uppercase">{t.nextEvent.restriction}</span>
                <span className="text-white font-semibold mt-0.5">{event.ageRestriction || '21+ STRICT'}</span>
              </div>
              <div className="p-4 bg-[#0E0E0E] rounded-2xl border border-white/10 flex flex-col justify-center">
                <span className="text-zinc-500 text-[10px] uppercase">OFFICIAL TICKETS</span>
                <span className="text-[#C084FC] font-bold mt-0.5">£35.00 — £45.00</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Countdown & Lineup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#0E0E0E]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                  {event.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
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
                  <span className="text-[#A855F7]">{t.nextEvent.countdownTz}</span>
                </div>
                <CountdownTimer targetDate={countdownTarget || event.date} />
              </div>

              {/* Lineup Pills */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-semibold">
                  {t.nextEvent.lineupTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {event.lineup.map((artist, idx) => (
                    <span
                      key={artist}
                      className={`px-3.5 py-1.5 text-xs font-mono rounded-full border transition-colors ${
                        idx === 0
                          ? 'bg-[#9333EA]/25 border-[#9333EA] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specular Action */}
            <div className="pt-6 border-t border-white/10 space-y-2">
              <SpecularButton
                size="lg"
                radius={24}
                tint="#9333EA"
                tintOpacity={0.95}
                lineColor="#E9D5FF"
                baseColor="#7E22CE"
                intensity={1.4}
                thickness={1.5}
                onClick={onOpenTickets}
                className="w-full font-mono text-xs font-bold tracking-widest uppercase shadow-xl shadow-[#9333EA]/35"
              >
                <span>{t.nextEvent.getTicketsFor} {event.title} (£35 — £45)</span>
                <ArrowUpRight className="w-4 h-4" />
              </SpecularButton>
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
                <Ticket className="w-3 h-3 text-[#A855F7]" />
                <span>ALL GUESTS 21+ // INSTANT DIGITAL WALLET PASS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
