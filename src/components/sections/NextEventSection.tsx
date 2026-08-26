import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket } from 'lucide-react';
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
    <section id="next-event" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/10 select-none">
      {/* Soft Radial Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#9333EA]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20 border-b border-white/10 pb-8">
          <div>
            <span className="text-[11px] font-mono text-[#A855F7] tracking-[0.25em] uppercase font-bold block mb-2">
              {t.nextEvent.sectionBadge}
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight">
              {t.nextEvent.sectionTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-4 py-1.5 bg-[#9333EA]/20 border border-[#9333EA]/40 rounded-full text-white uppercase font-bold tracking-widest">
              {event.status}
            </span>
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#C084FC] font-semibold">
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
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="relative group overflow-hidden rounded-3xl border border-white/15 aspect-[4/3] sm:aspect-[16/10] bg-[#111111] shadow-2xl">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />

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

            {/* Quick Meta Strip */}
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
                <span className="text-zinc-500 text-[10px] uppercase">ENTRY PASS</span>
                <span className="text-[#C084FC] font-bold mt-0.5">£35.00 — £45.00</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Countdown & Lineup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Title & Synopsis */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C084FC]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                {event.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Countdown Box */}
            <div className="p-5 sm:p-6 bg-[#0E0E0E] rounded-3xl border border-white/15 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-4 pb-3 border-b border-white/10">
                <span className="text-zinc-400 uppercase tracking-widest">{t.nextEvent.countdownTitle}</span>
                <span className="text-[#A855F7] font-semibold">{t.nextEvent.countdownTz}</span>
              </div>
              <CountdownTimer targetDate={countdownTarget} />
            </div>

            {/* Curated Lineup Badges */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                {t.nextEvent.lineupTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {event.lineup.map((artist, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white/5 hover:bg-[#9333EA]/20 border border-white/10 hover:border-[#9333EA]/40 rounded-full text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-default"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <SpecularButton
                size="lg"
                tint="#9333EA"
                lineColor="#C084FC"
                baseColor="#7E22CE"
                intensity={1.4}
                radius={999}
                className="w-full py-4"
                onClick={onOpenTickets}
              >
                <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest uppercase">
                  <Ticket className="w-4 h-4" />
                  <span>{t.nextEvent.reserveCta}</span>
                </div>
              </SpecularButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NextEventSection;
